from backend.Models.TaskModel import TaskModel


class TaskController():
    def __init__(self):
        self.model = TaskModel()
    
    
    def get_tasks(self, user_id):
        return self.model.get_tasks(user_id)


    def create_task(self, task_data, user_id):

        task = task_data.task.strip().title()

        valid_priorities = ["Alta", "Média", "Baixa"]
        if task_data.priority not in valid_priorities:
            raise ValueError("Prioridade Invalida")

        return self.model.create_task(
            task,
            task_data.date,
            task_data.priority,
            task_data.category,
            task_data.done,
            user_id
        )
    


    def update_tasks(self, task_data, id):

        task = task_data.task.strip().title()

        valid_priorities = ["Alta", "Média", "Baixa"]
        if task_data.priority not in valid_priorities:
            raise ValueError("Prioridade Invalida")

        return self.model.update_task(
            task,
            task_data.date,
            task_data.priority,
            task_data.category,
            task_data.done,
            id,
        )
    

    def delete_task(self, id):
        return self.model.delete_task(id)
