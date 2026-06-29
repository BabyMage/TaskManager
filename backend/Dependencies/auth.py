from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from backend.Security.jwt_handler import verify_token
from backend.Models.UsersModel import UsersModel


security = HTTPBearer()
model = UsersModel()


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    token = credentials.credentials

    payload = verify_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Token inválido"
        )

    user = model.get_user_by_id(
        payload["user_id"]
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="Usuário não encontrado"
        )

    return user