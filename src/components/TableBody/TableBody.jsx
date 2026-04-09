// Corpo da tabela de tarefas

import "./TableBody.css"

function TableBody({ tasks = [] })
{  
    return(
        <table>
            <tbody>
                {tasks.map((task, index) =>(
                    <tr key = {index}>
                        <td>{task.Task}</td>
                        <td>{task.Date}</td>
                        <td>{task.Done ? "Yes" : "No"}</td>
                    </tr>
                ))}
            </tbody>
        </table>
)}

export default TableBody