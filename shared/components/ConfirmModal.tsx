import "@/shared/styles/ModalStyle.css";

type ConfirmModalProps = {
  visible: boolean;
  itemName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmModal({
  visible,
  itemName,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!visible) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <p>
          Deseja realmente excluir este item: <strong>{itemName}</strong>?
        </p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>
            Cancelar
          </button>
          <button className="btn-confirm" onClick={onConfirm}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
