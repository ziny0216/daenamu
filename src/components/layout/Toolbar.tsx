import Link from 'next/link';
import styles from '@/components/layout/Layout.module.css';

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <Link href={'/feed/1'}>나의 피드 </Link>
      <Link href={'/my/activity'}>나의 활동 </Link>
      <Link href={'/my/edit'}>프로필 수정</Link>
    </div>
  );
}
