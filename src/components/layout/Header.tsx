'use client';

import styles from '@/components/layout/Layout.module.css';
import Link from 'next/link';
import Profile from '@/components/module/User/Profile';
import SearchBar from '@/components/common/SearchBar';
import useProfileInfo from '@/hooks/user/useProfileInfo';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export function Header() {
  const { profile } = useProfileInfo();
  const user = useSelector((state: RootState) => state.user.users);
  console.log(user.nickname, 'user');
  return (
    <header className={styles.default_header}>
      <div className={styles.header_inner}>
        <Link className={styles.header_title} href={'/'}>
          대나무숲
        </Link>
        <div className={styles.right_content}>
          <SearchBar />
          {profile ? (
            <Profile profile={profile} />
          ) : (
            <Link href={'/auth/login'}>로그인</Link>
          )}
        </div>
      </div>
    </header>
  );
}
