import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 📦 Modelo da tarefa
class Task(BaseModel):
    Task: str
    Date: str
    Category: str
    Priority: str
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



#################################################################


@app.put("/update_task/{task_id}")
def update_task(task_id: int, updated_task: Task ):
    with open(FILE_PATH, "r") as file:
        data = json.load(file)

    for i, task in enumerate(data["list"]):
        if task["id"] == task_id:
            updated_data = updated_task.model_dump()
            updated_data["id"] = task_id
            data["list"][i] = updated_data
            break

    with open(FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)


#################################################################


@app.delete("/delete_task/{task_id}")
def delete_task(task_id: int):
    with open(FILE_PATH, "r") as file:
        data = json.load(file)

    # filtra removendo a tarefa com o ID
    data["list"] = [task for task in data["list"] if task["id"] != task_id]

    with open(FILE_PATH, "w") as file:
        json.dump(data, file, indent=4)

    return {"message": "Task deletada com sucesso"}