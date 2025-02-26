import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tables } from '@/types/database.types';

import { persistReducer } from 'redux-persist';
import storage from '@/lib/storage';

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['users'],
};

export interface UserState {
  users: Tables<'users'>;
  form: Partial<Tables<'users'>>;
  profileFile: File | null;
}

const initialState: UserState = {
  users: {
    avatar_url: '',
    created_at: '',
    email: '',
    id: '',
    introduce: '',
    nickname: '',
  },
  form: {
    avatar_url: '',
    email: '',
    introduce: '',
    nickname: '',
  },
  profileFile: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Tables<'users'>>) => {
      state.users = action.payload;
    },
    setProfileFile: (state, action: PayloadAction<File>) => {
      state.profileFile = action.payload;
    },
    setUserForm: (state, action: PayloadAction<Partial<Tables<'users'>>>) => {
      state.form = { ...state.form, ...action.payload };
    },

    clearUser: state => {
      state.users = initialState.users;
      state.profileFile = initialState.profileFile;
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

export const { setUser, setUserForm, setProfileFile, clearUser, clearForm } =
  userSlice.actions;
export default persistedUserReducer;
