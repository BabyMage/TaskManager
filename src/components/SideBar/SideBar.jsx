import { useState } from "react";
import "./SideBar.css"

function SideBar({ user, isOpen, onClose })
{
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
        await updateUser(
            username,
            email,
            password
        );

        alert("Dados atualizados!");
    }

    return (
        <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <h2>Meu Perfil</h2>

            {editing ? (
                <>
                    <input
                        value={username}
                        onChange={(e) =>
                            setUsername(e.target.value)
                        }
                    />

                    <input
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                    />

                    <input
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
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
                    <p>Nome: {user?.username}</p>
                    <p>Email: {user?.email}</p>

                    <button
                        onClick={() => setEditing(true)}
                    >
                        Editar Perfil
                    </button>
                </>
            )}

            <button onClick={onClose}>
                X
            </button>
        </div>
    );
}

export default SideBar