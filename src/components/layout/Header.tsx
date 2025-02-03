import styles from '@/components/layout/Layout.module.scss';
import Link from 'next/link';

export function Header() {
  return (
    <header className={styles.default_header}>
      <div className={styles.header_inner}>
        <Link className={styles.header_title} href={'/'}>
          대나무숲
        </Link>
        <div>
          <input type="search" placeholder="검색어 입력" />
          <button type="button">검색어</button>
        </div>
      </div>
    </header>
  );
}
