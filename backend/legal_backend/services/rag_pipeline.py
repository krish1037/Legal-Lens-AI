import logging
from legal_backend.utils.retrival_tool import VertexAIRetriever
from legal_backend.utils.response_tool import generate_response_from_context

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")


# --- Main RAG Pipeline ---
# This script orchestrates the entire Retrieval-Augmented Generation process.

def main():
    """
    Runs the complete RAG pipeline:
    1. Uses a predefined test query (instead of terminal input).
    2. Retrieves relevant documents from the Vertex AI index.
    3. Generates a grounded response using Gemini 1.5 Pro.
    4. Prints the final answer and detailed sources.
    """
    try:
        # Step 1: Initialize retriever
        retriever = VertexAIRetriever(k=3)

        # Step 2: Hardcoded test query
        user_query = "Indian Penal Code Chapter 1 section 2 definition of crime"
        print(f"\nUser query: {user_query}")

        print("\nSearching for relevant legal documents...")

        # Step 3: Retrieve documents
        retrieved_docs = retriever.get_relevant_documents(user_query)

        if not retrieved_docs:
            print("No relevant documents found. Please try a different query.")
            return

        print("Documents retrieved. Generating grounded answer...")

        # Step 4: Generate response
        final_answer = generate_response_from_context(user_query, retrieved_docs)

        # Step 5: Print results
        print("\n--- Final Answer ---")
        print(final_answer)
        print("--------------------")

        print("\n--- Sources ---")
        for i, doc in enumerate(retrieved_docs):
            meta = doc.metadata
            act = meta.get("act", "Unknown Act")
            chapter = meta.get("chapter", "N/A")
            section = meta.get("section", "N/A")
            section_title = meta.get("section_title", "")
            score = meta.get("score", "N/A")
            source = meta.get("source", "Vector DB")

            print(f"[{i+1}] ⚖️ {act} — Section {section}: {section_title}")
            print(f"     📑 Chapter: {chapter}")
            print(f"     🔗 Source: {source}")
            print(f"     🎯 Similarity Score: {score}")
            print(f"     📖 Snippet: {doc.page_content[:250]}...\n")  # show first 250 chars for more context

        print("-----------------")

    except Exception as e:
        logger.error(f"An unexpected error occurred in the pipeline: {e}")
        print("An error occurred. Please check the logs for more details.")


if __name__ == "__main__":
    main()
