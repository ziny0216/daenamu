import { ModalStateType } from '@/types/components/modal';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ModalStateType = {
  isOpen: false,
  cancelText: '취소',
  confirmText: '확인',
  modalText: '',
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ModalStateType>) => {
      return { ...state, ...action.payload, isOpen: true };
    },
    closeModal: () => {
      return { ...initialState };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
