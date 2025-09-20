# import os
# from google.cloud import vision
# from langchain.tools import tool

# # Initialize Vision API client
# client = vision.ImageAnnotatorClient()

# @tool("extract_text_from_image", return_direct=True)
# def extract_text_from_image(file_path: str) -> str:
#     """
#     Extract text from an image or scanned PDF page using Google Cloud Vision API.
#     Args:
#         file_path (str): Path to image file (jpg, png, pdf).
#     Returns:
#         str: Extracted text.
#     """
#     if not os.path.exists(file_path):
#         return f"File not found: {file_path}"

#     # Load file content
#     with open(file_path, "rb") as image_file:
#         content = image_file.read()

#     # Create Vision API image object
#     image = vision.Image(content=content)

#     # For PDFs → use document_text_detection (more detailed)
#     if file_path.lower().endswith(".pdf"):
#         response = client.document_text_detection(image=image)
#     else:
#         response = client.text_detection(image=image)

#     if response.error.message:
#         return f"Vision API Error: {response.error.message}"

#     # ✅ Prefer full_text_annotation if available
#     if response.full_text_annotation and response.full_text_annotation.text:
#         return response.full_text_annotation.text.strip()

#     # Fallback: use text_annotations (first block contains full text)
#     texts = response.text_annotations
#     if texts:
#         return texts[0].description.strip()

#     return "No text detected."
import os
from google.cloud import vision
from langchain.tools import tool

# Initialize Vision API client
client = vision.ImageAnnotatorClient()

@tool("extract_text_from_image", return_direct=True)
def extract_text_from_image(file_path: str) -> dict:
    """
    Extract text from an image (jpg, png).
    Note: For PDFs, use pdf_tools.py instead.
    Returns JSON object with status, source, and extracted text.
    """
    if not os.path.exists(file_path):
        return {
            "status": "error",
            "source": "ocr",
            "text": f"File not found: {file_path}"
        }

    if file_path.lower().endswith(".pdf"):
        return {
            "status": "error",
            "source": "ocr",
            "text": "Direct PDF input is not supported. Use pdf_tools.py instead."
        }

    try:
        with open(file_path, "rb") as image_file:
            content = image_file.read()

        image = vision.Image(content=content)
        response = client.text_detection(image=image)

        if response.error.message:
            return {
                "status": "error",
                "source": "ocr",
                "text": f"Vision API Error: {response.error.message}"
            }

        if response.full_text_annotation and response.full_text_annotation.text:
            return {
                "status": "success",
                "source": "ocr",
                "text": response.full_text_annotation.text.strip()
            }

        texts = response.text_annotations
        if texts:
            return {
                "status": "success",
                "source": "ocr",
                "text": texts[0].description.strip()
            }

        return {
            "status": "error",
            "source": "ocr",
            "text": "No text detected."
        }

    except Exception as e:
        return {
            "status": "error",
            "source": "ocr",
            "text": f"Unexpected error: {str(e)}"
        }
