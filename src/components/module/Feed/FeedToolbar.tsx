import Link from 'next/link';
import styles from '@/components/module/Feed/Feed.module.css';

export default function FeedToolbar() {
  return (
    <div className={styles.toolbar}>
      <Link href={'/'}>나의 피드 </Link>
      <Link href={'/'}>나의 활동 </Link>
      <Link href={'/'}>프로필 수정</Link>
    </div>
  );
}
