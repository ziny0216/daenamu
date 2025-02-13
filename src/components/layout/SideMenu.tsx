import styles from '@/components/layout/Layout.module.css';
import Link from 'next/link';
import Button from '@/components/common/Button';

export function SideMenu() {
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
        <Button
          borderradius={'lg'}
          size={'md'}
          color={'default'}
          title={'로그아웃'}
        ></Button>
      </div>
    </aside>
  );
}
