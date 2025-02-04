import Profile from '@/components/module/Profile/Profile';
import PostActionBar from '@/components/module/Post/PostWriteActionBar';
import styles from '@/components/module/Post/Post.module.css';
import Textarea from '@/components/common/TextArea';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};
export default function PostWrite() {
  return (
    <div className={styles.post_container}>
      <Profile user={user} />
      <Textarea placeholder="지금 내 생각은...?"></Textarea>
      <PostActionBar />
    </div>
  );
}
