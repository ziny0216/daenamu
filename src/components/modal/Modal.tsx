'use client';

import { createPortal } from 'react-dom';
import { useEffect, useRef } from 'react';
import Button from '@/components/common/Button';
import CloseIcon from '@/assets/icons/icon-close.svg';
import styles from './Modal.module.css';
import { ModalPropsType } from '@/types/components/modal';

export default function Modal({
  title,
  className,
  isOpen,
  children,
  onClose,
  cancelText,
  confirmText,
  isShowHeader = true,
  onClickCancel,
  onClickConfirm,
}: ModalPropsType) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [isOpen]);

  return (
    isOpen &&
    createPortal(
      <dialog
        ref={dialogRef}
        className={`${styles.modal_wrap} ${className && styles[className]}`}
      >
        {isShowHeader && (
          <div className={styles.modal_header}>
            {title && <div className={styles.title}>{title}</div>}

            <Button
              onClick={onClose}
              color={'transparent'}
              icon={<CloseIcon />}
            />
          </div>
        )}

        <div className={`${styles.modal_body} ${isShowHeader && styles.lg}`}>
          <div className={styles.modal_inner}>{children}</div>
        </div>

        <div className={`${styles.modal_footer} btn_group full`}>
          {cancelText && (
            <Button
              size={'md'}
              color={'warn'}
              title={cancelText}
              onClick={onClickCancel}
            />
          )}
          <Button size={'md'} title={confirmText} onClick={onClickConfirm} />
        </div>
      </dialog>,
      document.getElementById('modal') as HTMLElement,
    )
  );
}
