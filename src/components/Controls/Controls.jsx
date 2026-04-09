import { useState } from "react";
import { addTask } from "../../utils/Controller";

function Controls({ reloadTasks })
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


    return(
        <>
            <div id="controls">
                <button onClick={handleAddTask}>Adicionar Tarefa</button>
                <button>Alterar Tarefa</button>
                <button>Excluir Tarefa</button>
            </div>

            <div id="adicionarTarefa">
                <input 
                    type="text"
                    placeholder="Digite a tarefa"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />

                <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
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