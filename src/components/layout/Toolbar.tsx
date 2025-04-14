'use client';
import Link from 'next/link';
import styles from '@/components/layout/Layout.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function Toolbar() {
  const userProfile = useSelector((state: RootState) => state.user.users);
  return (
    <div className={styles.toolbar}>
      <Link href={`/feed/${userProfile.id}`}>나의 피드 </Link>
      <Link href={'/my/activity'}>나의 활동 </Link>
      <Link href={'/my/edit'}>프로필 수정</Link>
    </div>
  );
}
