import { useState, useEffect } from "react";
import { addTask, updateTask, deleteTask } from "../../utils/Controller";
import "./Controls.css"

function Controls({ reloadTasks, selectedTask, setSelectedTask })
{

    const [task, setTask] = useState("");
    const [date, setDate] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
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

        if(!category)
        {
            setError("A categoria é obrigatória")
            return;
        }

        setError("")

        const newTask = {
            Task: task,
            Date: date,
            Category: category,
            Priority: priority,
            Done: done
        }

        try{
            await addTask(newTask)
            reloadTasks()
            setSelectedTask(null)
        }
        catch (err){
            setError("Erro! algo deu errado")
        }

        setTask("");
        setDate("");
        setDone(false);
        setCategory("");
        setPriority("");
    }

    useEffect(() => {
        if(selectedTask){
            setTask(selectedTask.Task)
            setDate(selectedTask.Date)
            setDone(selectedTask.Done)
            setCategory(selectedTask.Category)
            setPriority(selectedTask.Priority || "Media") // fallback
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
            Category: category,
            Priority: priority,
            Done: done
        }

        await updateTask(selectedTask.id, updatedTask)
        reloadTasks()
        setSelectedTask(null)

        setTask("")
        setDate("")
        setDone(false)
        setCategory("");
        setPriority("");

    }

    async function handleDeleteTask()
    {
        if(!selectedTask){
            setError("Selecione uma tarefa antes")
            return;
        }
        await deleteTask(selectedTask.id)

        setSelectedTask(null)
        reloadTasks()

        setTask("")
        setDate("")
        setDone(false)
        setCategory("");
        setPriority("");
    }

    return(
        <>
            <div id="controls">
                <button onClick={handleAddTask}>Adicionar Tarefa</button>
                <button onClick={handleUpdateTask}>Alterar Tarefa</button>
                <button onClick={handleDeleteTask}>Excluir Tarefa</button>
            </div>

            <div id="adicionarTarefa">
                <input 
                    type="text"
                    placeholder="Descrição da Tarefa"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <p>Data</p>
                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                
                <select 
                    id="dropdown"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Estudos">Estudos</option>
                    <option value="Pessoal">Pessoal</option>
                </select>


                <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="">Prioridade</option>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                </select>

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