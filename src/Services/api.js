export const API_URL = "http://127.0.0.1.8000";


export function getHeaders()
{
    const token = localStorage.getItem("token")
    
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

