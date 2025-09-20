# import re
# import spacy
# from spacy.matcher import Matcher
# from langchain.tools import tool

# # Load spaCy model
# try:
#     nlp = spacy.load("en_core_web_sm")
# except OSError:
#     raise OSError(
#         "SpaCy model 'en_core_web_sm' is not installed. Run: python -m spacy download en_core_web_sm"
#     )

# matcher = Matcher(nlp.vocab)

# # Patterns for Indian legal references
# patterns = [
#     # Section 372 IPC / Sec. 372 IPC / S. 372
#     [
#         {"TEXT": {"REGEX": r"^(Section|Sec\.?|S\.)$"}},
#         {"IS_DIGIT": True},
#         {"TEXT": {"REGEX": r"^[A-Z]?$"}, "OP": "?"},
#         {"TEXT": {"REGEX": r"^(IPC|CrPC|NI\s?Act|IT\s?Act|CPC)?$"}, "OP": "?"},
#     ],
#     # Article 21 Constitution / Art. 21
#     [
#         {"TEXT": {"REGEX": r"^(Article|Art\.?)$"}},
#         {"IS_DIGIT": True},
#     ],
#     # Rule 34 IT Act / Order 7 Rule 11 CPC
#     [
#         {"TEXT": {"REGEX": r"^(Rule|Order)$"}},
#         {"IS_DIGIT": True},
#         {"TEXT": {"REGEX": r"^(Rule)?\s?\d+[A-Z]?$"}, "OP": "?"},
#         {"TEXT": {"REGEX": r"^(CPC|CrPC|IT\s?Act)?$"}, "OP": "?"},
#     ],
# ]

# matcher.add("LEGAL_REF", patterns)


# @tool("legal_ner")
# def legal_ner(text: str):
#     """
#     Extract legal references (Sections, Articles, Acts, Rules) from input text.
#     Returns both the original text and structured legal entities.
#     """
#     if not text or not isinstance(text, str):
#         return {"text": "", "entities": []}

#     doc = nlp(text)
#     matches = matcher(doc)

#     results = []
#     for _, start, end in matches:
#         span = doc[start:end]
#         results.append(span.text)

#     # Regex fallback for edge cases
#     regex_refs = re.findall(
#         r"(Sec\.?\s?\d+[A-Z]?|Section\s?\d+[A-Z]?|Art\.?\s?\d+|Article\s?\d+|Rule\s?\d+|Order\s?\d+)",
#         text,
#         re.IGNORECASE,
#     )
#     results.extend(regex_refs)

#     # Deduplicate
#     results = list(set(results))

#     structured_entities = [{"reference": ref} for ref in results]

#     return {
#         "text": text,
#         "entities": structured_entities,
#     }
import re
import spacy
from spacy.matcher import Matcher
from langchain.tools import tool

# Load spaCy model
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    raise OSError(
        "SpaCy model 'en_core_web_sm' is not installed. Run: python -m spacy download en_core_web_sm"
    )

matcher = Matcher(nlp.vocab)

# Patterns for Indian legal references
patterns = [
    # Section 372 IPC / Sec. 372 IPC / S. 372
    [
        {"TEXT": {"REGEX": r"^(Section|Sec\.?|S\.)$"}},
        {"IS_DIGIT": True},
        {"TEXT": {"REGEX": r"^[A-Z]?$"}, "OP": "?"},
        {"TEXT": {"REGEX": r"^(IPC|CrPC|NI\s?Act|IT\s?Act|CPC)?$"}, "OP": "?"},
    ],
    # Article 21 Constitution / Art. 21
    [
        {"TEXT": {"REGEX": r"^(Article|Art\.?)$"}},
        {"IS_DIGIT": True},
    ],
    # Rule 34 IT Act / Order 7 Rule 11 CPC
    [
        {"TEXT": {"REGEX": r"^(Rule|Order)$"}},
        {"IS_DIGIT": True},
        {"TEXT": {"REGEX": r"^(Rule)?\s?\d+[A-Z]?$"}, "OP": "?"},
        {"TEXT": {"REGEX": r"^(CPC|CrPC|IT\s?Act)?$"}, "OP": "?"},
    ],
]

matcher.add("LEGAL_REF", patterns)


@tool("legal_ner")
def legal_ner(text: str):
    """
    Extract legal references (Sections, Articles, Acts, Rules) from input text.
    Returns structured JSON with raw text and extracted entities.
    """
    if not text or not isinstance(text, str):
        return {"raw_text": "", "legal_entities": []}

    doc = nlp(text)
    matches = matcher(doc)

    results = []
    for _, start, end in matches:
        span = doc[start:end]
        results.append(span.text)

    # Regex fallback for edge cases
    regex_refs = re.findall(
        r"(Sec\.?\s?\d+[A-Z]?|Section\s?\d+[A-Z]?|Art\.?\s?\d+|Article\s?\d+|Rule\s?\d+|Order\s?\d+)",
        text,
        re.IGNORECASE,
    )
    results.extend(regex_refs)

    # Deduplicate & clean
    results = list(set([r.strip() for r in results if r.strip()]))

    structured_entities = [{"reference": ref} for ref in results]

    return {
        "raw_text": text.strip(),
        "legal_entities": structured_entities,
        "metadata": {
            "entity_count": len(structured_entities),
            "extraction_method": "spaCy+regex"
        }
    }

