from backend.Configs.dbConfig import get_connection

class TaskModel():

    def get_task(self):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM tasks")

        tasks = cursor.fetchall()

        cursor.close()
        conn.close()

        return tasks


    def create_task(self, task, date, priority, category, done):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = """
                INSERT INTO tasks 
                (Task, Date, Priority, Category, Done) 
                VALUES(%s, %s, %s, %s, %s)
                """
        values = (task, date, priority, category, done)
        
        
        cursor.execute(query, values)
        conn.commit()
        
        created_rows = cursor.rowcount

        cursor.close()
        conn.close()

        return created_rows




    def update_task(self, task, date, priority, category, done, id):
        conn = get_connection()
        cursor = conn.cursor(dictionary = True)
        query = """
                UPDATE tasks
                SET task = %s, date = %s, priority = %s, category = %s, done = %s
                WHERE id = %s
                """
        values = (task, date, priority, category, done, id)
        
        cursor.execute(query, values)
        conn.commit()

        uptaded_rows = cursor.rowcount

        cursor.close()
        conn.close()

        return uptaded_rows



    def delete_tas(id):
        pass


model = TaskModel()

model.update_task("Limpar", "2026-05-05", "Alta", "Pessoal", False, 1)

print(model.get_task())