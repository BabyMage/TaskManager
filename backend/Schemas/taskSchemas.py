from pydantic import BaseModel, Field
from datetime import date as DateType

class TaskSchema(BaseModel):
    task: str = Field(..., min_length = 1, max_length = 100)
    date: DateType
    priority: str = Field(...)
    category: str = Field(..., min_length = 1, max_length = 50)
    done: bool = False