import { API_URL, getHeaders } from "./api";

// Função de buscar tarefas 👇👇
export async function getTasks() 
{
    const headers = getHeaders();
    const response = await fetch(`${API_URL}/tasks`,
    {
        method: "GET",
        headers
    })

    if (!response.ok)
    {   
        const error = await response.json()
        throw new Error(error.detail)
    }

    return await response.json();
    
}
// Função pra criar tarefas 👇👇
export async function createTask(task)
{
    const headers = getHeaders();
    const response = await fetch(`${API_URL}/tasks`,
    {
        method: "POST",
        headers,
        body: JSON.stringify(task)
    })

    if (!response.ok)
    {   
        const error = await response.json()
        throw new Error(error.detail)
    }

    return await response.json();
    
}
// Função para alterar tarefas 👇👇
export async function updateTask(id, task) 
{
    const headers = getHeaders();
    const response = await fetch(`${API_URL}/tasks/${id}`,
    {
        method: "PUT",
        headers,
        body: JSON.stringify(task)
    })

    if (!response.ok)
    {   
        const error = await response.json()
        throw new Error(error.detail)
    }

    return await response.json();
    
}
// Função para excluir tarefas 👇👇
export async function deleteTask(id) 
{
    const headers = getHeaders();
    const response = await fetch(`${API_URL}/tasks/${id}`,
    {
        method: "DELETE",
        headers
    })

    if (!response.ok)
    {   
        const error = await response.json()
        throw new Error(error.detail)
    }

    return await response.json();
}