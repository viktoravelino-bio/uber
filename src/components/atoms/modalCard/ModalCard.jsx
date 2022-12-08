import './ModalCard.scss';

export function ModalCard({ children, visible, onRequestClose, title }) {
  return (
    <>
      {visible && (
        <div className="modal-card">
          <div className="modal-card__backdrop" onClick={onRequestClose} />

          <div className="modal-card__content">
            <button
              className="modal-card__content__close-button"
              onClick={onRequestClose}
            >
              &times;
            </button>

            <div className="modal-card__content__body">
              <div className="modal-card__content__body__header">
                <h4>{title}</h4>
              </div>

              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
