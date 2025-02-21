import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tables } from '@/types/database.types';

export interface UserState {
  users: Tables<'users'>;
  form: Partial<Tables<'users'>>;
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
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.users = action.payload.users;
    },
    setUserForm: (state, action: PayloadAction<Partial<Tables<'users'>>>) => {
      state.form = { ...state.form, ...action.payload };
    },

    clearUser: state => {
      state.users = initialState.users;
    },
    clearForm: state => {
      state.form = initialState.form;
    },
  },
});
export const { setUser, setUserForm, clearUser, clearForm } = userSlice.actions;
export default userSlice.reducer;
