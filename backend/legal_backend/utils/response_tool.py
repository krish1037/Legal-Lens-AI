# import json
# import logging
# from typing import List, Dict, Any
# from langchain.schema import Document
# import vertexai
# from vertexai.generative_models import GenerativeModel
# from app.utils.retrival_tool import VertexAIRetriever
# from app.utils.ner_tools import legal_ner   # 🚀 Import NER tool
# from app.config import PROJECT_ID, LOCATION

# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


# def format_response(
#     query: str,
#     entities: Any,
#     context: str,
#     llm_answer: str,
#     citations: List[str] = None,
# ) -> Dict[str, Any]:
#     """Format final output into JSON for frontend consumption."""
#     if isinstance(entities, str):
#         entities = [entities]

#     return {
#         "query": query,
#         "detected_entities": entities or [],
#         "retrieved_context": context,
#         "answer": llm_answer,
#         "citations": citations or [],
#         "status": "success",
#     }


# def response_to_json(response: Dict[str, Any]) -> str:
#     """Convert response dict into JSON string."""
#     return json.dumps(response, indent=2)


# def generate_answer_from_docs(query: str, docs: List[Document]) -> str:
#     """
#     Use Vertex AI Gemini 2.5 to generate an answer grounded in retrieved documents.
#     """
#     vertexai.init(project=PROJECT_ID, location=LOCATION)
#     model = GenerativeModel("gemini-2.5-pro")

#     # Combine context from docs
#     context = "\n\n".join([doc.page_content for doc in docs if doc.page_content])

#     prompt = f"""
#     You are a legal assistant. Answer the user query based strictly on the retrieved context below.
#     If the context does not contain enough information, respond with: 
#     "I could not find sufficient information in the provided context."

#     Query: {query}

#     Context:
#     {context}

#     Answer:
#     """

#     try:
#         response = model.generate_content(
#             [prompt],
#             generation_config={"temperature": 0.2, "max_output_tokens": 512},
#         )
#         return response.text

#     except Exception as e:
#         logger.error(f"Gemini API error: {e}")
#         return "An error occurred while generating the answer. The content may have been flagged by safety filters."

# def run_pipeline(query: str, k: int = 3) -> Dict[str, Any]:
#     """
#     Full RAG pipeline: NER → retrieval → Gemini response → structured JSON.
#     """
#     # Step 1: Run NER (✅ using .invoke to avoid deprecation warning)
#     ner_output = legal_ner.invoke(query)
#     entities = [e["reference"] for e in ner_output.get("entities", [])]

#     # Step 2: Retrieve context from Matching Engine
#     retriever = VertexAIRetriever(k=k)
#     docs = retriever.get_relevant_documents(query)  # ✅ now public method works

#     context_texts = [doc.page_content for doc in docs]
#     citations = [doc.metadata for doc in docs]

#     # Step 3: Generate grounded answer with Gemini
#     llm_answer = generate_answer_from_docs(query, docs)

#     # Step 4: Format final response
#     return format_response(
#         query=query,
#         entities=entities,
#         context="\n\n".join(context_texts),
#         llm_answer=llm_answer,
#         citations=citations,
#     )


# if __name__ == "__main__":
#     # Example test run
#     user_query = "IPC Section 2"
#     result = run_pipeline(user_query, k=3)
#     print(response_to_json(result))

# import logging
# from typing import List
# from langchain.schema import Document
# import vertexai
# from vertexai.generative_models import GenerativeModel, Part

# logger = logging.getLogger(__name__)
# logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")

# # --- Generates a grounded response using the context and user query. ---
# def generate_response_from_context(query: str, docs: List[Document]) -> str:
#     """
#     Uses the Gemini 1.5 Pro model to generate an answer based on retrieved documents.

#     This function constructs a prompt with the user's query and the retrieved
#     context, ensuring the model's response is grounded in the provided information.

#     Args:
#         query: The user's original query.
#         docs: A list of LangChain Document objects with retrieved context.

#     Returns:
#         The generated text response.
#     """
#     vertexai.init()  # Vertex AI is initialized by the rag_pipeline.py file
#     model = GenerativeModel("gemini-1.5-pro-preview-0514")

#     # --- Build context with metadata included ---
#     context_blocks = []
#     for doc in docs:
#         meta = doc.metadata
#         act = meta.get("act", "Unknown Act")
#         chapter = meta.get("chapter", "N/A")
#         section = meta.get("section", "N/A")
#         section_title = meta.get("section_title", "")
#         snippet = doc.page_content

#         context_blocks.append(
#             f"📖 Act: {act}\n"
#             f"📑 Chapter: {chapter}\n"
#             f"⚖️ Section: {section} - {section_title}\n"
#             f"🔹 Text: {snippet}"
#         )

#     context_text = "\n\n".join(context_blocks)

#     if not context_text:
#         return "I could not find sufficient information in the provided context."

#     # --- Construct the prompt with clear instructions for the LLM ---
#     prompt = f"""
#     You are a knowledgeable legal assistant. 
#     Your task is to answer the user's query strictly based on the provided legal documents. 
#     Use the Act, Chapter, and Section metadata when relevant to make your answer precise. 
#     Do NOT use outside knowledge.

#     If the context does not contain the answer, respond with:
#     "I could not find sufficient information in the provided documents to answer your question."

#     User Query:
#     {query}

#     Retrieved Legal Context:
#     {context_text}
#     """

#     try:
#         response = model.generate_content(
#             [Part.from_text(prompt)],
#             generation_config={"temperature": 0.2, "max_output_tokens": 512}
#         )
#         return response.text

#     except Exception as e:
#         logger.error(f"Gemini API error: {e}")
#         return "An error occurred while generating the answer. The content may have been flagged by safety filters."

# app/utils/response_tool.py

def format_response(query: str, entities: list, context: str, llm_answer, citations: list) -> dict:
    """
    Formats the final response into a consistent JSON structure.

    Args:
        query (str): The original user input (cleaned text).
        entities (list): Extracted legal entities (NER output).
        context (str): Retrieved context (empty for now, kept for extensibility).
        llm_answer (str|dict): The final answer generated by the LLM.
        citations (list): Extracted legal citations (empty for now).

    Returns:
        dict: JSON-serializable response object.
    """

    # If llm_answer is a string, wrap it into {summary, explanation}
    if isinstance(llm_answer, str):
        llm_answer = {
            "summary": llm_answer.strip(),
            "explanation": "",
        }

    return {
        "query": query,
        "legal_entities": entities if entities else [],
        "context": context if context else "",
        "llm_answer": {
            "summary": llm_answer.get("summary", ""),
            "explanation": llm_answer.get("explanation", "")
        },
        "citations": citations if citations else []
    }
