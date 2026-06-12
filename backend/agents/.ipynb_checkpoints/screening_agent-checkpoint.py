import chromadb

class ScreeningAgent:

    def __init__(self):

        client = chromadb.PersistentClient(
            path="./rag/chroma_db"
        )

        self.collection = client.get_collection(
            "sanctions"
        )

    def run(self, name):

        if not name:
            return False

        result = self.collection.query(
            query_texts=[name],
            n_results=1
        )

        match = result["documents"][0][0]

        print("Matched:", match)

        return (
            match.lower() ==
            name.lower()
        )