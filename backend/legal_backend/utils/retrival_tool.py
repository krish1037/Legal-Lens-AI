# import logging
# from typing import List
# from langchain.schema import Document
# from google.cloud import aiplatform
# from vertexai.language_models import TextEmbeddingModel
# from app.config import PROJECT_ID, LOCATION, INDEX_ENDPOINT_ID, EMBEDDING_MODEL
# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
# class VertexAIRetriever:
#     """Custom retriever for Vertex AI Matching Engine."""

#     def __init__(self, index_endpoint_id: str = INDEX_ENDPOINT_ID, k: int = 3):
#         # ✅ Make sure these are stored as plain attributes
#         object.__setattr__(self, "k", k)
#         object.__setattr__(self, "index_endpoint_id", index_endpoint_id)

#         aiplatform.init(project=PROJECT_ID, location=LOCATION)

#         # ✅ Ensure full resource path
#         endpoint_path = f"projects/{PROJECT_ID}/locations/{LOCATION}/indexEndpoints/{index_endpoint_id}"
#         self.index_endpoint = aiplatform.MatchingEngineIndexEndpoint(endpoint_path)

#         # ✅ Embedding model for query encoding
#         self.embedder = TextEmbeddingModel.from_pretrained(EMBEDDING_MODEL)

#     def _embed_query(self, query: str) -> List[float]:
#         """Generate embedding for a query string."""
#         emb = self.embedder.get_embeddings([query])[0]
#         return emb.values

#     def get_relevant_documents(self, query: str) -> List[Document]:
#         """Retrieve relevant documents from Matching Engine."""
#         try:
#             query_emb = self._embed_query(query)

#             response = self.index_endpoint.find_neighbors(
#                 deployed_index_id=self.index_endpoint.deployed_indexes[0].id,
#                 queries=[query_emb],
#                 num_neighbors=self.k,
#             )

#             docs = []
#             for match in response[0].neighbors:
#                 metadata = {}
#                 text = ""

#                 # Always capture datapoint ID
#                 if match.datapoint and match.datapoint.datapoint_id:
#                     metadata["id"] = match.datapoint.datapoint_id

#                 # Extract stored metadata (if any)
#                 if hasattr(match.datapoint, "restricts"):
#                     for r in match.datapoint.restricts:
#                         values = [ns for ns in r.namespace_values]
#                         metadata[r.namespace] = values
#                         if r.namespace.lower() == "text" and values:
#                             text = values[0]

#                 if not text:
#                     text = f"[No text found for datapoint {metadata.get('id', 'unknown')}]"

#                 docs.append(Document(page_content=text, metadata=metadata))

#             logger.info("Retrieved %d documents for query: %s", len(docs), query)
#             return docs

#         except Exception as e:
#             logger.error(f"Retriever error: {e}")
#             return []

#     async def aget_relevant_documents(self, query: str) -> List[Document]:
#         return self.get_relevant_documents(query)
# import logging
# from typing import List

# from langchain.schema import Document
# from google.cloud import aiplatform_v1
# from vertexai.language_models import TextEmbeddingModel
# import app.config as config

# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


# class VertexAIRetriever:
#     def __init__(self, k: int = 3):
#         """
#         Initialize the Vertex AI retriever for Vector DB (Preview).
#         Args:
#             k (int): Number of neighbors (documents) to retrieve per query.
#         """
#         try:
#             self.index_client = aiplatform_v1.IndexServiceClient()
#             self.index = self.index_client.index_path(
#                 project=config.PROJECT_ID,
#                 location=config.LOCATION,
#                 index=config.INDEX_ID,
#             )
#             self.embedding_model = TextEmbeddingModel.from_pretrained(config.EMBEDDING_MODEL)
#             self.k = k

#             logger.info("✅ VertexAIRetriever initialized successfully (Vector DB mode).")
#         except Exception as e:
#             logger.error(f"❌ Error initializing VertexAIRetriever: {e}")
#             raise

#     def get_relevant_documents(self, query: str) -> List[Document]:
#         """
#         Retrieve top-k documents from the Vertex AI Vector DB.
#         Args:
#             query (str): User query text.
#         Returns:
#             List[Document]: Retrieved documents with content + metadata.
#         """
#         try:
#             # Create embedding for the query
#             query_embedding = self.embedding_model.get_embeddings([query])[0].values

#             # Build Query request
#             request = aiplatform_v1.QueryIndexDatapointsRequest(
#                 index=self.index,
#                 queries=[
#                     aiplatform_v1.QueryIndexDatapointsRequest.Query(
#                         datapoint=aiplatform_v1.IndexDatapoint(
#                             feature_vector=query_embedding
#                         ),
#                         neighbor_count=self.k,
#                     )
#                 ],
#             )

#             response = self.index_client.query_index_datapoints(request=request)

