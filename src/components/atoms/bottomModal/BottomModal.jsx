import { useEffect, useRef } from 'react';
import { CloseIcon } from '../../../assets/icons';
import './BottomModal.scss';

export function BottomModal({ title, children, onClose, visible = false }) {
  const ref = useRef(null);

  useEffect(() => {
    if (visible) {
      ref.current.style.display = 'flex';
      ref.current.setAttribute('data-open', true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [visible]);

  useEffect(() => {
    const isOpen = ref.current.getAttribute('data-open');
    if (!visible && isOpen) {
      ref.current.setAttribute('data-closing', true);
      ref.current.removeAttribute('data-open');
    }
  }, [visible]);

  return (
    <div
      ref={ref}
      className="bottom-modal"
      onClick={onClose}
      onAnimationEnd={(e) => {
        if (e.animationName === 'fade-out') {
          e.target.removeAttribute('data-closing');
          ref.current.style.display = 'none';
        }
      }}
    >
      <div
        className="bottom-modal__content-wrapper"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          <CloseIcon />
        </button>
        <header className="header">
          <h2>{title}</h2>
        </header>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}
