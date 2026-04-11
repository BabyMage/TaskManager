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

# -> ROTAS 👇👇


# 🔍 GET - pegar tarefas
@app.get("/tasks")
def get_tasks():
    with open(FILE_PATH, "r") as file:
        data = json.load(file)
    return data

#################################################################

# ➕ POST - adicionar tarefa
@app.post("/add_task")
def add_task(task: Task):
    with open(FILE_PATH, "r") as file:
        data = json.load(file)
    
    if data["list"]:
        last_id = data["list"][-1]["id"]
    else:
        last_id = 0
    
    new_task = task.model_dump()
    new_task["id"] = last_id + 1


    data["list"].append(new_task)

    with open(FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)
    
    return new_task