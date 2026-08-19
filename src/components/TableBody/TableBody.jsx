// Corpo da tabela de tarefas


import { getTaskStatus } from "../../utils/DateManager"

function TableBody({ tasks, setSelectedTask })
{  
    return(
        <tbody>
            {tasks.map((task) =>(
                <tr 
                    key = {task.id}
                    onClick={() => setSelectedTask(task)}
                    style={{cursor: "pointer"}}
                >
                        
                    <td>{task.task}</td>
                    <td>{task.date}</td>
                    
                    <td>
                        <span className={`tag ${task.category}`}>
                            {task.category}
                        </span>
                    </td>
                    
                    <td>
                        <span className={`priority ${task.priority}`}>
                            {task.priority}
                        </span>
                    </td>
                    
                    <td style={{ color: task.done ? "green" : "red" }}>
                        {task.done ? "✅Concluído" : "⏳Pendente"}
                    </td>

                    <td>
                        <span
                        style={{
                            fontSize: "12px",
                            background: getTaskStatus(task.date).color}}
        
                        className={`date-status ${status.color}`}>
                            {getTaskStatus(task.date).label}
                        </span>
                    </td>
                </tr>
            ))}
        </tbody>      
)}

export default TableBody;