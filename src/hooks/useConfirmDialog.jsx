import toast from "daisyui/components/toast";
import { useState } from "react";

const useConfirmDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [onConfirm, setOnConfirm] = useState(null);

  const openDialog = (confirmAction) => {
    setIsOpen(true);
    setOnConfirm(() => confirmAction);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      closeDialog();
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting job");
    }
  };

  return { openDialog, closeDialog, confirm: handleConfirm, isOpen };
};
export default useConfirmDialog;
