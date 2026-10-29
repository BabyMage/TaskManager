import { createTask } from "../../Services/taskService";
import { useState } from "react";

function TaskForm({ fetchTasks, onCancel }){

  const [task, setTask] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  async function handleAddTask()
  {
    setError("")
    if (!task.trim())
    {
      setError("A tarefa não pode ser vazia")
      return;
    };

    if (!priority) {
      setError("A prioridade é obrigatória");
      return;
    }

    const newTask = {
        task: task,
        date: date,
        category: category,
        priority: priority,
        done: false //done sempre vem como false.
    };

    try {
        await createTask(newTask);
        await fetchTasks();

        setTask("");
        setDate("");
        setCategory("");
        setPriority("");
    } catch (error) {
        console.error("Erro ao criar tarefa:", error);
        setError("Não foi possível adicionar a tarefa.");
    }
  }
  return (
    <div className="task-form">

      <input
        
        type="text"
        placeholder="Descrição da Tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
  
      <input
        placeholder="data"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Categoria</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Estudos">Estudos</option>
        <option value="Pessoal">Pessoal</option>
      </select>

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="">Prioridade</option>
        <option value="Baixa">Baixa</option>
        <option value="Média">Média</option>
        <option value="Alta">Alta</option>
      </select>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button className="btn" onClick={() => handleAddTask()}>
        Salvar
      </button>

      <button className="btn" onClick={onCancel}>
        Cancelar
      </button>

    </div>
  );
}

export default TaskForm;