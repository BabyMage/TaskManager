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
        <div className="auth-page">
            <div className="register-screen">
            <h1>Criar Conta</h1>
            
            <div className="username-field">
                <p>Nome de Usuario</p>
                <input 
                    type="text"
                    name="username" 
                    onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="email-field">
            <p>Email</p>
            <input 
                type="email" 
                name="email" 
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="password-field">
                <p>Senha</p>
                <input 
                    type="text" 
                    name="senha" 
                    onChange={(e) => setSenha(e.target.value)}/>
            </div>
            <div className="menu-buttons">
                <button
                    className="btn" 
                    onClick={handleRegister}>
                    Criar Conta
                </button>
                <button 
                    onClick={() => navigate("/")}
                    className="btn">
                    Cancelar
                </button>
            </div>
        </div>
        </div>
    )
}

export default SignUpPage;