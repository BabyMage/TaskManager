import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../Services/authService";

function SignUpPage ()
{
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")


    async function handleRegister() 
    {   
        const user = {
            username: username,
            email: email,
            password: senha
        }

        registerUser(user)
        navigate("/")
        
    }

    return(
        <div id="signup">
            <p>UserName</p>
            <input 
                type="text"
                name="username" 
                placeholder="nome de usuario"
                onChange={(e) => setUsername(e.target.value)}/>
            <p>Email</p>
            <input 
                type="email" 
                name="email" 
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}/>
            <p>senha</p>
            <input 
                type="text" 
                name="senha" 
                placeholder="senha"
                onChange={(e) => setSenha(e.target.value)}/>
            
            <button onClick={handleRegister}>
                Criar Conta
            </button>
        </div>
    )
}

export default SignUpPage;