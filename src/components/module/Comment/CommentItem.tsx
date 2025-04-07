import styles from '@/components/module/Comment/Comment.module.css';
import { Tables } from '@/types/database.types';
import { PostWriter } from '@/types/components/post';
import Profile from '@/components/module/User/Profile';

export default function CommentItem({
  comment,
}: {
  comment: Tables<'comments'> & PostWriter;
}) {
  return (
    <div className={styles.comment_container}>
      <Profile profile={comment.user} is_anonymity={false} />
      <div className={styles.comment_content}>
        <p className={styles.comment}>{comment.comment}</p>
      </div>
    </div>
  );
}
