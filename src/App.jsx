import { useState, useEffect } from "react";
import TableHead from "./components/Header/TableHead";
import TableBody from "./components/TableBody/TableBody";
import Controls from "./components/Controls/Controls";
import { getTask } from "./utils/Controller";


function App() {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null)

  async function loadTasks() {
    const data = await getTask();
    const priorityOrder = {
      Alta: 1,
      Media: 2,
      Baixa: 3
    }
    data.sort((a, b) => {
      return priorityOrder[a.p]
    })
  }

  useEffect(() => {
    loadTasks();
  },[]);

  return(
    <>
      <h1>Gerenciador de Tarefas</h1>
      <Controls 
        reloadTasks={loadTasks}
        selectedTask={selectedTask}  />
      <table>
        <TableHead />
        <TableBody 
          tasks={tasks}
          setSelectedTask={setSelectedTask}  />
      </table>
      
      
    </>
  );
};

export default App;