import styles from '@/components/module/Post/Post.module.css';
import StyledProfile from '@/components/module/Profile/Profile';
import Link from 'next/link';
import PostActionBar from '@/components/module/Post/PostActionBar';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};
export default function PostItem() {
  return (
    <div className={styles.post_container}>
      <StyledProfile user={user} />
      <p>
        (단양=연합뉴스) 윤우용 기자 = 충북도교육청은 4일 단양군과 함께 단양
        국가지질공원을 주제로 한 교재를 만들기로 했다고 밝혔다. 윤건영 교육감과
        김문근 단양군수는 이날 단양교육지원청에서 정책간담회를 갖고 이같이
        합의했다. 교재에는 2020년 국가지질공원 지정에 이어 올해 유네스코
        세계지질공원 등재를 앞둔 단양지역의 지질 특징 등을 담을 예정이다.
      </p>
      <ul>
        <li>
          <img src="https://picsum.photos/32/32" alt="이미지" />
        </li>
        <li>
          <img src="https://picsum.photos/32/32" alt="이미지" />
        </li>
        <li>
          <img src="https://picsum.photos/32/32" alt="이미지" />
        </li>
        <li>
          <img src="https://picsum.photos/32/32" alt="이미지" />
        </li>
        <li>
          <img src="https://picsum.photos/32/32" alt="이미지" />
        </li>
      </ul>
      <Link href={'/'}>더보기</Link>
      <PostActionBar />
    </div>
  );
}
