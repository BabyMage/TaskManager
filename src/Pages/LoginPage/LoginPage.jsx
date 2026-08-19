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
        <div id="login">
            <h1>Garenciador de Tarefas</h1>
            <p>email</p>
            <input
                type="email"
                value={email}
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <p>senha</p>
            <input
                placeholder="senha"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button className="btn" onClick={handleLogin}>
                Login
            </button>
            <button className="btn" onClick={goToRegister}>
                Cadastro
            </button>
            <p>{error}</p>
        </div>
    );
}

export default LoginPage;