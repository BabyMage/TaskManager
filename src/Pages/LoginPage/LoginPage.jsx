import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../Services/authService";

function LoginPage()
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleLogin()
    {
        try
        {
            await login(email, password);
            navigate("/tasks");
        }
        catch(error)
        {
            setError(error.message);
        }
    }

    async function goToRegister()
    {
        navigate("/register")
    }

    return(
        <div className="auth-page">
            <div className="login-screen">
            <h1 className="login-title">Gerenciador de Tarefas</h1>
            <div className="email-field">
                <p>Email</p>
                <input
                    type="email"
                    value={email}
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
            <div className="passowrd-field"> 
                <p>Senha</p>
                <input
                    placeholder="senha"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
            </div>

            <div className="menu-buttons">
                <button className="btn" onClick={handleLogin}>
                    Login
                </button>
                <button className="btn" onClick={goToRegister}>
                    Cadastro
                </button>
                <p>{error}</p>
            </div>
            </div>
        </div>
    );
}

export default LoginPage;