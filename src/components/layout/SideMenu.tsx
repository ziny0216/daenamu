import styles from '@/components/layout/Layout.module.css';
import Link from 'next/link';

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
      </div>
    </aside>
  );
}
