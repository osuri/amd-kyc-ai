from datetime import datetime

from agents.extraction_agent import ExtractionAgent
from agents.screening_agent import ScreeningAgent
from agents.scoring_agent import ScoringAgent
from agents.decision_agent import DecisionAgent

try:
    from crewai import Agent, Crew, Process, Task
except ImportError:
    Agent = None
    Crew = None
    Process = None
    Task = None


class KycCrewOrchestrator:

    def __init__(self):
        self.extractor = ExtractionAgent()
        self.screening = ScreeningAgent()
        self.scoring = ScoringAgent()
        self.decision = DecisionAgent()
        self.crew_available = all([Agent, Crew, Process, Task])
        self.crew = self._build_crew() if self.crew_available else None

    def _build_crew(self):
        agents = [
            Agent(
                role="OCR and extraction agent",
                goal="Extract customer identity fields from KYC documents",
                backstory="Reads uploaded identity documents and returns structured KYC fields."
            ),
            Agent(
                role="AML screening agent",
                goal="Screen extracted customers against ChromaDB watchlist metadata",
                backstory="Uses sanctions and risk metadata for AML screening."
            ),
            Agent(
                role="Risk scoring agent",
                goal="Calculate customer risk score and evidence",
                backstory="Combines AML results and missing KYC signals into a risk score."
            ),
            Agent(
                role="Decision agent",
                goal="Create the final compliance decision",
                backstory="Maps the score to approved, review, or rejected outcomes."
            )
        ]

        tasks = [
            Task(
                description="Extract customer fields from the uploaded document.",
                expected_output="Structured customer data including name and PAN.",
                agent=agents[0]
            ),
            Task(
                description="Screen the customer against the AML watchlist.",
                expected_output="AML match result with watchlist metadata.",
                agent=agents[1]
            ),
            Task(
                description="Calculate the risk score and evidence.",
                expected_output="Numeric score and supporting evidence.",
                agent=agents[2]
            ),
            Task(
                description="Generate the final KYC decision.",
                expected_output="Final KYC decision.",
                agent=agents[3]
            )
        ]

        return Crew(
            agents=agents,
            tasks=tasks,
            process=Process.sequential
        )

    def _audit_entry(self, step, status="Completed", detail=None):
        return {
            "step": step,
            "status": status,
            "detail": detail or f"{step} completed successfully",
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }

    def process_document(self, file_path):
        audit_logs = [
            self._audit_entry(
                "CrewAI Orchestration",
                detail=(
                    "CrewAI workflow registered; deterministic local agents executed"
                    if self.crew_available
                    else "CrewAI package not installed; deterministic local agents executed"
                )
            )
        ]

        customer = self.extractor.run(file_path)
        audit_logs.append(self._audit_entry("OCR Agent"))
        audit_logs.append(self._audit_entry("Extraction Agent"))

        aml_result = self.screening.run(customer.get("name"))
        audit_logs.append(
            self._audit_entry(
                "AML Screening",
                detail=(
                    f"Matched {aml_result.get('matched_name')}"
                    if aml_result.get("match")
                    else "No exact AML match"
                )
            )
        )

        score, evidence = self.scoring.run(customer, aml_result)
        audit_logs.append(
            self._audit_entry(
                "Risk Scoring",
                detail=f"Risk score generated: {score}"
            )
        )

        result = self.decision.run(score)
        audit_logs.append(
            self._audit_entry(
                "Decision Engine",
                detail=f"Decision generated: {result}"
            )
        )

        return {
            "customer": customer,
            "aml": aml_result,
            "score": score,
            "decision": result,
            "evidence": evidence,
            "audit_logs": audit_logs,
            "orchestration": {
                "framework": "CrewAI",
                "available": self.crew_available,
                "process": "sequential"
            }
        }
