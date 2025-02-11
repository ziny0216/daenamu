import Profile from '@/components/module/Profile/Profile';
import styles from '@/components/module/Comment/Comment.module.css';

const user = {
  profile_img: 'https://picsum.photos/32/32',
  nickname: '조여진',
  is_anonymity: true,
};
export default function CommentItem() {
  return (
    <div className={styles.comment_container}>
      <Profile user={user} />
      <div className={styles.comment_content}>
        <p className={styles.comment}>
          진짜 너무 이쁜듯하네요!!진짜 너무 이쁜듯하네요!!진짜 너무
          이쁜듯하네요!!진짜 너무 이쁜듯하네요!!진짜 너무 이쁜듯하네요!!진짜
          너무 이쁜듯하네요!!진짜 너무 이쁜듯하네요!!진짜 너무
          이쁜듯하네요!!진짜 너무 이쁜듯하네요!!
        </p>
      </div>
    </div>
  );
}
