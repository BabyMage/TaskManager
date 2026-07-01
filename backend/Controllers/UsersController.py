from backend.Models.UsersModel import UsersModel
import backend.Security.hash as hash_handler
import backend.Security.jwt_handler as token_handler
from fastapi import HTTPException

class UserController():

    def __init__(self):
        self.model = UsersModel()


    def login(self, user_data):
        user = self.model.get_user_by_email(
            user_data.email
        )

        if not user:
            raise HTTPException(
                status_code=404,
                detail="Usuário não encontrado"
            )

        password_correct = hash_handler.verify_password(
            user_data.password,
            user["password"]
        )   

        if not password_correct:
            raise HTTPException(
                status_code=400,
                detail="Senha Incorreta"
            )

        token = token_handler.create_token({
            "user_id": user["id"],
            "email": user["email"]
        })

        return {
            "access_token": token,
            "token_type": "bearer",
            "user": {
                "id": user["id"],
                "username": user["username"],
                "email": user["email"]
                }
            }

    
    
    def create_user(self, user_data):
        hashed_password = hash_handler.hash_password(
            user_data.password
        )

        existing_email = self.model.get_user_by_email(user_data.email)
        if existing_email:
            raise HTTPException(
                status_code=409,
                detail="Esse email ja está cadastrado"
            )

        return self.model.create_user(
            user_data.username,
            user_data.email,
            hashed_password
        )



    def update_user(self, user_id, user_data):
        
        password = None

        if user_data.password:
            password = hash_handler.hash_password(
                user_data.password
            )
        
        existing_email = self.model.get_user_by_email(user_data.email)
        if existing_email and existing_email["id"] != user_id:
            raise HTTPException(
                status_code=409,
                detail="Erro! Esse email ja está cadastrado em outro usuario"
            )
        
        current_user = self.model.get_user_by_id(user_id)

        if not current_user:
            raise HTTPException(
                status_code=404,
                detail="Usuario não encontrado"
            )
        
        if not password:
            password = current_user["password"]

        return self.model.update_user(
            user_data.username,
            user_data.email,
            password,
            user_id
        )
    

    
    def delete_user(self, id):

        user = self.model.get_user_by_id(id)

        if not user:
            raise HTTPException(
                status_code=404,
                detail="Usuario não encontrado"
            )
        
        return self.model.delete_user(id)