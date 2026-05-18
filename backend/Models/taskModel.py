from Configs.dbConfig import get_connection

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


    def update_task(id):
        pass


    def delete_tas(id):
        pass

TaskModel.get_task()