import "./ActionButtons.css"

function ActionButtons({ onAdd, onUpdate, onDelete }) {
  return (
    <div id="controls">
      <button onClick={onAdd}>Adicionar</button>
      <button onClick={onUpdate}>Atualizar</button>
      <button onClick={onDelete}>Excluir</button>
    </div>
  );
}

export default ActionButtons;