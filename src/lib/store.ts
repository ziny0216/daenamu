import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '@/lib/features/couter/couterSlice';
import { persistedUserReducer } from '@/lib/features/user/userSlice';
import { modalSlice } from '@/lib/features/modal/modalSlice';

const rootReducer = combineReducers({
  user: persistedUserReducer,
  counter: counterSlice.reducer,
  modal: modalSlice.reducer,
});
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
