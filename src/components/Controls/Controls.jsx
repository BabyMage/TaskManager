import { useState, useEffect } from "react";
import { addTask, updateTask, deleteTask } from "../../utils/Controller";

function Controls({ reloadTasks, selectedTask })
{

    const [task, setTask] = useState("");
    const [date, setDate] = useState("");
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");


    async function handleAddTask() {

        if(!task.trim()){
            setError("A tarefa não pode ser vazia");
            return;
        }

        if(!date){
            setError("A data é obrigatoria")
            return;
        }

        setError("")

        const newTask = {
            Task: task,
            Date: date,
            Done: done
        }

        try{
            await addTask(newTask)
            reloadTasks()
        }
        catch (err){
            setError("Erro! algo deu errado")
        }

        setTask("")
        setDate("")
        setDone(false)
    }

    useEffect(() => {
        if(selectedTask){
            setTask(selectedTask.Task)
            setDate(selectedTask.Date)
            setDone(selectedTask.Done)
        }
    }, [selectedTask])

    async function handleUpdateTask() 
    {
        if(!selectedTask)
        {
            setError("Selecine um tarefa antes.")
            return;
        }

        const updatedTask = {
            Task: task,
            Date: date,
            Done: done
        }

        await updateTask(selectedTask.id, updatedTask)
        reloadTasks()
    }

    async function handleDeleteTask()
    {
        if(!selectedTask)
        {
            setError("Selecione uma tarefa antes")
            return;
        }
        await deleteTask(selectedTask.id)
        reloadTasks()

        setTask("")
        setDate("")
        setDone(false)
    }

    return(
        <>
            <div id="controls">
                <button onClick={handleAddTask}>Adicionar Tarefa</button>
                <button onClick={handleUpdateTask}>Alterar Tarefa</button>
                <button onClick={handleDeleteTask}>Excluir Tarefa</button>
            </div>

            <div id="adicionarTarefa">
                <p>Desciçao</p>
                <input 
                    type="text"
                    placeholder="Digite a tarefa"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <p>Data</p>
                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <p>Cuncluida?</p>
                <input 
                    type="checkbox"
                    checked = {done}
                    onChange={(e) => setDone(e.target.checked)}
                />

                {error && <p style={{color: "red"}} id="error">{error}</p>}
            </div>
        </>

    )
}

export default Controls;