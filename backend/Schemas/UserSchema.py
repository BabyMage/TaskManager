from pydantic import BaseModel, Field, EmailStr


class CreateUserSchema(BaseModel):
    username: str = Field(min_length = 1, max_length = 50)
    email: EmailStr
    password: str = Field(min_length = 8)

class UserLoginSchema(BaseModel):
    email: EmailStr
    password: str