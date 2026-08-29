// Corpo da tabela de tarefas


import { getTaskStatus } from "../../utils/DateManager"

function TableBody({ tasks, setSelectedTask })
{  
    return(
        <tbody>
            {tasks.map((task) => {

                const status = getTaskStatus(task.date);

                return (
                    <tr 
                        key={task.id}
                        onClick={() => setSelectedTask(task)}
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
                        
                        <td className={task.done ? "task-done" : "task-pending"}>
                            {task.done ? "✅ Concluído" : "⏳ Pendente"}
                        </td>

                        <td>
                            <span className={`date-status ${status.color}`}>
                                {status.label}
                            </span>
                        </td>

                    </tr>
                )
            })}
        </tbody>      
    )
}

export default TableBody;