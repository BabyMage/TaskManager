export function getTaskStatus(dateString)
{
    if(!dateString) return { label: "Sem Data", color: "gray" };

    const [year, month, day] = dateString.split("-");
    const taskDate = new Date(year, month - 1, day);

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    taskDate.setHours(0, 0, 0, 0);

    const diffTime = taskDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if(diffDays < 0)
    {
        return {
            label: "Atrasada",
            color: "red"
        }
    }

    if(diffDays === 0)
    {
        return {
            label: "Vence Hoje!",
            color: "orange"
        }
    }

    if(diffDays <= 3)
    {
        return {
            label: `Vence em ${diffDays} dias`,
            color: "gold"
        }
    }

    return {
        label:`Vence em ${diffDays} dias`,
        color: "green"
    }
};