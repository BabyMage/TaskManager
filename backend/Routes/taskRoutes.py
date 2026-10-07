from fastapi import APIRouter, Depends
from Controllers.TaskController import TaskController
from Schemas.TaskSchema import TaskSchema
from Dependencies.auth import get_current_user

router = APIRouter()
controller = TaskController()


@router.get("/")
def get_tasks(current_user = Depends(get_current_user)):
    return controller.get_tasks(current_user["id"])



@router.post("/")
def create_tasks(
    task_data : TaskSchema,
    current_user = Depends(get_current_user)
):
    return controller.create_task(
        task_data,
        current_user["id"]
    )


@router.put("/{task_id}")
def update_task(
    task_id: int,
    task_data: TaskSchema,
    current_user = Depends(get_current_user)
):

    return controller.update_tasks(task_id, task_data, current_user["id"])



@router.delete("/{task_id}")
def delete_task(task_id: int, current_user = Depends(get_current_user)):
    return controller.delete_task(task_id, current_user["id"])