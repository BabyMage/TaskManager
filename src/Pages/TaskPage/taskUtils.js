import { getTasks } from "../../Services/taskService"

const PRIORITY_ORDER = {
    Alta: 1,
    Média: 2,
    Baixa: 3
};


export async function loadTasks() 
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
};


export function filterTasks(
    tasks,
    search,
    filterCategory,
    filterPriority,
    filterDone
)
{
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
}