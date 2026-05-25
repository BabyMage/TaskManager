from backend.Configs.DBConfig import get_connection

class UsersModel():

    def get_users(self):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM users")

        users = cursor.fetchall()

        cursor.close()
        conn.close()

        return users


    def create_user(self, user_name, email, password):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
                INSERT INTO users 
                (username, email, senha) 
                VALUES(%s, %s, %s)
                """
        values = (user_name, email, password)
        
        
        cursor.execute(query, values)
        conn.commit()
        
        created_rows = cursor.rowcount

        cursor.close()
        conn.close()

        return created_rows




    def update_users(self, username, email, password):
        conn = get_connection()
        cursor = conn.cursor(dictionary = True)
        query = """
                UPDATE tasks
                SET username = %s, email = %s, senha = %s, 
                WHERE id = %s
                """
        values = (username, email, password)
        
        cursor.execute(query, values)
        conn.commit()

        uptaded_rows = cursor.rowcount

        cursor.close()
        conn.close()

        return uptaded_rows



    def delete_user(self, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary = True)
        query = "DELETE FROM users WHERE id = %s"
        value = (id,)

        cursor.execute(query, value)
        conn.commit()

        updated_table = cursor.rowcount

        cursor.close()
        conn.close()

        return updated_table