import "./Filters.css";

function Filters({
  search,
  setSearch,
  filterCategory,
  setFilterCategory,
  filterPriority,
  setFilterPriority,
  filterDone,
  setFilterDone
}) {
  return (
    <div className="filter">

      <input
        type="text"
        placeholder="Buscar tarefas"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="">Categoria</option>
        <option value="Trabalho">Trabalho</option>
        <option value="Estudos">Estudos</option>
        <option value="Pessoal">Pessoal</option>
      </select>

      <select
        value={filterPriority}
        onChange={(e) => setFilterPriority(e.target.value)}
      >
        <option value="">Prioridade</option>
        <option value="Alta">Alta</option>
        <option value="Média">Média</option>
        <option value="Baixa">Baixa</option>
      </select>

      <select
        value={filterDone}
        onChange={(e) => setFilterDone(e.target.value)}
      >
        <option value="">Status</option>
        <option value="true">Concluída</option>
        <option value="false">Pendente</option>
      </select>

    </div>
  );
}

export default Filters;