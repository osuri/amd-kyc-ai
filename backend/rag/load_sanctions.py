import chromadb

client = chromadb.PersistentClient(
    path="./rag/chroma_db"
)

collection = client.get_or_create_collection(
    name="sanctions"
)

sanction_names = [
    "John Smith",
    "Mohammed Ali",
    "Global Trading",
    "Terror Finance Ltd",
    "Blacklisted Corp"
]

collection.add(
    documents=sanction_names,
    ids=[str(i) for i in range(len(sanction_names))]
)

print("Sanctions loaded")