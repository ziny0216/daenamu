'use client';

import Modal from '@/components/modal/Modal';
import { ChangeEvent, useState } from 'react';
import { REPORT_REASON } from '@/constants/report';
import Input from '@/components/common/Input';
import styles from './Modal.module.css';
import DownArrowIcon from '@/assets/icons/icon-down-arrow.svg';
import { ReportReasonType } from '@/types/components/module';
import { toast } from 'react-toastify';

export default function ReportModal({
  handleConfirm,
  isReportModal,
  onClickCancel,
}: {
  onClickCancel: () => void;

  handleConfirm: (repost: ReportReasonType) => void;
  isReportModal: boolean;
}) {
  const [reportReason, setReportReason] = useState({
    reason: '',
    reason_memo: '',
  });
  const onChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setReportReason(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'reason' && value !== 'etc' ? { reason_memo: '' } : {}),
    }));
  };

  const onClickConfirm = () => {
    if (!reportReason.reason) {
      toast('신고 사유를 선택해주세요!');
      return;
    }
    if (!reportReason.reason_memo && reportReason.reason === 'ect') {
      toast('기타 사유를 입력해주세요!');
      return;
    }
    handleConfirm(reportReason);
    setReportReason({
      reason: '',
      reason_memo: '',
    });
  };
  return (
    <Modal
      onClose={onClickCancel}
      onClickCancel={onClickCancel}
      onClickConfirm={onClickConfirm}
      cancelText={'취소'}
      confirmText={'신고하기'}
      className={'report_modal'}
      isOpen={isReportModal}
      title={'신고'}
    >
      <div className={styles.select_box}>
        <select value={reportReason.reason} name={'reason'} onChange={onChange}>
          {REPORT_REASON.map(reason => (
            <option value={reason.value} key={reason.value}>
              {reason.name}
            </option>
          ))}
        </select>
        <DownArrowIcon />
      </div>

      {reportReason.reason === 'etc' && (
        <div className={styles.input_box}>
          <Input
            id={'reason_memo'}
            maxLength={50}
            placeholder={'50자 이내로 사유를 작성해주세요.'}
            name={'reason_memo'}
            type={'text'}
            color={'dark'}
            value={reportReason.reason_memo}
            inputSize={'md'}
            onChange={onChange}
          />
        </div>
      )}
    </Modal>
  );
}
