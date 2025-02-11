import styles from '@/components/module/Post/Post.module.css';
import StyledProfile from '@/components/module/Profile/Profile';
import PostActionBar from '@/components/module/Post/PostActionBar';
import PostImageList from '@/components/module/Post/PostImageList';
import Link from 'next/link';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};
export default function PostItem({ type }: { type: 'list' | 'detail' }) {
  return (
    <div className={styles.post_container}>
      <StyledProfile user={user} />
      <div className={styles.post_content}>
        <Link href={'/'} className={type === 'list' ? 'ellipse3' : ''}>
          (단양=연합뉴스) 윤우용 기자 = 충북도교육청은 4일 단양군과 함께 단양
          국가지질공원을 주제로 한 교재를 만들기로 했다고 밝혔다. 윤건영
          교육감과 김문근 단양군수는 이날 단양교육지원청에서 정책간담회를 갖고
          (단양=연합뉴스) 윤우용 기자 = 충북도교육청은 4일 단양군과 함께 단양
          국가지질공원을 주제로 한 교재를 만들기로 했다고 밝혔다. 윤건영
          교육감과 김문근 단양군수는 이날 단양교육지원청에서 정책간담회를 갖고
          (단양=연합뉴스) 윤우용 기자 = 충북도교육청은 4일 단양군과 함께 단양
          국가지질공원을 주제로 한 교재를 만들기로 했다고 밝혔다. 윤건영
          교육감과 김문근 단양군수는 이날 단양교육지원청에서 정책간담회를 갖고
        </Link>
      </div>

      <PostImageList />
      <PostActionBar />
    </div>
  );
}
