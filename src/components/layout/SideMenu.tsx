import styles from '@/components/layout/Layout.module.scss';
import Link from 'next/link';
import StyledProfile from '@/components/module/Profile/Profile';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};

export function SideMenu() {
  return (
    <aside className={styles.default_aside}>
      <div className={styles.default_inner}>
        <StyledProfile user={user} />
        <menu className={styles.side_menu}>
          <li>
            <Link href={'/'}>내가 쓴 글</Link>
          </li>
          <li>
            <Link href={'/'}>내 활동</Link>
          </li>
          <li>
            <Link href={'/'}>프로필 수정</Link>
          </li>
          <li>
            <Link href={'/'}>로그아웃</Link>
          </li>
        </menu>
      </div>
    </aside>
  );
}
