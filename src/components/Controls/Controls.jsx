import TaskForm from "../TaskForm/TaskForm";
import ActionButtons from "../ActionButtons/ActionButtons";
import { useTaskForm } from "../../utils/UseTaskForms";
import { createTask, updateTask, deleteTask } from "../../Services/taskService";

function Controls({ reloadTasks, selectedTask, setSelectedTask })
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

    async function handleUpdate()
    {
        if (!selectedTask) return;
        
        const updatedTask = {
            task: form.task,
            date: form.date,
            category: form.category,
            priority: form.priority,
            done: form.done
        };
        await updateTask(selectedTask.id, updatedTask);
        reloadTasks();
        setSelectedTask(null);
        form.resetForm();
    };

    async function handleDelete() 
    {
        if(!selectedTask) return;

        await deleteTask(selectedTask.id);
        reloadTasks();
        setSelectedTask(null);
        form.resetForm();
    };

    return(
        <>
            <ActionButtons
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                onDelete={handleDelete} 
            />

            <TaskForm {...form}/>
        </>
    );
};

export default Controls;