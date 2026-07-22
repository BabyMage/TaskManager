import { API_URL, getHeaders } from "./api";

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



export async function registerUser(username, email, password) 
{
    const response = await fetch(`${API_URL}/users/register`,
    {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            username,
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
    return data;
}


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


export function logout()
{
    localStorage.removeItem("token");
}


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