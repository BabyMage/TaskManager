import { useState } from "react";
import { getTaskStatus, formatDate } from "../../utils/DateManager";
import { TiPencil, TiTrash } from "react-icons/ti";
import { ImCancelCircle } from "react-icons/im"
import { IoCheckmarkSharp } from "react-icons/io5"
import { TfiThumbUp } from "react-icons/tfi";
import { deleteTask, updateTask } from "../../Services/taskService";

function TableBody({ tasks, fetchTasks }) {
    
    const [editingID, setEditingID] = useState(null);
    const [editTask, setEditTask] = useState("");
    const [editDate, setEditDate] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editPriority, setEditPriority] = useState("");

    async function handleDeleteTask(taskId) {
        const confirmDelete = window.confirm(
            "Deseja excluir essa tarefa?"
        );

        if (!confirmDelete) return;

        try {
            await deleteTask(taskId);
            await fetchTasks();
        } catch (error) {
            console.error("Erro ao excluir tarefa:", error);
            window.alert("Não foi possível excluir a tarefa.");
        }
    }

    function handleStartEditing(task) {
    setEditingID(task.id);
    setEditTask(task.task);
    setEditDate(task.date);
    setEditCategory(task.category);
    setEditPriority(task.priority);}

    async function handleUpdateTask(task)
    {
        const updatedTask = {
            task: editTask,
            date: editDate,
            category : editCategory,
            priority: editPriority,
            done: task.done,
        }
        try {
        await updateTask(task.id, updatedTask);
        await fetchTasks();
        setEditingID(null);
    } catch (error) {
        console.error("Erro ao atualizar tarefa:", error);
        window.alert("Não foi possível atualizar a tarefa.");
    }
    }

    async function handleComplete(task) {
        const updatedTask = {
            task: task.task,
            date: task.date,
            category : task.category,
            priority: task.priority,
            done: true,
        }
        try {
        await updateTask(task.id, updatedTask);
        await fetchTasks();
        setEditingID(null);
    } catch (error) {
        console.error("Erro ao completar tarefa:", error);
        window.alert("Não foi completar a tarefa.");
    }   
    }

    return (
        <tbody>
            {tasks.map((task) => {
                const status = getTaskStatus(task);
                const isEditing = editingID === task.id;

                return (
                    <tr key={task.id}>
                        <td>
                            {isEditing?(
                                <input
                                    type="text"
                                    value={editTask}
                                    onChange={(e) => setEditTask(e.target.value)}
                                />
                            ) : (
                                task.task
                            )}
                        </td>

                        <td>
                            {isEditing ? (
                                <input
                                    value={editDate}
                                    placeholder="data"
                                    type="date"
                                    onChange={(e) => setEditDate(e.target.value)}
                                />
                            ) : (
                                formatDate(task.date)
                            )}
                        </td>

                        <td>
                            {isEditing ? (
                                <select
                                    value={editCategory}
                                    onChange={(e) => setEditCategory(e.target.value)}
                                >
                                    <option value="">Categoria</option>
                                    <option value="Trabalho">Trabalho</option>
                                    <option value="Estudos">Estudos</option>
                                    <option value="Pessoal">Pessoal</option>
                                </select>
                            ):(
                                <span className={`tag ${task.category}`}>
                                {task.category}
                            </span>
                            )}
                        </td>

                        <td>
                            {isEditing ?(
                                <select
                                    value={editPriority}
                                    onChange={(e) => setEdit(e.target.value)}
                                >
                                    <option value="">Prioridade</option>
                                    <option value="Baixa">Baixa</option>
                                    <option value="Média">Média</option>
                                    <option value="Alta">Alta</option>
                                </select>
                            ):(
                                <span className={`priority ${task.priority}`}>
                                {task.priority}
                            </span>
                            )}
                        </td>

                        <td>
                            <span className={`date-status ${status.color}`}>
                                {status.label}
                            </span>
                        </td>

                        <td>
                            {isEditing ? 
                            (
                                <span className="task-actions">
                                <button
                                    type="button"
                                    className="task_btn"
                                    title="Salvar"
                                    onClick={() => handleUpdateTask(task)}
                                >
                                    <IoCheckmarkSharp size={25} color="#000000" />
                                </button>

                                <button
                                    type="button"
                                    className="task_btn"
                                    onClick={() => setEditingID(null)}
                                    title="Cancelar"
                                >
                                    <ImCancelCircle size={20} color="#000000" />
                                </button>
                            </span>
                            ):(
                                <span className="task-actions">
                                <button
                                    type="button"
                                    className="task_btn"
                                    onClick={() => handleStartEditing(task)}
                                    title="Editar tarefa"
                                >
                                    <TiPencil size={25} color="#000000" />
                                </button>

                                <button
                                    type="button"
                                    className="task_btn"
                                    onClick={() => handleDeleteTask(task.id)}
                                    title="Excluir tarefa"
                                >
                                    <TiTrash size={25} color="#000000" />
                                </button>
                                <button 
                                    className="task_btn"
                                    title="Marcar como Concluida"
                                    onClick={() => handleComplete(task)}
                                    >
                                    <TfiThumbUp size={20} color="#000000" />
                                </button>
                            </span>
                            )}
                        </td>
                    </tr>
                );
            })}
        </tbody>
    );
}

export default TableBody;