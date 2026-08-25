
function ActionButtons({ onAdd, onUpdate, onDelete }) {
  return (
    <div className="task-actions">
      <button className="btn" onClick={onAdd}>➕ Adicionar</button>
      <button className="btn" onClick={onUpdate}>⚙️ Alterar</button>
      <button className="btn" onClick={onDelete}>❌ Excluir</button>
    </div>
  );
}

export default ActionButtons;