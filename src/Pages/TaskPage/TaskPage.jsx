import TableHead from "../../components/Header/TableHead";
import TableBody from "../../components/TableBody/TableBody";
import Controls from "../../components/Controls/Controls";
import Filters from "../../components/Filters/Filters";
import { useState, useEffect } from "react";
import { loadTasks, filterTasks } from "./taskUtils";


function TaskPage (){
    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    const [search, setSearch] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [filterPriority, setFilterPriority] = useState("");
    const [filterDone, setFilterDone] = useState("");

    async function fetchTasks()
    {
      const data = await loadTasks();
      setTasks(data);
    }
    
    
    useEffect(() => {
      fetchTasks;
    },[]);
    
    
    const filteredTasks = filterTasks(
      tasks,
      search,
      filterCategory,
      filterPriority,
      filterDone
    )
    
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

export default TaskPage;