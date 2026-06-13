from fastapi import FastAPI
from fastapi import UploadFile
from fastapi.middleware.cors import CORSMiddleware

from orchestrator import KycCrewOrchestrator

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = KycCrewOrchestrator()

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

    return orchestrator.process_document(
        file_path
    )
