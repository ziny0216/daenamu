import { useDispatch } from 'react-redux';
import { closeModal, openModal } from '@/lib/features/modal/modalSlice';

const confirmCallbackRef = {
  current: () => {},
};

export const useModal = () => {
  const dispatch = useDispatch();

  const openConfirmModal = ({
    modalText,
    onConfirm,
    cancelText = '취소',
    confirmText = '확인',
  }: {
    modalText: string;
    onConfirm: () => void;
    cancelText?: string;
    confirmText?: string;
  }) => {
    confirmCallbackRef.current = onConfirm;

    dispatch(
      openModal({
        modalText,
        cancelText,
        confirmText,
        isOpen: true,
      }),
    );
  };

  const closeConfirmModal = () => {
    dispatch(closeModal());
  };

  const executeConfirm = () => {
    confirmCallbackRef.current?.();
    dispatch(closeModal());
  };

  return { openConfirmModal, closeConfirmModal, executeConfirm };
};
