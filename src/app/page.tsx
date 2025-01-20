'use client';

import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { decrement, increment } from '@/lib/features/couter/couterSlice';

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);
  return (
    <div className={styles.page}>
      <button onClick={() => dispatch(increment())}>+</button>
      <div>{count}</div>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  );
}
