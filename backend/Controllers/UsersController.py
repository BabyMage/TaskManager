from backend.Models.UsersModel import UsersModel
from datetime import datetime, timedelta
from dotenv import load_dotenv
from jose import jwt
import bcrypt
import os


load_dotenv()

class UserController():
    def __init__(self):
        self.model = UsersModel()
    


    def login(self, user_data):

        user = self.model.get_user_by_email(user_data.email)

        if not user:
            return {"error": "Usuario não Encontrado"}
        
        password_correct = bcrypt.checkpw(
            user_data.password.encode("utf-8"),
            user["senha"].encode("utf-8")
        )

        if not password_correct:
            return {"Error": "Senha Incorreta"}
        
        expiration = datetime.utcnow() + timedelta(hours=2)

        payload = {
            "user_id": user["id"],
            "email": user["email"],
            "exp": expiration
        }

        token = jwt.encode(
            payload,
            os.getenv("SECRET_KEY"),
            algorithm=os.getenv("ALGORITHM")
        )

        return{
            "access_token" : token
        }



    def create_user(self, user_data):
        password_bytes = user_data.password.encode("utf-8")

        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt)
        hashed_password = hashed_password.decode("utf-8")

        return self.model.create_user(
            user_data.username,
            user_data.email,
            hashed_password
        )
    
