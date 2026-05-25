import bcrypt
from backend.Models.UsersModel import UsersModel

class UserController():
    def __init__(self):
        self.model = UserController
    
    def get_users(self):
        return self.model.get_users()

    def creat_user(self, user_data):
        password_bytes = user_data.password.encode("utf-8")

        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(password_bytes, salt)

        return self.model.creat_user(
            user_data.username,
            user_data.email,
            hashed_password
        )