import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tables } from '@/types/database.types';

export interface UserState {
  token: string;
  users: Tables<'users'>;
}

const initialState: UserState = {
  token: '',
  users: {
    avatar_url: '',
    created_at: '',
    email: '',
    id: '',
    introduce: '',
    nickname: '',
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<Pick<UserState, 'token'>>) => {
      state.token = action.payload.token;
    },
    setUser: (state, action: PayloadAction<Pick<UserState, 'users'>>) => {
      state.users = action.payload.users;
    },

    clearUser: () => initialState,
  },
});
export const { setUser, setUserToken, clearUser } = userSlice.actions;
export default userSlice.reducer;
