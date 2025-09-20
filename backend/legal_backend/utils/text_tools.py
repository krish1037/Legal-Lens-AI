# import re
# import unicodedata
# from langchain.tools import tool

# def clean_text(input_text: str) -> str:
#     """Normalize and clean manual text input."""
#     if not input_text:
#         return ""
    
#     # Unicode normalization (e.g., smart quotes, accents)
#     text = unicodedata.normalize("NFKC", input_text)
    
#     # Remove HTML tags if any
#     text = re.sub(r"<[^>]+>", " ", text)
    
#     # Collapse multiple spaces/newlines
#     text = re.sub(r"\s+", " ", text).strip()
    
#     return text

# @tool("extract_from_text", return_direct=True)
# def extract_from_text(input_text: str) -> str:
#     """
#     Tool entrypoint: normalize raw user input text
#     and return cleaned string for NER/Retriever.
#     """
#     return clean_text(input_text)
import re
import unicodedata
from langchain.tools import tool

def clean_text(input_text: str) -> str:
    """Normalize and clean manual text input."""
    if not input_text:
        return ""
    
    # Unicode normalization (e.g., smart quotes, accents)
    text = unicodedata.normalize("NFKC", input_text)
    
    # Remove HTML tags if any
    text = re.sub(r"<[^>]+>", " ", text)
    
    # Collapse multiple spaces/newlines
    text = re.sub(r"\s+", " ", text).strip()
    
    return text

@tool("extract_from_text", return_direct=True)
def extract_from_text(input_text: str) -> dict:
    """
    Tool entrypoint: normalize raw user input text
    and return cleaned string for downstream use.
    Always returns JSON.
    """
    try:
        cleaned = clean_text(input_text)
        if not cleaned:
            return {
                "status": "error",
                "source": "text",
                "text": "No valid input provided."
            }
        return {
            "status": "success",
            "source": "text",
            "text": cleaned
        }
    except Exception as e:
        return {
            "status": "error",
            "source": "text",
            "text": f"Unexpected error: {str(e)}"
        }
