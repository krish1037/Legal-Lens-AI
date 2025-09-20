import os
import argparse
import logging
from google.cloud import storage

from legal_backend.config import PROJECT_ID, GCS_BUCKET  # centralize bucket/project config

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s"
)


def upload_file_to_gcs(local_path: str, destination_blob_name: str, bucket_name: str = None) -> str:
    """
    Uploads a local file to a Google Cloud Storage bucket.

    Args:
        local_path (str): Path to the local file.
        destination_blob_name (str): Path in the bucket (e.g., embeddings/embeddings.jsonl).
        bucket_name (str): GCS bucket name. Defaults to config.GCS_BUCKET.

    Returns:
        str: Full GCS URI of the uploaded file.
    """
    if not os.path.exists(local_path):
        raise FileNotFoundError(f"{local_path} not found.")

    bucket_name = bucket_name or GCS_BUCKET
    if not bucket_name:
        raise ValueError("No GCS bucket specified. Set it in config.py or pass via --bucket.")

    logging.info("Uploading %s → gs://%s/%s", local_path, bucket_name, destination_blob_name)

    storage_client = storage.Client(project=PROJECT_ID)
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(destination_blob_name)
    blob.upload_from_filename(local_path)

    gcs_uri = f"gs://{bucket_name}/{destination_blob_name}"
    logging.info("✅ Upload complete: %s", gcs_uri)

    return gcs_uri


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Upload a file to GCS")
    parser.add_argument("--local", required=True, help="Local file to upload (e.g., data/embeddings/embeddings.jsonl)")
    parser.add_argument("--dest", required=False, help="Destination path in bucket (e.g., embeddings/embeddings.jsonl)")
    parser.add_argument("--bucket", required=False, help="Override bucket name")
    args = parser.parse_args()

    dest = args.dest or os.path.basename(args.local)

    uri = upload_file_to_gcs(
        local_path=args.local,
        destination_blob_name=dest,
        bucket_name=args.bucket
    )

    print("📂 Uploaded to:", uri)
