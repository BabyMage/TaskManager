import API_URL from "./api";


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



export async function register(username, email, password) 
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