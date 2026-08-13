import { API_URL, getHeaders } from "./api"


// Função de login 👇👇
export async function login(email, password)
{
    const response = await fetch(`${API_URL}/users/login`,
    {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            email,
            password
        })
    })

    if (!response.ok)
    {
        const error = await response.json()
        throw new Error(error.detail)
    }
    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    return data;
}

// Funçãp de registro de Usuario 👇👇
export async function registerUser(user) 
{
    const response = await fetch(`${API_URL}/users/register`,
    {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(user)
    })

    if (!response.ok)
    {   
        const error = await response.json()
        throw new Error(error.detail)
    }

    const data = await response.json();
    return data;
}


// Funcçao para atualizar usuario 👇👇
export async function updateUser(username, email, password)
{
    const headers = getHeaders()

    const response = await fetch(`${API_URL}/users/me`,
    {
        method:"PUT",
        headers,
        body: JSON.stringify({
            username,
            email,
            password
        })
    })
    if (!response.ok)
    {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json();
}

// Função de excluir usuario 👇👇
export async function deleteUser()
{
    const headers = getHeaders()

    const response = await fetch(`${API_URL}/users/me`,
    {
        method:"DELETE",
        headers
    });

    if (!response.ok)
    {
        const error = await response.json();
        throw new Error(error.detail);
    }

    return await response.json()
}

// Função de logout 👇👇
export function logout()
{
    localStorage.removeItem("token");
}

// Função para checar se usuario está logado 👇👇
export async function checkUser()
{
    const headers = getHeaders()

    const response = await fetch(`${API_URL}/users/me`,
    {
        method:"GET",
        headers
    });

    if (!response.ok)
    {
        const error = await response.json();
        throw new Error(error.detail);
    }

    const data = await response.json();
    return data;
}