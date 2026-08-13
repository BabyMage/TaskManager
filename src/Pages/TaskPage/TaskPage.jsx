import { loadTasks, filterTasks } from "../../utils/taskHelpers";
import TableBody from "../../components/TableBody/TableBody";
import TableHead from "../../components/TableHead/TableHead";
import Controls from "../../components/Controls/Controls";
import Filters from "../../components/Filters/Filters";
import { logout, checkUser } from "../../Services/authService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./TaskPage.css"




function TaskPage (){
    const navigate = useNavigate() 
    const [username, setUsername] = useState("")
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
      async function loadUser()
      {
          const user = await checkUser();
          setUsername(user.username);
      }
      loadUser();
      fetchTasks();
    },[]);
    
    const filteredTasks = filterTasks(
      tasks,
      search,
      filterCategory,
      filterPriority,
      filterDone
    )

    function handleLogout()
    {
        const confirmLogout = window.confirm(
            "Deseja realmente sair?"
        );

        if (!confirmLogout) return;

        logout();
        navigate("/");
    }
    
    return(
    <>
      <h1>Bem-Vindo, {username} !</h1>
      <Controls 
        reloadTasks={fetchTasks}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}  />
      
      <button onClick={handleLogout}>Logout</button>
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