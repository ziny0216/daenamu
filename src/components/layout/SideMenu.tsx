'use client';

import styles from '@/components/layout/Layout.module.css';
import Link from 'next/link';
import { toast } from 'react-toastify';
import browserClient from '@/utils/supabaseClient';
import { useDispatch } from 'react-redux';
import { clearUser } from '@/lib/features/user/userSlice';
import LoadingButton from '@/components/common/LoadingButton';
import { useRouter } from 'next/navigation';

export function SideMenu() {
  const dispatch = useDispatch();
  const router = useRouter();
  const logout = async () => {
    const { error } = await browserClient.auth.signOut();
    if (error) {
      toast(error.message);
    } else {
      dispatch(clearUser());
      router.push('/auth/login');
      toast('로그아웃 되었습니다!');
    }
  };
  return (
    <aside className={styles.default_aside}>
      <div className={styles.default_inner}>
        <menu className={styles.side_menu}>
          <li>
            <Link href={'/'}>🏠 HOME</Link>
          </li>
          <li>
            <Link href={'/home/hot'}>🔥 HOT</Link>
          </li>
        </menu>
        <LoadingButton
          borderradius={'lg'}
          size={'md'}
          color={'default'}
          title={'로그아웃'}
          onClick={logout}
        />
      </div>
    </aside>
  );
}
