import styles from '@/components/layout/Layout.module.css';
import Link from 'next/link';
import Profile from '@/components/module/Profile/Profile';
import Input from '@/components/common/Input';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};

export function Header() {
  return (
    <header className={styles.default_header}>
      <div className={styles.header_inner}>
        <Link className={styles.header_title} href={'/'}>
          대나무숲
        </Link>
        <div className={styles.right_content}>
          <Input placeholder="검색어 입력" />

          <Profile user={user} />
        </div>
      </div>
    </header>
  );
}
