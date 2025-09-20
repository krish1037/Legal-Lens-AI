import os
import json
import logging
import argparse

from google.cloud import aiplatform
from vertexai.language_models import TextEmbeddingModel, TextEmbeddingInput

# Import config (assuming this file exists with the necessary variables)
try:
    from legal_backend.config import PROJECT_ID, LOCATION, EMBEDDINGS_LOCAL_FILE, EMBEDDING_MODEL, EMBEDDING_BATCH_SIZE
except ImportError:
    # Fallback for demonstration if config.py is not available
    PROJECT_ID = os.getenv("PROJECT_ID", "legal-lens-hackathon")
    LOCATION = os.getenv("LOCATION", "us-central1")
    EMBEDDINGS_LOCAL_FILE = "embeddings.jsonl"
    EMBEDDING_MODEL = "text-embedding-004" # Use a modern model
    EMBEDDING_BATCH_SIZE = 5

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


def init_vertex(project_id=PROJECT_ID, location=LOCATION):
    """Initializes the Vertex AI SDK with project and location."""
    if not project_id or project_id == "your-gcp-project-id":
        raise ValueError("PROJECT_ID not set in app/config.py or environment.")
    logging.info("Initializing Vertex AI (project=%s, location=%s)", project_id, location)
    aiplatform.init(project=project_id, location=location)


def load_laws_from_folder(folder_path: str):
    """Loads and combines all JSON law files from a folder."""
    if not os.path.exists(folder_path):
        raise FileNotFoundError(f"{folder_path} not found.")

    all_laws = []
    for fname in os.listdir(folder_path):
        if fname.endswith(".json"):
            fpath = os.path.join(folder_path, fname)
            with open(fpath, "r", encoding="utf-8") as f:
                try:
                    data = json.load(f)
                    if not isinstance(data, list):
                        raise ValueError(f"{fname} does not contain a JSON list at top level.")
                    logging.info("Loaded %d law records from %s", len(data), fname)
                    all_laws.extend(data)
                except json.JSONDecodeError as e:
                    logging.error("❌ JSONDecodeError in %s: %s", fname, e)
                    raise
                except Exception as e:
                    logging.error("❌ Error in %s: %s", fname, e)
                    raise

    logging.info("Total combined records: %d", len(all_laws))
    return all_laws


def get_embedding_model(model_name: str = EMBEDDING_MODEL):
    """Loads the pre-trained embedding model."""
    logging.info("Loading embedding model: %s", model_name)
    return TextEmbeddingModel.from_pretrained(model_name)


def embed_batch(embed_model: TextEmbeddingModel, texts: list, task_type: str = "RETRIEVAL_DOCUMENT"):
    """
    Batch embeds texts using the Vertex AI embedding model.
    The new API requires a task_type to optimize the embedding for a specific use case.
    """
    embedding_inputs = [
        TextEmbeddingInput(text, task_type=task_type) for text in texts
    ]
    try:
        emb_objs = embed_model.get_embeddings(embedding_inputs)
        return [e.values for e in emb_objs]
    except Exception as e:
        logging.error("❌ Embedding API call failed: %s", e)
        # Return empty list or handle as per your application's error strategy
        return []


def create_embeddings_jsonl(input_folder: str, output_jsonl: str,
                            batch_size: int = EMBEDDING_BATCH_SIZE,
                            model_name: str = EMBEDDING_MODEL):
    """
    Main function to load laws, create embeddings in batches, and save to a JSONL file.
    """
    init_vertex()
    embed_model = get_embedding_model(model_name)
    laws = load_laws_from_folder(input_folder)
    total = len(laws)
    out_dir = os.path.dirname(output_jsonl) or "."
    os.makedirs(out_dir, exist_ok=True)
    
    # The task type is set to RETRIEVAL_DOCUMENT as these are laws
    # which will be used for a retrieval-based system (e.g., Q&A).
    task_type = "RETRIEVAL_DOCUMENT"

    # --- Resume logic ---
    already_done = 0
    if os.path.exists(output_jsonl):
        with open(output_jsonl, "r", encoding="utf-8") as f:
            already_done = sum(1 for _ in f)  # count lines
        logging.info("Resuming: %d embeddings already written", already_done)

    logging.info("Embedding %d items (remaining=%d) with batch_size=%d",
                 total, total - already_done, batch_size)

    with open(output_jsonl, "a", encoding="utf-8") as outf:
        for start in range(already_done, total, batch_size):
            batch = laws[start:start + batch_size]

            # Concatenate fields for embedding
            texts = []
            for item in batch:
                text_parts = [
                    item.get("act", ""),
                    f"Chapter {item.get('chapter')} - {item.get('chapter_title', '')}" if "chapter" in item else "",
                    f"Section {item.get('section')}: {item.get('title', item.get('section_title', ''))}",
                    item.get("description", item.get("section_desc", ""))
                ]
                text = " ".join([p for p in text_parts if p]).strip()
                texts.append(text)

            logging.info("Embedding items %d - %d", start, min(start + batch_size, total) - 1)
            embeddings = embed_batch(embed_model, texts, task_type=task_type)

            for idx, emb in enumerate(embeddings):
                rec = {
                    "id": batch[idx].get("id", f"rec_{start+idx}"),
                    "embedding": emb,
                    "metadata": batch[idx]
                }
                outf.write(json.dumps(rec, ensure_ascii=False) + "\n")
                outf.flush()  # ensure written even if interrupted

    logging.info("✅ Finished writing embeddings to %s", output_jsonl)
    return output_jsonl


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--input-folder", default="data/laws", help="Folder containing JSON law files")
    parser.add_argument("--output", default=EMBEDDINGS_LOCAL_FILE, help="Path to output embeddings.jsonl")
    parser.add_argument("--batch-size", type=int, default=EMBEDDING_BATCH_SIZE)
    parser.add_argument("--model", default=EMBEDDING_MODEL)
    args = parser.parse_args()

    try:
        out = create_embeddings_jsonl(args.input_folder, args.output,
                                     batch_size=args.batch_size,
                                     model_name=args.model)
        print("Wrote embeddings file:", out)
    except Exception as e:
        logging.error("An error occurred during embedding creation: %s", e)
