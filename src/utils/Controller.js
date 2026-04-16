
//👇 Função para mostrar tarefas (sempre roda)
export async function getTask()
{
    try 
    {
        const response = await fetch("http://127.0.0.1:8000/tasks");

        if(!response.ok)
        {
            throw new Error("Erro ao buscar tarefas");
        }

        const data = await response.json();
        return data.list;
    } 
    catch (error)
    {
        console.log(error);
        return [];
    }
    
}

//👇 Função de adicionar tarefas. 
// Roda quando botão "adicionar tafefas" é clicado

export async function addTask(task) {

    try{
        const response = await fetch("http://127.0.0.1:8000/add_task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });
        const data = await response.json()
        return data
    
    } 
    catch (error) {
        console.error("Erro ao adicionar tarefa: ", error)
    }
}

//👇 Função para alterar tarefas
// Roda quando "Alterar Terefa" é clicado e usa os dados dos inputs.

export async function updateTask(id, task)
{
    try{
        const response = await fetch(`http://127.0.0.1:8000/update_task/${id}`,
        {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(task),
        });
        return await response.json();   
    }catch (error){
        console.log("Erro ao atualizar tarefa", error)
    }
}

//👇 Função deletar tarefa. Roda quando botão "deletar tarefa" é clicado

export async function deleteTask(id)
{
    try
    {
        const response = await fetch(`http://127.0.0.1:8000/delete_task/${id}`, 
        {
            method: "DELETE"
        });
        return await response.json()
    }catch (error){
        console.log("Erro ao deletar tarefa", error)
    }
}