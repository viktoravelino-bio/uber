import { Button } from '../button/Button';

import './Modal.scss';

export function Modal({
  children,
  onRequestClose = () => {},
  visible,
  showSkipButton = false,
  onSkipRequest = () => {},
}) {
  if (!visible) return null;

  return (
    <div className="modal" onClick={onRequestClose}>
      {showSkipButton && (
        <Button
          className="modal__skip-button"
          style={{ width: 'fit-content' }}
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onSkipRequest();
          }}
        >
          SKIP
        </Button>
      )}
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
