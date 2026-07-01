from fastapi import APIRouter, Depends
from backend.Controllers.UsersController import UserController
from backend.Schemas.UserSchema import CreateUserSchema, UserLoginSchema, UserUpdateSchema, UserResponseSchema
from backend.Dependencies.auth import get_current_user

router = APIRouter()
controller = UserController()


@router.post("/register")
def register(user_data: CreateUserSchema):
    return controller.create_user(user_data)


@router.post("/login")
def login(user_data: UserLoginSchema):
    return controller.login(user_data)


@router.get(
        "/me",
        response_model = UserResponseSchema
)
def get_me(current_user = Depends(get_current_user)):
    return current_user



@router.put("/me")
def update_user(
    user_data: UserUpdateSchema,
    current_user = Depends(get_current_user)):
    return controller.update_user(
        current_user["id"],
        user_data
    )



@router.delete("/me")
def delete_user(
    current_user = Depends(get_current_user)
):

    return controller.delete_user(
        current_user["id"]
    )