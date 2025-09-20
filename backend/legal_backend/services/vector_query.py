import argparse
import logging
from google.cloud import aiplatform
from vertexai.language_models import TextEmbeddingModel

from legal_backend.config import PROJECT_ID, LOCATION, EMBEDDING_MODEL

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


def init_vertex():
    aiplatform.init(project=PROJECT_ID, location=LOCATION)


def get_embedding(text: str):
    model = TextEmbeddingModel.from_pretrained(EMBEDDING_MODEL)
    emb = model.get_embeddings([text])[0]
    return emb.values


def query_index(endpoint_id: str, query: str, num_neighbors: int = 3):
    init_vertex()
    index_endpoint = aiplatform.MatchingEngineIndexEndpoint(endpoint_id)

    query_emb = get_embedding(query)

    response = index_endpoint.find_neighbors(
        deployed_index_id=index_endpoint.deployed_indexes[0].id,
        queries=[query_emb],
        num_neighbors=num_neighbors,
    )

    logging.info("Query: %s", query)
    for match in response[0].neighbors:
        print("Match ID:", match.id)
        print("Distance:", match.distance)
        if match.datapoint.datapoint_id:
            print("Datapoint Metadata:", match.datapoint.datapoint_id)
    return response


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--query", required=True, help="Your natural language query")
    parser.add_argument("--endpoint", required=True, help="Full resource name of index endpoint")
    parser.add_argument("--k", type=int, default=3, help="Number of neighbors")
    args = parser.parse_args()

    query_index(args.endpoint, args.query, num_neighbors=args.k)