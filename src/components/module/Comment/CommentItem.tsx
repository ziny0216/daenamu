import styles from '@/components/module/Comment/Comment.module.css';

export default function CommentItem() {
  return (
    <div className={styles.comment_container}>
      {/*<Profile user_id={user?.id} />*/}
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
