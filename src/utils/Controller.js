// Aqui é a controller
// Ela vai pegar os dados do JSON e enviar por App para que o App renderize na forma de uma tabela em HTLM.
// E então vai executar diferentes funções com o JSON de acordo com a interação do usuario.

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