from backend.Models.UsersModel import UsersModel
import backend.Security.hash as hash_handler
import backend.Security.jwt_handler as token_handler

class UserController():
    def __init__(self):
        self.model = UsersModel()

    def login(self, user_data):
        user = self.model.get_user_by_email(
            user_data.email
        )

        if not user:
            return {
                "error": "Usuário não encontrado"
            }

        password_correct = hash_handler.verify_password(
            user_data.password,
            user["senha"]
        )   

        if not password_correct:
            return {
                "error": "Senha incorreta"
            }

        token = token_handler.create_token({
            "user_id": user["id"],
            "email": user["email"]
        })

        return {
            "access_token": token
        }

    def create_user(self, user_data):
        hashed_password = hash_handler.hash_password(
            user_data.password
        )

        return self.model.create_user(
            user_data.username,
            user_data.email,
            hashed_password
        )