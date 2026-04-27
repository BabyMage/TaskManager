import { useState, useEffect } from "react";
import TableHead from "./components/Header/TableHead";
import TableBody from "./components/TableBody/TableBody";
import Controls from "./components/Controls/Controls";
import { getTask as getTasks } from "./utils/Controller";


function App() {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null)

  async function loadTasks() {
    const data = await getTasks();

    const PRIORITY_ORDER = {
      Alta: 1,
      Média: 2,
      Baixa: 3
    };

    data.sort((a, b) => {
      const priorityCompare =
        PRIORITY_ORDER[a.Priority] - PRIORITY_ORDER[b.Priority];

      if (priorityCompare !== 0) {
        return priorityCompare;
      }

      return new Date(a.Date) - new Date(b.Date);
    });

    setTasks(data);
}



  useEffect(() => {
    loadTasks();
  },[]);

  return(
    <>
      <h1>Gerenciador de Tarefas</h1>
      <Controls 
        reloadTasks={loadTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}  />
      <table>
        <TableHead />
        <TableBody 
          tasks={tasks}
          setSelectedTask={setSelectedTask}  />
      </table>
    </>
  );
}

export default App;