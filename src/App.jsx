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
        selectedTask={selectedTask}  />
      <TableHead />
      <TableBody 
        tasks={tasks}
        setSelectedTask={setSelectedTask}  />
    </>
  );
};

export default App;