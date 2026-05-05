import { addTask, updateTask, deleteTask } from "../../utils/Controller";
import TaskForm from "../TaskForm/TaskForm";
import ActionButtons from "../ActionButtons/ActionButtons";
import { useTaskForm } from "../../utils/UseTaskForms";

function Controls({ reloadTasks, selectedTask, setSelectedTask })
{
    const form = useTaskForm(selectedTask);

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
            Task: form.task,
            Date: form.date,
            Category: form.category,
            Priority: form.priority,
            Done: form.done
        };

        await addTask(newTask);
        reloadTasks();
        setSelectedTask(null);
        form.resetForm();
    }

    async function handleUpdate()
    {
        if (!selectedTask) return;
        
        const updatedTask = {
            Task: form.task,
            Date: form.date,
            Category: form.category,
            Priority: form.priority,
            Done: form.done
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