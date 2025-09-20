import os
from dotenv import load_dotenv

load_dotenv()

# Core GCP setup
PROJECT_ID = os.getenv("GCP_PROJECT_ID")
LOCATION = os.getenv("GCP_LOCATION")
GCP_CREDENTIALS = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")

# GCS Bucket
GCS_BUCKET = os.getenv("GCS_BUCKET")

# Vertex AI Index + Endpoints
INDEX_ID = os.getenv("INDEX_ID") 
INDEX_ENDPOINT_ID = os.getenv("INDEX_ENDPOINT_ID")  
DEPLOYED_INDEX_ID = os.getenv("DEPLOYED_INDEX_ID") 

# Embedding model & batching
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL", "text-embedding-004")
EMBEDDING_BATCH_SIZE = int(os.getenv("EMBEDDING_BATCH_SIZE", "16"))

# Local output paths
EMBEDDINGS_LOCAL_DIR = os.getenv("EMBEDDINGS_LOCAL_DIR", "data/embeddings")
EMBEDDINGS_LOCAL_FILE = os.getenv("EMBEDDINGS_LOCAL_FILE", "data/embeddings/embeddings.jsonl")


