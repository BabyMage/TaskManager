from backend.Models.taskModel import TaskModel


class TaskController():
    
    def __init__(self):
        self.model = TaskModel()
        
    def get_tasks(self):
        return self.model.get_tasks()

    def create_task(self, task_data):
        
        return self.model.create_task(
            task_data.task,
            task_data.date,
            task_data.priority,
            task_data.category,
            task_data.done
        )
    
    def update_tasks(self, task_data, id):
        return self.model.update_task(
            task_data.task,
            task_data.date,
            task_data.priority,
            task_data.category,
            task_data.done,
            id
        )
    
    def delete_task(self, id):
        return self.model.delete_task(id)