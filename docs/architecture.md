# AMD KYC AI Architecture

```mermaid
flowchart LR
  User[Compliance user] --> React[React Dashboard]
  React --> Upload[Manual Upload]
  React --> Chat[Chat Guided Upload]
  Upload --> API[FastAPI /process]
  Chat --> API

  API --> Orchestrator[KycCrewOrchestrator]
  Orchestrator --> Crew[CrewAI Sequential Workflow]
  Orchestrator --> OCR[OCR + Extraction Agent]
  Orchestrator --> Screening[AML Screening Agent]
  Orchestrator --> Scoring[Risk Scoring Agent]
  Orchestrator --> Decision[Decision Agent]

  Screening --> Chroma[(ChromaDB Sanctions Collection)]
  Chroma --> Metadata[Watchlist Metadata]

  Decision --> Response[Customer + Score + Evidence + Audit Logs]
  Response --> React
  React --> PDF[Printable PDF Report]
```

## Components

- React dashboard: Manual upload, chat-guided intake, KYC review dashboard, PDF export.
- FastAPI backend: Receives documents and returns structured KYC review results.
- KycCrewOrchestrator: Coordinates extraction, AML screening, scoring, decisioning, and audit logs.
- ChromaDB: Stores sanctions/watchlist documents with metadata such as entity type, risk category, source, and country.
- Audit logs: Returned from the backend for each processed document and shown in the dashboard/PDF.
