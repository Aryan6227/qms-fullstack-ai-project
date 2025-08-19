# main.py

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
import os
import google.generativeai as genai
from dotenv import load_dotenv

# --- NEW: AI Setup ---
# Load environment variables from .env file
load_dotenv()

# Configure the Gemini API key
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the Gemini Model
model = genai.GenerativeModel('gemini-1.5-flash') # Or 'gemini-1.5-pro'
# --- END: AI Setup ---


# 1. Create a FastAPI app instance
app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:5173",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. Define the data models for QMS Events
class QMSEvent(BaseModel):
    id: str
    title: str
    type: str
    status: str
    dueDate: str
    initiator: str
    severity: str

class QMSEventCreate(BaseModel):
    title: str = Field(..., example="New event title from wizard")
    type: str = Field(..., example="Deviation")

# --- NEW: Define data model for AI Prompt ---
class AIPrompt(BaseModel):
    prompt: str
    # We can add chat history later if needed
    # history: Optional[List[dict]] = None
# --- END: AI Prompt model ---


# 3. Create an in-memory "database"
db: List[QMSEvent] = [
    QMSEvent(id='DEV-2025-001', title='Line 3 temperature out of range', type='Deviation', status='In Progress', dueDate='2025-09-15', initiator='A. Johnson', severity='High'),
    QMSEvent(id='CAPA-2025-012', title='Update CMMS workflow for PM deferrals', type='CAPA', status='In Progress', dueDate='2025-10-01', initiator='B. Williams', severity='Medium'),
    QMSEvent(id='CC-2025-034', title='Implement new QC testing protocol for Product X', type='Change Control', status='Planned', dueDate='2025-09-20', initiator='C. Brown', severity='Medium'),
    QMSEvent(id='AUD-FIN-007', title='Finding from annual GMP audit', type='Audit Finding', status='Closed', dueDate='2025-08-30', initiator='S. Gupta', severity='Low')
]

# 4. Define the API endpoint to get all QMS events
@app.get("/events", response_model=List[QMSEvent])
async def get_events():
    return db

# 5. Define the API endpoint to create a new QMS event
@app.post("/events", response_model=QMSEvent, status_code=201)
async def create_event(event_data: QMSEventCreate):
    new_id = f"EVT-2025-{len(db) + 1:03d}"
    new_event = QMSEvent(
        id=new_id, title=event_data.title, type=event_data.type,
        status="Planned", dueDate="2025-12-31", initiator="System", severity="Medium"
    )
    db.append(new_event)
    return new_event

# --- NEW: Define the API endpoint for the AI Assistant ---
@app.post("/ai-assistant")
async def ai_assistant_handler(prompt_data: AIPrompt):
    """
    Receives a prompt from the frontend, sends it to the Gemini model,
    and returns the AI's response.
    """
    try:
        # We add context to the user's prompt to guide the AI
        full_prompt = (
            "You are an expert AI assistant for a Quality Management System (QMS) in a life science company. "
            "Be concise and helpful. The user's current list of events is: \n"
            f"{[event.dict() for event in db]}\n\n"
            "Based on this data, please answer the following user prompt:\n"
            f"User Prompt: '{prompt_data.prompt}'"
        )

        response = model.generate_content(full_prompt)

        return {"response": response.text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# --- END: AI Assistant Endpoint ---