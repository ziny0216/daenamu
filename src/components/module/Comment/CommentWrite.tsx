import Profile from '@/components/module/Profile/Profile';
import styles from '@/components/module/Comment/Comment.module.css';
import Textarea from '@/components/common/TextArea';
import Button from '@/components/common/Button';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};
export default function CommentWrite() {
  return (
    <div className={styles.write_container}>
      <Profile user={user} />
      <div className={styles.write_content}>
        <Textarea rows={5} placeholder="댓글을 남겨주세요!" />
        <Button color={'transparent'} size={'xs'} title={'POST'}></Button>
      </div>
    </div>
  );
}
