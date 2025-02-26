'use client';

import styles from '@/components/layout/Layout.module.css';
import Link from 'next/link';
import Profile from '@/components/module/User/Profile';
import SearchBar from '@/components/common/SearchBar';
import useProfileInfo from '@/hooks/user/useProfileInfo';

export function Header() {
  const { profile } = useProfileInfo();

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
            <div className="line_group">
              <Link className="line_item" href={'/auth/login'}>
                로그인
              </Link>
              <Link className="line_item" href={'/auth/join'}>
                회원가입
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
