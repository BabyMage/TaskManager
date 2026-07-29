import { getTasks } from "../Services/taskService"


// Ordem de prioridade das tarefas
const PRIORITY_ORDER = {
    Alta: 1,
    Média: 2,
    Baixa: 3
};

// Buscar tarefas do back e ordena-las
export async function loadTasks() 
{
    const data = await getTasks();

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

    return data;
};

// Filtrar tarefas com base nos controles do usuario
export function filterTasks(
    tasks,
    search,
    filterCategory,
    filterPriority,
    filterDone
)
{
    return tasks.filter((task) => {

        const matchSearch =
            task.Task.toLowerCase()
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
}

// Função de valiadção do usuario adicionada em taskHelpers
export async function validateUser(
    navigate,
    checkUser,
    logout
)
{
    const token = localStorage.getItem("token");

    if (!token)
    {
        navigate("/");
        return;
    }

    try
    {
        await checkUser();
        navigate("/tasks");
    }
    catch(error)
    {
        logout();
        navigate("/");
    }
}