import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tables } from '@/types/database.types';
import { persistReducer } from 'redux-persist';
import storage from '@/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['users', 'isRecovery'],
};

export interface UserState {
  users: Tables<'users'>;
  form: Partial<Tables<'users'>>;
  isRecovery: boolean;
}

const initialState: UserState = {
  users: {
    avatar_url: '',
    created_at: '',
    email: '',
    id: '',
    introduce: '',
    nickname: '',
    provider: '',
  },
  form: {
    avatar_url: '',
    email: '',
    introduce: '',
    nickname: '',
  },
  isRecovery: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Tables<'users'>>) => {
      state.users = action.payload;
    },
    setUserForm: (state, action: PayloadAction<Partial<Tables<'users'>>>) => {
      state.form = { ...state.form, ...action.payload };
    },
    setIsRecovery: (state, action) => {
      state.isRecovery = action.payload;
    },
    clearUser: state => {
      state.users = initialState.users;
    },
    clearForm: state => {
      state.form = initialState.form;
    },
  },
});

export const persistedUserReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer,
);

export const { setUser, setUserForm, setIsRecovery, clearUser, clearForm } =
  userSlice.actions;
export default persistedUserReducer;
