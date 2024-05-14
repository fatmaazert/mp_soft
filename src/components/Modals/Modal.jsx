const Modal = ({ show, close, children, title = "Modal" }) => {
  return show ? (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-75 w-screen h-screen"
      onClick={close}
    >
      <div
        className="w-3/4 p-5 bg-slate-300 rounded-lg relative"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="flex justify-between items-center px-2">
          <h2 className="text-xl text-primary font-semibold mb-4">{title}</h2>
          <button
            className="text-xl font-semibold text-primary"
            onClick={close}
          >
            X
          </button>
        </div>
        <div className="pb-10">{children}</div>
      </div>
    </div>
  ) : null;
};

export default Modal;
