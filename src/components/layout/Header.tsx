import styles from '@/components/layout/Layout.module.scss';
import Link from 'next/link';
import StyledProfile from '@/components/module/Profile/Profile';

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
          <div>
            <input type="search" placeholder="검색어 입력" />
            <button type="button">검색어</button>
          </div>
          <StyledProfile user={user} />
        </div>
      </div>
    </header>
  );
}
