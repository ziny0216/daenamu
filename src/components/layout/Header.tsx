'use client';
import styles from '@/components/layout/Layout.module.css';
import Link from 'next/link';
import Profile from '@/components/module/Profile/Profile';
import SearchBar from '@/components/common/SearchBar';
import { useRouter } from 'next/navigation';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};

export function Header() {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/search?keyword=${'ddd'}`);
  };
  return (
    <header className={styles.default_header}>
      <div className={styles.header_inner}>
        <Link className={styles.header_title} href={'/'}>
          대나무숲
        </Link>
        <div className={styles.right_content}>
          <SearchBar onButtonClick={handleClick} />
          <Profile user={user} />
        </div>
      </div>
    </header>
  );
}
