# import os
# from langchain.tools import tool
# from app.utils.text_tools import extract_from_text
# from app.utils.pdf_tools import extract_from_pdf
# from app.utils.ocr_tools import extract_text_from_image
# from app.utils.docx_tool import extract_from_docx
# from app.utils.ner_tools import legal_ner  

# @tool("input_router", return_direct=True)
# def input_router(input_data: str):
#     """
#     Detects input type (text, PDF, DOCX, image) -> extracts text -> 
#     passes it into NER for legal entity extraction.
#     Args:
#         input_data (str): User input (text, file path, or URL).
#     Returns:
#         list/dict: Structured legal entities extracted by NER.
#     """
#     if not input_data:
#         return "No input provided"

#     extracted_text = None

#     # Case 1: Direct plain text
#     if not os.path.exists(input_data) and not input_data.lower().startswith("http"):
#         extracted_text = extract_from_text(input_data)

#     # Case 2: File input
#     elif os.path.exists(input_data):
#         ext = os.path.splitext(input_data)[-1].lower()
#         if ext == ".pdf":
#             extracted_text = extract_from_pdf(input_data)
#         elif ext in [".jpg", ".jpeg", ".png"]:
#             extracted_text = extract_text_from_image(input_data)
#         elif ext == ".docx":
#             extracted_text = extract_from_docx(input_data)
#         elif ext == ".txt":
#             with open(input_data, "r") as f:
#                 extracted_text = extract_from_text(f.read())

        

#     if not extracted_text:
#         return "Unsupported or empty input type"

#     # 🚀 Send extracted text into NER
#     return legal_ner(extracted_text)
import os
from langchain.tools import tool
from legal_backend.utils.text_tools import extract_from_text
from legal_backend.utils.pdf_tools import extract_from_pdf
from legal_backend.utils.ocr_tools import extract_text_from_image
from legal_backend.utils.docx_tool import extract_from_docx
from legal_backend.utils.ner_tools import legal_ner  


@tool("input_router", return_direct=True)
def input_router(input_data: str):
    """
    Detects input type (text, PDF, DOCX, image) -> extracts text ->
    passes it into NER for legal entity extraction.
    
    Args:
        input_data (str): User input (text, file path, or URL).
    
    Returns:
        dict: JSON with source, type, extracted_text, and structured legal entities.
    """
    if not input_data:
        return {"error": "No input provided"}

    extracted_text = None
    input_type = "text"

    # Case 1: Direct plain text
    if not os.path.exists(input_data) and not input_data.lower().startswith("http"):
        extracted_text = extract_from_text(input_data)
        input_type = "text"

    # Case 2: File input
    elif os.path.exists(input_data):
        ext = os.path.splitext(input_data)[-1].lower()
        if ext == ".pdf":
            extracted_text = extract_from_pdf(input_data)
            input_type = "pdf"
        elif ext in [".jpg", ".jpeg", ".png"]:
            extracted_text = extract_text_from_image(input_data)
            input_type = "image"
        elif ext == ".docx":
            extracted_text = extract_from_docx(input_data)
            input_type = "docx"
        elif ext == ".txt":
            with open(input_data, "r") as f:
                extracted_text = extract_from_text(f.read())
            input_type = "txt"

    # Case 3: URLs (not implemented yet)
    elif input_data.lower().startswith("http"):
        return {"error": "URL input not yet supported", "source": input_data}

    if not extracted_text:
        return {"error": "Unsupported or empty input type", "source": input_data}

    # 🚀 Run NER
    ner_result = legal_ner(extracted_text)

    # ✅ Flatten JSON so React/FastAPI doesn’t need to dig into nested dicts
    return {
        "source": input_data,
        "type": input_type,
        "raw_text": ner_result.get("raw_text", ""),
        "legal_entities": ner_result.get("legal_entities", []),
        "metadata": ner_result.get("metadata", {}),
    }
