from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from Routes.UserRoutes import router as user_router # Rotas de usuario
from Routes.TaskRoutes import router as task_routes # Rotas de Tarefas (necessitam de token)


app = FastAPI()

import os

frontend_url = os.getenv(
    "FRONTEND_URL",
    "http://localhost:5173"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)




app.include_router(
    user_router,
    prefix="/users",
    tags=["Users"]
)


app.include_router(
    task_routes,
    prefix="/tasks",
    tags=["Tasks"]
)