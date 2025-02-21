import styles from '@/components/layout/Layout.module.css';
import Link from 'next/link';
import Profile from '@/components/module/User/Profile';
import SearchBar from '@/components/common/SearchBar';
import { createClient } from '@/utils/supabaseServer';

export async function Header() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log(user);

  return (
    <header className={styles.default_header}>
      <div className={styles.header_inner}>
        <Link className={styles.header_title} href={'/'}>
          대나무숲
        </Link>
        <div className={styles.right_content}>
          <SearchBar />
          <Profile user_id={user?.id} />
        </div>
      </div>
    </header>
  );
}