#             docs = []
#             if response.nearest_neighbors:
#                 for neighbor in response.nearest_neighbors[0].neighbors:
#                     metadata = dict(neighbor.datapoint.restricts) if neighbor.datapoint.restricts else {}
#                     docs.append(
#                         Document(
#                             page_content=metadata.get("section_desc", neighbor.datapoint.datapoint_id),
#                             metadata={
#                                 "id": neighbor.datapoint.datapoint_id,
#                                 "score": neighbor.distance,
#                                 "section": metadata.get("Section"),
#                                 "chapter": metadata.get("chapter"),
#                                 "act": metadata.get("act"),
#                                 "source": metadata.get("source", "Vector DB"),
#                             },
#                         )
#                     )

#             return docs
#         except Exception as e:
#             logger.error(f"❌ Error during document retrieval: {e}")
#             return []
# import logging
# import os
# from typing import List

# from langchain.schema import Document
# from google.cloud import aiplatform_v1
# from google.cloud.aiplatform_v1.types import FindNeighborsRequest, IndexDatapoint
# from vertexai.language_models import TextEmbeddingModel

# import app.config as config

# # --- Logging setup ---
# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


# class VertexAIRetriever:
#     def __init__(self, k: int = 3):
#         """Initialize the Vertex AI retriever for Vector DB (IndexEndpointService, ANN)."""
#         try:
#             # Check ENV + Config first
#             logger.info("🔧 Initializing VertexAIRetriever with:")
#             logger.info(f"   PROJECT_ID         = {config.PROJECT_ID}")
#             logger.info(f"   LOCATION           = {config.LOCATION}")
#             logger.info(f"   INDEX_ENDPOINT_ID  = {config.INDEX_ENDPOINT_ID}")
#             logger.info(f"   DEPLOYED_INDEX_ID  = {config.DEPLOYED_INDEX_ID}")
#             logger.info(f"   EMBEDDING_MODEL    = {config.EMBEDDING_MODEL}")
#             logger.info(f"   GOOGLE_CREDENTIALS = {os.getenv('GOOGLE_APPLICATION_CREDENTIALS')}")

#             # Init ANN client (NOT MatchServiceClient!)
#             self.match_client = aiplatform_v1.IndexEndpointServiceClient()

#             # Full resource path (endpoint, not index)
#             self.index_endpoint = (
#                 f"projects/{config.PROJECT_ID}/locations/{config.LOCATION}/indexEndpoints/{config.INDEX_ENDPOINT_ID}"
#             )
#             self.deployed_index_id = config.DEPLOYED_INDEX_ID

#             # Embedding model
#             self.embedding_model = TextEmbeddingModel.from_pretrained(config.EMBEDDING_MODEL)
#             self.k = k

#             logger.info("✅ VertexAIRetriever initialized successfully.")
#         except Exception as e:
#             logger.error(f"❌ Error initializing VertexAIRetriever: {e}", exc_info=True)
#             raise

#     def get_relevant_documents(self, query: str) -> List[Document]:
#         """Retrieve top-k documents from the Vertex AI ANN index."""
#         try:
#             logger.info(f"🔎 Creating embedding for query: '{query}'")
#             query_embedding = self.embedding_model.get_embeddings([query])[0].values
#             logger.info(f"✅ Embedding generated (len={len(query_embedding)})")

#             # Build FindNeighbors request (ANN-compatible)
#             request = FindNeighborsRequest(
#                 index_endpoint=self.index_endpoint,
#                 deployed_index_id=self.deployed_index_id,
#                 queries=[
#                     FindNeighborsRequest.Query(
#                         datapoint=IndexDatapoint(feature_vector=query_embedding),
#                         neighbor_count=self.k,
#                     )
#                 ],
#                 return_full_datapoint=True,
#             )
#             logger.info("📡 Sending ANN request to Vertex AI IndexEndpointService...")
#             logger.debug(f"Request payload: {request}")

#             response = self.match_client.find_neighbors(request=request)
#             logger.info("✅ Received response from IndexEndpointService")

#             docs = []
#             if response.nearest_neighbors:
#                 logger.info(f"📄 Found {len(response.nearest_neighbors[0].neighbors)} neighbors")
#                 for neighbor in response.nearest_neighbors[0].neighbors:
#                     metadata = {}
#                     if neighbor.datapoint.restricts:
#                         metadata = {r.namespace: r.allow for r in neighbor.datapoint.restricts}

#                     docs.append(
#                         Document(
#                             page_content=metadata.get("section_desc", neighbor.datapoint.datapoint_id),
#                             metadata={
#                                 "id": neighbor.datapoint.datapoint_id,
#                                 "score": neighbor.distance,
#                                 "section": metadata.get("Section"),
#                                 "chapter": metadata.get("chapter"),
#                                 "act": metadata.get("act"),
#                                 "source": metadata.get("source", "Vector DB"),
#                             },
#                         )
#                     )
#             else:
#                 logger.warning("⚠️ No neighbors found for query.")

#             return docs

#         except Exception as e:
#             logger.error(f"❌ Error during document retrieval: {e}", exc_info=True)
#             return []


