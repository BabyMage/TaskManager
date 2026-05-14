from Configs.dbConfig import get_connection

class TaskModel():

    def get_task():
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("SELECT * FROM tasks")

        tasks = cursor.fetchall()

        cursor.close()
        conn.close()

        return tasks

    def create_task(id):
        pass
    
    def update_task(id):
        pass

    def delete_tas(id):
        pass