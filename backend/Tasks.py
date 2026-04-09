import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 📦 Modelo da tarefa
class Task(BaseModel):
    Task: str
    Date: str
    Done: bool

app = FastAPI()

# 🌐 Libera acesso do React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 📁 Caminho do JSON
FILE_PATH = Path(__file__).parent / "tasks.json"

# 🔍 GET - pegar tarefas
@app.get("/tasks")
def get_tasks():
    with open(FILE_PATH, "r") as file:
        data = json.load(file)
    return data

# ➕ POST - adicionar tarefa
@app.post("/add_task")
def add_task(task: Task):
    with open(FILE_PATH, "r") as file:
        data = json.load(file)

    data["list"].append(task.model_dump())

    with open(FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)