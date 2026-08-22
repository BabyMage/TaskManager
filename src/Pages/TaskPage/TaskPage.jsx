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

    // Tasks
    async function fetchTasks(){
        const data = await loadTasks();
        setTasks(data);
    }

    // Sidebar
    function openSideBar(){
        setIsSideBarOpen(true);
    }

    function closeSidebar(){
        setIsSideBarOpen(false);
    }

    // Carregar usuário e tarefas
    useEffect(() => {
        async function loadUser(){
            const data = await checkUser();
            setUser(data);
        }

        loadUser();
        fetchTasks();
    }, []);

    // Filtrar tarefas
    const filteredTasks = filterTasks(
        tasks,
        search,
        filterCategory,
        filterPriority,
        filterDone
    );

    // Logout
    function handleLogout(){
        const confirmLogout = window.confirm(
            "Deseja realmente sair?"
        );

        if (!confirmLogout) return;

        logout();
        navigate("/");
    }

    return(
        <div className="app-layout">

            {/* =========================================
                SIDEBAR
            ========================================= */}

            <SideBar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                user={user}
            />


            {/* =========================================
                CONTEÚDO PRINCIPAL
            ========================================= */}

            <main className="main-content">

                {/* ---------- TOPBAR ---------- */}

                <header className="topbar">

                    <div className="logo">
                        ✓ Task Manager
                    </div>

                    <button
                        className="menu-button"
                        onClick={openSideBar}
                    >
                        ☰
                    </button>

                </header>


                {/* ---------- CONTEÚDO ---------- */}

                <div className="task-content">

                    {/* ---------- CABEÇALHO ---------- */}

                    <section className="task-header">

                        <div>
                            <h1>
                                Bem-Vindo, {user?.username}!
                            </h1>

                            <p>
                                Gerencie suas atividades com facilidade e foco
                            </p>
                        </div>

                    </section>


                    {/* ---------- FORMULÁRIO ---------- */}

                    <Controls
                        reloadTasks={fetchTasks}
                        selectedTask={selectedTask}
                        setSelectedTask={setSelectedTask}
                    />


                    {/* ---------- FILTROS ---------- */}

                    <section className="filters-section">

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

                    </section>


                    {/* ---------- RESULTADOS ---------- */}

                    <div className="task-results">

                        <p>
                            <span>●</span>{" "}
                            {filteredTasks.length} tarefas encontradas
                        </p>

                    </div>


                    {/* ---------- TABELA ---------- */}

                    <div className="task-table-wrapper">

                        <table className="task-table">

                            <TableHead />

                            <TableBody
                                tasks={filteredTasks}
                                setSelectedTask={setSelectedTask}
                            />

                        </table>

                    </div>

                </div>

            </main>

        </div>
    )
}

export default TaskPage;
