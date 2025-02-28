import { useEffect, useCallback } from 'react';
import { useThemes } from '~/context/themesContext';

const Modal = ({ isOpen, onClose, children }) => {
  const { themeMode } = useThemes();

  // Close modal on "Escape" key press
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  // Attach event listener for Escape key when modal is open
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Prevent rendering if modal is closed
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Overlay Background */}
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      >
        <div
          className={`absolute inset-0 ${
            themeMode === 'dark' ? 'bg-white-primary' : 'bg-black-secondary'
          } opacity-50`}
        ></div>
      </div>

      {/* Modal Content */}
      <div className="relative z-50 mx-4 w-full max-w-lg rounded-lg bg-primary p-4 text-typography shadow-lg transition-all duration-300 ease-in-out">
        {children}
      </div>
    </div>
  );
};

export default Modal;
