import "./TaskForm.css"

function TaskForm({
  task,
  setTask,
  date,
  setDate,
  category,
  setCategory,
  priority,
  setPriority,
  done,
  setDone,
  error
}) {
  return (
    <div id="adicionarTarefa">

      <input
        type="text"
        placeholder="Descrição da Tarefa"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <p>Data</p>
      <input
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

      <label>
        Concluída?
        <input
          type="checkbox"
          checked={done}
          onChange={(e) => setDone(e.target.checked)}
        />
      </label>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default TaskForm;