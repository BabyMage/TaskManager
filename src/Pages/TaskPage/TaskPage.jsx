import TableBody from "../../components/TableBody/TableBody";
import TableHead from "../../components/TableHead/TableHead";
import Controls from "../../components/Controls/Controls";
import Filters from "../../components/Filters/Filters";
import SideBar from "../../components/SideBar/SideBar";
import { loadTasks, filterTasks } from "../../utils/taskHelpers";
import { logout, checkUser } from "../../Services/authService";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function TaskPage (){
    const navigate = useNavigate() 

    const [isSidebarOpen, setIsSideBarOpen] = useState(false);
    const [user, setUser] = useState(null)
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

    function openSideBar()
    {
      setIsSideBarOpen(true);
    }
    function closeSidebar()
    {
      setIsSideBarOpen(false);
    }
    
    useEffect(() => {
      async function loadUser()
      {
          const data = await checkUser();
          setUser(data);
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
      <button className="btn" onClick={openSideBar}>☰</button>
      <h1>Bem-Vindo, {user?.username}!</h1>

      <SideBar
        isOpen={isSidebarOpen}
        onClose={closeSidebar}
        user={user}
      />
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