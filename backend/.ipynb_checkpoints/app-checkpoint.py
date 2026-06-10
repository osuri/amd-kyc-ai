from fastapi import FastAPI
from fastapi import UploadFile

from agents.extraction_agent import ExtractionAgent
from agents.screening_agent import ScreeningAgent
from agents.scoring_agent import ScoringAgent
from agents.decision_agent import DecisionAgent

app = FastAPI()

extractor = ExtractionAgent()

screening = ScreeningAgent()

scoring = ScoringAgent()

decision = DecisionAgent()

@app.post("/process")
async def process(
    file: UploadFile
):

    file_path = file.filename

    content = await file.read()

    with open(
        file_path,
        "wb"
    ) as f:

        f.write(content)

    customer = extractor.run(
        file_path
    )

    aml_match = screening.run(
        customer["name"]
    )

    score, evidence = scoring.run(
        customer,
        aml_match
    )

    result = decision.run(
        score
    )

    return {
        "customer": customer,
        "score": score,
        "decision": result,
        "evidence": evidence
    }