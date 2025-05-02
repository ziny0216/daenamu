import { ReactNode } from 'react';

export interface ModalPropsType {
  isOpen: boolean; // 모달 열기 상태값
  title?: string; // 모달 헤더 타이틀
  className?: string; // 모달 클래스 추가
  cancelText?: string; //취소 버튼 텍스트
  confirmText?: string; // 확인 버튼 텍스트
  children: ReactNode; // 모달 컴포넌트 children
  isShowHeader?: boolean; // 모달 헤더 노출 유무
  onClose?: () => void; // 모달 닫기 함수
  onClickCancel?: () => void; // 취소 버튼 함수
  onClickConfirm?: () => void; // 확인 버튼 함수
  modalText?: string; // confirm,alert text
}

export type ModalStateType = {
  isOpen: boolean; // 모달 열기 상태값
  title?: string; // 모달 헤더 타이틀
  cancelText?: string; //취소 버튼 텍스트
  confirmText?: string; // 확인 버튼 텍스트
  modalText?: string; // confirm,alert text
};
