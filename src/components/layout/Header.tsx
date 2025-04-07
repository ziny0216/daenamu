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

  const isRecovery = useSelector((state: RootState) => state.user.isRecovery);

  return (
    <header className={styles.default_header}>
      <div className={styles.header_inner}>
        <Link className={styles.header_title} href={'/home'}>
          대나무숲
        </Link>
        {!isRecovery && (
          <div className={styles.right_content}>
            <SearchBar />
            {profile ? (
              <Profile is_anonymity={false} profile={profile} />
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
        )}
      </div>
    </header>
  );
}
