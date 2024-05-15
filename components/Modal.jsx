import { useThemes } from "~/context/themesContext";

const Modal = ({ isOpen, onClose, children }) => {
  const { themeMode } = useThemes();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none">
      <div
        className="fixed inset-0 transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      >
        <div
          className={`absolute inset-0 ${
            themeMode === "dark" ? "bg-white-primary" : " bg-black-secondary"
          } opacity-50`}
        ></div>
      </div>
      <div className="relative z-50 bg-primary text-typography rounded-lg shadow-lg max-w-full mx-auto p-4">
        {children}
      </div>
    </div>
  );
};

export default Modal;
