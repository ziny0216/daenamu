import Modal from '@/components/modal/Modal';
import styles from './Modal.module.css';

export default function ConfirmModal({
  isOpen,
  cancelText = '취소',
  confirmText = '확인',
  modalText,
  onClickCancel,
  onClickConfirm,
}: {
  isOpen: boolean;
  cancelText?: string;
  confirmText?: string;
  modalText: string;
  onClickCancel?: () => void;
  onClickConfirm: () => void;
}) {
  return (
    <Modal
      onClickCancel={onClickCancel}
      onClickConfirm={() => {
        onClickCancel?.();
        onClickConfirm();
      }}
      cancelText={cancelText}
      confirmText={confirmText}
      className={'confirm_modal'}
      isShowHeader={false}
      isOpen={isOpen}
    >
      <div className={styles.confirm_box}>{modalText}</div>
    </Modal>
  );
}
