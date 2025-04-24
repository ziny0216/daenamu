'use client';

import { useModal } from '@/hooks/common/useModal';
import Modal from '@/components/modal/Modal';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import styles from './Modal.module.css';

export default function ConfirmModal() {
  const { isOpen, cancelText, confirmText, modalText } = useSelector(
    (state: RootState) => state.modal,
  );
  const { closeConfirmModal, executeConfirm } = useModal();

  return (
    <Modal
      onClickCancel={closeConfirmModal}
      onClickConfirm={executeConfirm}
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
