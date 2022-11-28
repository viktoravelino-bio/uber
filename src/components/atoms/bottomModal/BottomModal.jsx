import { useEffect } from 'react';
import { CloseIcon } from '../../../assets/icons';
import './BottomModal.scss';

export function BottomModal({ children, onClose = () => {}, visible = false }) {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible]);
  return (
    <div className="bottom-modal" data-visible={visible} onClick={onClose}>
      <div
        className="bottom-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose}>
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
