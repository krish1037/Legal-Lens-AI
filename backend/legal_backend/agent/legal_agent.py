def process_query(query: str) -> dict:
    """Process a legal query and return structured response."""
    # This is a temporary implementation for testing
    return {
        "query": query,
        "legal_entities": ["Test Entity"],
        "context": "Test context",
        "llm_answer": {
            "summary": "This is a test response.",
            "explanation": "The backend is now working correctly."
        },
        "citations": ["Test Citation"]
    }


# # --- Step 1: Initialize Gemini 2.5 Flash ---
# llm = ChatVertexAI(
#     model="gemini-2.5-flash",
#     temperature=0,
#     max_output_tokens=512,
# )

# # --- Step 2: Define prompt for structured response ---
# prompt = ChatPromptTemplate.from_messages([
#     (
#         "system",
#         "You are a legal assistant. You must:\n"
#         "1. Detect legal references (Articles, Sections, Acts).\n"
#         "2. Retrieve matching context from Indian law database.\n"
#         "3. Provide a clear and concise explanation with citations.\n"
#         "If no references are found, use the full user query for context."
#     ),
#     (
#         "human",
#         "{query}\n\n"
#         "Detected References: {entities}\n\n"
#         "Retrieved Context: {context}"
#     ),
# ])


# # --- Helper: Extract citations using regex ---
# def extract_citations(text: str) -> list:
#     """Extract Article/Section references from retrieved context."""
#     if not text:
#         return []
#     matches = re.findall(
#         r"(Article\s?\d+[A-Z]?|Art\.?\s?\d+[A-Z]?|"
#         r"Section\s?\d+[A-Z]?|Sec\.?\s?\d+[A-Z]?)",
#         text,
#         re.IGNORECASE
#     )
#     # Deduplicate + clean
#     return list(set([m.strip() for m in matches]))


# # --- Step 3: Deterministic pipeline ---
# def process_query(user_input: str) -> dict:
#     """
#     Full legal query pipeline:
#     1. Route input to correct extractor (OCR, PDF, Text).
#     2. Pass cleaned text to NER for legal term extraction.
#     3. Retrieve matching Indian law context from Matching Engine.
#     4. Extract citations.
#     5. Generate final structured JSON response using Gemini.
#     """

#     # --- Step 1. Input Routing ---
#     text = input_router(user_input)

#     # --- Step 2. NER Extraction ---
#     entities = legal_ner(text)
#     if not entities or "No legal references found" in entities:
#         entities = text  # fallback: pass whole query

#     # --- Step 3. Context Retrieval ---
#     retriever = VertexAIRetriever(endpoint=INDEX_ENDPOINT, k=3)
#     try:
#         docs = retriever.get_relevant_documents(entities)
#         context = "\n\n".join([doc.page_content for doc in docs]) if docs else "[No matching laws found]"
#     except Exception as e:
#         context = f"[Retrieval failed: {str(e)}]"

#     # --- Step 4. Extract Citations ---
#     citations = extract_citations(context)

#     # --- Step 5. Generate Answer with Gemini ---
#     chain = prompt | llm
#     response = chain.invoke({
#         "query": text,
#         "entities": entities,
#         "context": context,
#     })

#     final_answer = getattr(response, "content", str(response))

#     # --- Step 6. Format JSON Output ---
#     return format_response(
#         query=text,
#         entities=entities,
#         context=context,
#         llm_answer=final_answer,
#         citations=citations
#     )


# if __name__ == "__main__":
#     # Quick test
#     sample_query = "What does Article 21 of the Indian Constitution say?"
#     result = process_query(sample_query)

#     import json
#     print(json.dumps(result, indent=2))
import re
import json
from langchain.prompts import ChatPromptTemplate
from langchain_google_vertexai import ChatVertexAI

from legal_backend.utils.input_router import input_router
from legal_backend.utils.response_tool import format_response

# --- Step 1: Initialize Gemini 2.5 Flash ---
llm = ChatVertexAI(
    model="gemini-2.5-flash",
    temperature=0,
    max_output_tokens=512,
)

# --- Step 2: Define prompt for structured response ---
prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are legal assistant. Always respond in **valid JSON** format with fields:\n"
        "{{\n"
        '  "summary": "...",\n'
        '  "explanation": "...",\n'
        '  "citations": ["..."]\n'
        "}}\n\n"
        "Rules:\n"
        "- Use only educational terminology.\n"
        "- Be concise and accurate.\n"
        "- Always include citations if available, else keep it empty.\n"
    ),
    (
        "human",
        "User Query: {query}\n\n"
        "Detected References: {entities}\n\n"
        "Extracted Text: {raw_text}"
    ),
])


# --- Step 3: Full pipeline ---
def process_query(user_input: str) -> dict:
    """
    Full legal query pipeline (simplified):
    1. Route input (OCR, PDF, DOCX, text) → Extract text + NER.
    2. Pass extracted text + entities to LLM.
    3. Return structured JSON response.
    """

    # --- Step 1. Input Routing ---
    routed = input_router(user_input)

    if "error" in routed:
        return {"error": routed["error"], "source": routed.get("source", user_input)}

    raw_text = routed.get("raw_text", "")
    entities = routed.get("ner", {}).get("entities", [])


    # --- Step 2. Generate Answer with Gemini ---
    chain = prompt | llm
    response = chain.invoke({
        "query": raw_text,
        "entities": [e["reference"] for e in entities] if entities else [],
        "raw_text": raw_text  # ✅ required by prompt
    })
    content = getattr(response, "content", "").strip()
    cleaned = re.sub(r"^```json|```$", "", content, flags=re.MULTILINE).strip()
    try:
        llm_json = json.loads(cleaned)
    except Exception:
        llm_json = {
            "summary": content,
            "explanation": "",
            "citations": []
        }

    # --- Step 3. Format JSON Output ---
    return format_response(
        query=raw_text,
        entities=entities,
        context="",  # No retrieval, so empty
        llm_answer= llm_json,
        citations=llm_json.get("citations", [])
    )


if __name__ == "__main__":
    # Quick test
    sample_query = "What does Article 21 of the Indian Constitution say?"
    result = process_query(sample_query)
    print(json.dumps(result, indent=2))
