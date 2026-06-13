import chromadb
from pathlib import Path

CHROMA_PATH = Path(__file__).resolve().parents[1] / "rag" / "chroma_db"

class ScreeningAgent:

    def __init__(self):

        client = chromadb.PersistentClient(
            path=str(CHROMA_PATH)
        )

        self.collection = client.get_collection(
            "sanctions"
        )

    def run(self, name):

        if not name:
            return {
                "match": False,
                "matched_name": None,
                "metadata": None
            }

        result = self.collection.query(
            query_texts=[name],
            n_results=1,
            include=[
                "documents",
                "metadatas",
                "distances"
            ]
        )

        match = result["documents"][0][0]
        metadata = result["metadatas"][0][0]
        distance = result["distances"][0][0]
        is_match = (
            match.lower() ==
            name.lower()
        )

        print("Matched:", match)

        return {
            "match": is_match,
            "matched_name": match,
            "metadata": metadata,
            "distance": distance
        }
