from backend.Models.taskModel import TaskModel

class TaskController():
    
    def __init__(self):
        self.model = TaskModel()

    def get_tasks(self):
        return self.model.get_tasks()

    def create_task(self, task, date, priority, category, done):
        return self.model.create_task(task, date, priority, category, done)
    
    def update_tasks(self, task, date, priority, category, done, id):
        return self.model.update_task(task, date, priority, category, done, id)
    
    def delete_task(self, id):
        return self.model.delete_task(id)