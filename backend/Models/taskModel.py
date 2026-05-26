from backend.Configs.DBConfig import get_connection

class TaskModel():

    def get_tasks(self, user_id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        query = """
                SELECT * FROM tasks
                WHERE user_id = %s
                """
        value = (user_id,)

        cursor.execute(query, value)

        tasks = cursor.fetchall()

        cursor.close()
        conn.close()

        return tasks



    def create_task(self, task, date, priority, category, done, user_id):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
                INSERT INTO tasks 
                (task, date, priority, category, done, user_id) 
                VALUES(%s, %s, %s, %s, %s)
                """
        values = (task, date, priority, category, done, user_id)
        
        
        cursor.execute(query, values)
        conn.commit()
        
        created_rows = cursor.rowcount

        cursor.close()
        conn.close()

        return created_rows




    def update_task(self, task, date, priority, category, done, user_id, id,):
        conn = get_connection()
        cursor = conn.cursor(dictionary = True)
        query = """
                UPDATE tasks
                SET task = %s, date = %s, priority = %s, category = %s, done = %s, user_id = %s
                WHERE id = %s
                """
        values = (task, date, priority, category, done, user_id, id)
        
        cursor.execute(query, values)
        conn.commit()

        uptaded_rows = cursor.rowcount

        cursor.close()
        conn.close()

        return uptaded_rows



    def delete_task(self, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary = True)
        query = "DELETE FROM tasks WHERE id = %s"
        value = (id, )

        cursor.execute(query, value)
        conn.commit()

        updated_table = cursor.rowcount

        cursor.close()
        conn.close()

        return updated_table