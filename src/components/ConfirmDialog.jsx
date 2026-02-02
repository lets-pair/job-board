import { createPortal } from "react-dom";
import { FaExclamation } from "react-icons/fa";
const ConfirmDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;
  return createPortal(
    <div className="shadow-2xl py-12 w-[92%] sm:w-[80%] md:w-2/3 lg:w-1/2 xl:w-1/3 max-w-xl h-auto px-6 sm:px-10 md:px-12 lg:px-15 -translate-x-1/2 fixed top-6 sm:top-10 bg-white left-1/2 gap-3 rounded-xl flex flex-col justify-center items-center">
      <div className="bg-red-500 rounded-full p-2 w-8 h-8 flex justify-center items-center">
        <FaExclamation className="text-white" />
      </div>
      <h2 className="font-bold text-xl">Delete this job?</h2>
      <p className="text-center w-2/3">
        This file will be permanently deleted from your device and cannot be
        recovered
      </p>
      <div className="flex gap-2 items-center w-full mt-2">
        <button
          onClick={onConfirm}
          className="bg-red-500 w-1/2 py-2 rounded-xl text-white hover:bg-red-400 cursor-pointer duration-150"
        >
          Delete
        </button>
        <button
          onClick={onClose}
          className="bg-white w-1/2 border border-black rounded-xl py-2 hover:bg-gray-300 duration-150 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>,
    document.getElementById("portal-root"),
  );
};
export default ConfirmDialog;