# if __name__ == "__main__":
#     retriever = VertexAIRetriever(k=3)
#     query = "Indian Penal Code Chapter 1 section 2 definition of crime"
#     results = retriever.get_relevant_documents(query)

#     print("\n🔎 Retrieved Documents:")
#     if results:
#         for doc in results:
#             print(doc.page_content, "| Metadata:", doc.metadata)
#     else:
#         print("⚠️ No documents retrieved")
import logging
import os
from typing import List

from langchain.schema import Document
from google.cloud.aiplatform_v1.types import FindNeighborsRequest, IndexDatapoint
from vertexai.language_models import TextEmbeddingModel

import app.config as config

# --- Logging setup ---
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


class VertexAIRetriever:
    def __init__(self, k: int = 3):
        """Initialize the Vertex AI retriever for Vector DB (ANN/Raw)."""
        try:
            logger.info("🔧 Initializing VertexAIRetriever with:")
            logger.info(f"   PROJECT_ID         = {config.PROJECT_ID}")
            logger.info(f"   LOCATION           = {config.LOCATION}")
            logger.info(f"   INDEX_ENDPOINT_ID  = {config.INDEX_ENDPOINT_ID}")
            logger.info(f"   DEPLOYED_INDEX_ID  = {config.DEPLOYED_INDEX_ID}")
            logger.info(f"   EMBEDDING_MODEL    = {config.EMBEDDING_MODEL}")
            logger.info(f"   GOOGLE_CREDENTIALS = {os.getenv('GOOGLE_APPLICATION_CREDENTIALS')}")

            # Regional endpoint fix
            api_endpoint = f"{config.LOCATION}-aiplatform.googleapis.com"

            from google.cloud import aiplatform_v1
            from google.cloud.aiplatform_v1.services.match_service import MatchServiceClient

            self.index_client = aiplatform_v1.IndexEndpointServiceClient(
                client_options={"api_endpoint": api_endpoint}
            )
            self.match_client = MatchServiceClient(
                client_options={"api_endpoint": api_endpoint}
            )

            self.index_endpoint = (
                f"projects/{config.PROJECT_ID}/locations/{config.LOCATION}/indexEndpoints/{config.INDEX_ENDPOINT_ID}"
            )
            self.deployed_index_id = config.DEPLOYED_INDEX_ID

            self.embedding_model = TextEmbeddingModel.from_pretrained(config.EMBEDDING_MODEL)
            self.k = k

            logger.info("✅ VertexAIRetriever initialized successfully.")
        except Exception as e:
            logger.error(f"❌ Error initializing VertexAIRetriever: {e}", exc_info=True)
            raise

    def get_relevant_documents(self, query: str) -> List[Document]:
        try:
            logger.info(f"🔎 Creating embedding for query: '{query}'")
            query_embedding = self.embedding_model.get_embeddings([query])[0].values
            logger.info(f"✅ Embedding generated (len={len(query_embedding)})")

            request = FindNeighborsRequest(
                index_endpoint=self.index_endpoint,
                deployed_index_id=self.deployed_index_id,
                queries=[
                    FindNeighborsRequest.Query(
                        datapoint=IndexDatapoint(feature_vector=query_embedding),
                        neighbor_count=self.k,
                    )
                ],
                return_full_datapoint=True,
            )

            # --- Use MatchServiceClient only (correct one) ---
            logger.info("📡 Calling MatchServiceClient.find_neighbors...")
            response = self.match_client.find_neighbors(request=request)

            # --- Raw dump ---
            logger.info(f"📝 RAW RESPONSE: {response}")

            docs = []
            if response and response.nearest_neighbors:
                logger.info(f"📄 Found {len(response.nearest_neighbors[0].neighbors)} neighbors")
                for neighbor in response.nearest_neighbors[0].neighbors:
                    metadata = {}
                    if neighbor.datapoint.restricts:
                        metadata = {r.namespace: r.allow for r in neighbor.datapoint.restricts}

                    docs.append(
                        Document(
                            page_content=metadata.get("section_desc", neighbor.datapoint.datapoint_id),
                            metadata={
                                "id": neighbor.datapoint.datapoint_id,
                                "score": neighbor.distance,
                                "section": metadata.get("Section"),
                                "chapter": metadata.get("chapter"),
                                "act": metadata.get("act"),
                                "source": metadata.get("source", "Vector DB"),
                            },
                        )
                    )
            else:
                logger.warning("⚠️ No neighbors found for query.")

            return docs

        except Exception as e:
            logger.error(f"❌ Error during document retrieval: {e}", exc_info=True)
            return []


if __name__ == "__main__":
    retriever = VertexAIRetriever(k=3)
    query = "Indian Penal Code Chapter 1 section 2 definition of crime"
    results = retriever.get_relevant_documents(query)

    print("\n🔎 Retrieved Documents:")
    if results:
        for doc in results:
            print(doc.page_content, "| Metadata:", doc.metadata)
    else:
        print("⚠️ No documents retrieved")
