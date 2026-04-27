// Corpo da tabela de tarefas



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
                        
                    <td>{task.Task}</td>
                    <td>{task.Date}</td>
                    <td>
                        <span className={`tag ${task.Category}`}>
                            {task.Category}
                        </span>
                    </td>
                    <td>
                        <span className={`priority ${task.Priority}`}>
                            {task.Priority}
                        </span>
                    </td>
                    <td style={{ color: task.Done ? "green" : "red" }}>
                        {task.Done ? "✅Concluído" : "⏳Pendente"}
                    </td>

                </tr>
            ))}
        </tbody>      
)}

export default TableBody