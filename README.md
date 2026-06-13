# AMD KYC AI

AI Compliance Copilot is a KYC document review workspace. It lets a compliance user upload an identity document, extract customer fields, screen the customer against a ChromaDB watchlist, calculate risk evidence, generate a decision, review audit logs, and export the result as a PDF report.

## Features

- React dashboard built with Material UI cards.
- Manual document upload flow.
- Chat-guided document upload flow.
- FastAPI backend for document processing.
- OCR-based customer extraction.
- ChromaDB sanctions/watchlist screening with metadata.
- CrewAI orchestration layer with deterministic local agent execution.
- Risk scoring and decision generation.
- Backend-generated audit logs shown in the UI and PDF.
- Printable KYC review PDF report.
- Architecture diagram in `docs/architecture.md`.

## Project Structure

```text
backend/
  app.py                    FastAPI app and /process endpoint
  orchestrator.py           KYC orchestration and audit log generation
  agents/
    extraction_agent.py     OCR and field extraction
    screening_agent.py      ChromaDB AML/watchlist screening
    scoring_agent.py        Risk scoring and evidence
    decision_agent.py       Final decision logic
  rag/
    load_sanctions.py       Loads sanctions data and metadata into ChromaDB
    chroma_db/              Persistent ChromaDB data

frontend-react/
  src/
    App.jsx                 Main React dashboard
    api.js                  Axios API client
    components/             Upload, dashboard, audit, and PDF components

docs/
  architecture.md           Mermaid architecture diagram
```

## Prerequisites

- Python 3.10+
- Node.js 18+
- Tesseract/EasyOCR-compatible OCR environment

## Backend Setup

From the project root:

```bash
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
```

Load or refresh the ChromaDB sanctions collection:

```bash
cd backend
..\.venv\Scripts\python.exe rag\load_sanctions.py
```

Run the backend:

```bash
cd backend
uvicorn app:app --reload --host 127.0.0.1 --port 8000
```

The backend API will be available at:

```text
http://localhost:8000
```

## Frontend Setup

Open a second terminal:

```bash
cd frontend-react
npm install
npm run dev
```

The React app will usually run at:

```text
http://localhost:5173
```

## Usage

1. Start the FastAPI backend.
2. Start the React frontend.
3. Choose either `Manual upload` or `Chat guided`.
4. Upload a JPG, JPEG, or PNG KYC document.
5. Review customer details, risk score, decision, evidence, workflow, and audit trail.
6. Click `Save PDF` to open a printable full KYC review report.

## API

### `POST /process`

Accepts multipart form data:

```text
file: JPG/JPEG/PNG document
```

Returns:

```json
{
  "customer": {
    "pan": "ABCDE1234F",
    "name": "Customer Name"
  },
  "aml": {
    "match": false,
    "matched_name": "John Smith",
    "metadata": {
      "entity_type": "person",
      "risk_category": "sanctions",
      "source": "demo_watchlist",
      "country": "US"
    }
  },
  "score": 20,
  "decision": "APPROVED",
  "evidence": ["PAN Missing"],
  "audit_logs": [],
  "orchestration": {
    "framework": "CrewAI",
    "available": true,
    "process": "sequential"
  }
}
```

## CrewAI Note

`backend/orchestrator.py` defines CrewAI agents/tasks and records orchestration status. The current processing remains deterministic by executing the local Python agents directly, so the app can run without requiring an LLM key.

If the audit trail says `CrewAI package not installed`, install dependencies in the same Python environment used to run FastAPI:

```bash
pip install -r requirements.txt
```

Then restart the backend.

## Architecture

See [docs/architecture.md](docs/architecture.md) for the Mermaid architecture diagram.

## Verification

Useful checks:

```bash
cd backend
python -m py_compile app.py orchestrator.py agents\screening_agent.py agents\scoring_agent.py rag\load_sanctions.py
```

```bash
cd frontend-react
npm run build
```

## Current Completion Checklist

```text
React Dashboard        Complete
Material UI Cards      Complete
ChromaDB Metadata      Complete
CrewAI orchestration   Complete
Audit Logs             Complete
Architecture Diagram   Complete
```
