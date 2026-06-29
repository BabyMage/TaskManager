from datetime import datetime, timedelta, timezone
from dotenv import load_dotenv
from jose import jwt, JWTError
import os
from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")


def create_token(data: dict) -> str:
    payload = data.copy()

    expiration = datetime.now(timezone.utc) + timedelta(hours=2)

    payload.update({
            "exp": expiration   
        })
    
    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token


def verify_token(token: str):
    try:
        payload = jwt.decode(
            token, 
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        return payload
    
    except JWTError as error:
        print("ERRO JWT:", error)
        return None
