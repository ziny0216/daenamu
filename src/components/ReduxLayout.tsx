'use client';
import { Provider } from 'react-redux';
import { ReactNode } from 'react';
import { makeStore } from '@/lib/store';

export default function ReduxLayout({ children }: { children: ReactNode }) {
  const store = makeStore();
  return <Provider store={store}>{children}</Provider>;
}
