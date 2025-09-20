# import pdfplumber
# import os
# from typing import List

# from app.utils.ocr_tools import extract_text_from_image  # reuse GCP Vision OCR


# def extract_from_pdf(pdf_path: str) -> str:
#     """
#     Extract text from a PDF file.
#     - If text exists (selectable text), use pdfplumber.
#     - If no text at all, fallback to Google Vision OCR on the whole PDF.
#     - If mixed (some text, some scanned pages), OCR only those pages.
#     """
#     all_text: List[str] = []

#     with pdfplumber.open(pdf_path) as pdf:
#         extracted_any = False

#         for i, page in enumerate(pdf.pages):
#             text = page.extract_text()
#             if text:
#                 extracted_any = True
#                 all_text.append(text)
#             else:
#                 # Page might be scanned → convert to image and OCR
#                 image = page.to_image(resolution=300).original
#                 tmp_img_path = f"/tmp/page_{i}.png"
#                 image.save(tmp_img_path)

#                 ocr_text = extract_text_from_image(tmp_img_path)
#                 all_text.append(ocr_text)

#                 os.remove(tmp_img_path)

#     # If plumber failed completely → OCR whole PDF directly
#     if not all_text or not any(t.strip() for t in all_text):
#         return extract_text_from_image(pdf_path)

#     return "\n".join(all_text).strip()


# # Example usage
# if __name__ == "__main__":
#     text = extract_from_pdf("samples/legal_notice.pdf")
#     print(text[:500])
import pdfplumber
import tempfile
import os
from typing import List

from legal_backend.utils.ocr_tools import extract_text_from_image  # reuse OCR tool

def extract_from_pdf(pdf_path: str) -> dict:
    """
    Extract text from a PDF file.
    - If text exists (selectable text), use pdfplumber.
    - If no text, fallback to OCR for those pages only.
    Returns JSON object with status, source, and extracted text.
    """
    all_text: List[str] = []

    try:
        with pdfplumber.open(pdf_path) as pdf:
            for i, page in enumerate(pdf.pages):
                text = page.extract_text()
                if text:
                    all_text.append(text)
                else:
                    # Page might be scanned → convert to image and OCR
                    image = page.to_image(resolution=300).original
                    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as tmp_img:
                        image.save(tmp_img.name)
                        ocr_result = extract_text_from_image(tmp_img.name)
                    os.remove(tmp_img.name)

                    # Append only the text from OCR result
                    if ocr_result["status"] == "success":
                        all_text.append(ocr_result["text"])
                    else:
                        all_text.append(f"[OCR Error on page {i}: {ocr_result['text']}]")

        if not all_text or not any(t.strip() for t in all_text):
            return {
                "status": "error",
                "source": "pdf",
                "text": "No text could be extracted from the PDF."
            }

        return {
            "status": "success",
            "source": "pdf",
            "text": "\n".join(all_text).strip()
        }

    except Exception as e:
        return {
            "status": "error",
            "source": "pdf",
            "text": f"Unexpected error: {str(e)}"
        }
