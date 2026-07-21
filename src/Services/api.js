const API_URL = "http://127.0.0.1.8000";


export async function getHeaders()
{
    const token = localStorage.getItem("token")
    
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}
export default API_URL;