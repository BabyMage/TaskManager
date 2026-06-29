from fastapi import APIRouter, Depends
from backend.Controllers.TaskController import TaskController
from backend.Schemas.TaskSchema import TaskSchema
from backend.Dependencies.auth import get_current_user

router = APIRouter()
controller = TaskController()

