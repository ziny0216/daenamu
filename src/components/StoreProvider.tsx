'use client';

import { Provider } from 'react-redux';
import { ReactNode, useRef } from 'react';
import { AppStore, makeStore, persistor } from '@/lib/store';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
