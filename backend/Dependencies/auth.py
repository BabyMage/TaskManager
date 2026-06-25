from fastapi import Header, HTTPException
from backend.Security.jwt_handler import verify_token
from backend.Models.UsersModel import UsersModel


model = UsersModel()

def get_current_user(authorization: str = Header()):
    
    if not authorization.startswith("Bearer "):
        return None

    token = authorization.replace("Bearer ", "")

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code = 401,
            detail = "Token Invalido"
        )
    
    user = model.get_user_by_id(
        payload["user_id"]
    )

    return user