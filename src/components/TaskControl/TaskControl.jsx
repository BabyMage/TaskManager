import TaskForm from "../TaskForm/TaskForm";
// import ActionButtons from "../ActionButtons/ActionButtons";
import { useTaskForm } from "../../utils/UseTaskForms";
import { createTask } from "../../Services/taskService";

function TaskControl({ reloadTasks, selectedTask, setSelectedTask })
{
    const form = useTaskForm(selectedTask);

    // 
    async function handleAdd()
    {
        if (!form.task.trim())
        {
            form.setError("A tarefa não pode ser vazia")
            return;
        };

        if (!form.priority) {
            form.setError("A prioridade é obrigatória");
            return;
        }

        const newTask = {
            task: form.task,
            date: form.date,
            category: form.category,
            priority: form.priority,
            done: form.done
        };

        await createTask(newTask);
        reloadTasks();
        setSelectedTask(null);
        form.resetForm();
    }




    return(
        <section className="task-form">
            <TaskForm {...form}/>
            <button className="btn" onClick={() => handleAdd()}>
                Salvar
            </button>
            <button>
                Cancelar
            </button>
        </section>
    );
};

export default TaskControl;