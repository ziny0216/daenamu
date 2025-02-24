import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from '@/lib/features/couter/couterSlice';
import { persistedUserReducer } from '@/lib/features/user/userSlice';
import { persistStore } from 'redux-persist';

const rootReducer = combineReducers({
  user: persistedUserReducer,
  counter: counterSlice.reducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};

export const persistor = persistStore(makeStore());
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
