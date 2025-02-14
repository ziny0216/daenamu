import Profile from '@/components/module/User/Profile';
import styles from '@/components/module/Feed/Feed.module.css';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
};

export default function FeedProfile() {
  return (
    <div className={styles.feed_profile}>
      <Profile user={user} size={'lg'} />
      <p className={styles.feed_introduce}>소개말 어쩌구 저쩌구 </p>
    </div>
  );
}
