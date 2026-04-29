import { useState, useEffect } from "react";
import TableHead from "./components/Header/TableHead";
import TableBody from "./components/TableBody/TableBody";
import Controls from "./components/Controls/Controls";
import { getTasks } from "./utils/Controller";
import Filters from "./components/Filters/Filters";

function App() {

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDone, setFilterDone] = useState("");

  async function loadTasks() 
  {
    const data = await getTasks();

    const PRIORITY_ORDER = 
    {
      Alta: 1,
      Média: 2,
      Baixa: 3
    };

    data.sort(
    (a, b) => 
    {
      const priorityCompare =
        PRIORITY_ORDER[a.Priority] - PRIORITY_ORDER[b.Priority];

      if (priorityCompare !== 0) 
      {
        return priorityCompare;
      }

      return new Date(a.Date) - new Date(b.Date);
    });

    setTasks(data);
  }



  useEffect(() => {
    loadTasks();
  },[]);


const filteredTasks = tasks.filter((task) => {
  const matchSearch = task.Task
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory =
    filterCategory === "" ||
    task.Category === filterCategory;

  const matchPriority =
    filterPriority === "" ||
    task.Priority === filterPriority;

  const matchDone =
    filterDone === "" ||
    String(task.Done) === filterDone;

  return (
    matchSearch &&
    matchCategory &&
    matchPriority &&
    matchDone
  );
});


  return(
    <>
      <h1>Gerenciador de Tarefas</h1>
      <Controls 
        reloadTasks={loadTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}  />
      
      <Filters
        search={search}
        setSearch={setSearch}

        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}

        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}

        filterDone={filterDone}
        setFilterDone={setFilterDone}
      />
      <p>{filteredTasks.length} tarefas encontradas</p>
      <table>
        <TableHead />
        <TableBody 
          tasks={filteredTasks}
          setSelectedTask={setSelectedTask}  />
      </table>
    </>
  );
}

export default App;