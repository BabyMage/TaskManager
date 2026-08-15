import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, deleteUser } from "../../Services/authService"
import "./SideBar.css"

function SideBar({ user, isOpen, onClose })
{

    const navigate = useNavigate()
    const [editing, setEditing] = useState(false);

    const [username, setUsername] = useState(
        user?.username || ""
    );

    const [email, setEmail] = useState(
        user?.email || ""
    );

    const [password, setPassword] = useState("");

    async function handleUpdate()
    {
        const updatedUsername = username || user.username;
        const updatedEmail = email || user.email;

        await updateUser(
            updatedUsername,
            updatedEmail,
            password
        );

        alert("Dados atualizados com sucesso! Por favor recarregue a pagina");
        setEditing(false);
    }

    function startEditing()
    {
        setUsername(user.username);
        setEmail(user.email);
        setPassword("");
        setEditing(true);
    }

    function handleDelete()
    {
        const confirmDelete = window.confirm("Deseja excluir sua conta?")
        if(!confirmDelete) return;

        const sureDelete = window.confirm("Esta ação é permanente. Tem certeza?")
        if(!sureDelete) return;

        deleteUser(user.id)
        localStorage.removeItem("token")
        navigate("/")
    }

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>

            {editing ? (
                <>
                    <h2>Editar Perfil</h2>
                    <input
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                        placeholder="nome de usuario"
                    />

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="email"
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        placeholder="senha"
                    />

                    <button onClick={handleUpdate}>
                        Salvar
                    </button>

                    <button
                        onClick={() => setEditing(false)}
                    >
                        Cancelar
                    </button>
                </>
            ) : (
                <>
                    <h2>Meu Perfil</h2>
                    <p>Nome: {user?.username}</p>
                    <p>Email: {user?.email}</p>

                    <button
                        onClick={() => startEditing()}
                    >
                        Editar Perfil
                    </button>
                </>
            )}

            <button onClick={() => handleDelete()}>Excuir Conta</button>

            <button onClick={onClose}>
                X
            </button>
        </div>
    );
}

export default SideBar;