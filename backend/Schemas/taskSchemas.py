from pydantic import BaseModel
from typing import Optional



class TaskSchema(BaseModel):

    title: str
    date: str
    category: Optional[str] = None
    priority: Optional[str] = None
    done: bool = False