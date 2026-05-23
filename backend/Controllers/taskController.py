from backend.Models.TaskModel import TaskModel


class TaskController():
    def __init__(self):
        self.model = TaskModel()
        
    
    
    def get_tasks(self):
        return self.model.get_tasks()



    def create_task(self, task_data):

        task = task_data.task.strip.title()

        valid_priorities = ["Alta", "Média", "Baixa"]
        if task_data.priority not in valid_priorities:
            raise ValueError("Prioridade Invalida")

        return self.model.create_task(
            task,
            task_data.date,
            task_data.priority,
            task_data.category,
            task_data.done
        )
    


    def update_tasks(self, task_data, id):

        task = task_data.task.strip.title()

        valid_priorities = ["Alta", "Média", "Baixa"]
        if task_data.priority not in valid_priorities:
            raise ValueError("Prioridade Invalida")

        return self.model.update_task(
            task,
            task_data.date,
            task_data.priority,
            task_data.category,
            task_data.done,
            id
        )
    


    def delete_task(self, id):
        return self.model.delete_task(id)
