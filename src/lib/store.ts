import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '@/lib/features/couter/couterSlice';
import { userSlice } from '@/lib/features/user/userSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterSlice.reducer,
      user: userSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
