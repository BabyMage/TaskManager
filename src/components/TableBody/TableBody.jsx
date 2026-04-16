// Corpo da tabela de tarefas

import "./TableBody.css"

function TableBody({ tasks, setSelectedTask })
{  
    return(
        <table>
            <tbody>
                {tasks.map((task) =>(
                    <tr 
                        key = {task.id}
                        onClick={() => setSelectedTask(task)}
                        style={{cursor: "pointer"}}
                    >
                            
                        <td>{task.Task}</td>
                        <td>{task.Date}</td>
                        <td>{task.Done ? "Yes" : "No"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
)}

export default TableBody