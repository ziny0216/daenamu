import React from 'react';
import Button from '@/components/common/Button';
import styles from '@/components/common/EventToast.module.css';

export default function EventToast({
  onClickToast,
  text,
}: {
  onClickToast: () => void;
  text: string;
}) {
  return (
    <div className={styles.event_toast}>
      <span className={styles.event_toast_txt}>{text}</span>
      <Button
        className={styles.event_toast_btn}
        color={'decoration'}
        title={'확인'}
        onClick={onClickToast}
      />
    </div>
  );
}
