import chromadb
from pathlib import Path

CHROMA_PATH = Path(__file__).resolve().parent / "chroma_db"

client = chromadb.PersistentClient(
    path=str(CHROMA_PATH)
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

sanction_metadata = [
    {
        "entity_type": "person",
        "risk_category": "sanctions",
        "source": "demo_watchlist",
        "country": "US"
    },
    {
        "entity_type": "person",
        "risk_category": "pep_watchlist",
        "source": "demo_watchlist",
        "country": "AE"
    },
    {
        "entity_type": "organization",
        "risk_category": "trade_screening",
        "source": "demo_watchlist",
        "country": "SG"
    },
    {
        "entity_type": "organization",
        "risk_category": "terror_finance",
        "source": "demo_watchlist",
        "country": "GB"
    },
    {
        "entity_type": "organization",
        "risk_category": "sanctions",
        "source": "demo_watchlist",
        "country": "US"
    }
]

collection.upsert(
    documents=sanction_names,
    ids=[str(i) for i in range(len(sanction_names))],
    metadatas=sanction_metadata
)

print("Sanctions loaded with metadata")
