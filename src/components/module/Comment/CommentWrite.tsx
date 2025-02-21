import styles from '@/components/module/Comment/Comment.module.css';
import Textarea from '@/components/common/TextArea';
import Button from '@/components/common/Button';

export default function CommentWrite() {
  return (
    <div className={styles.write_container}>
      {/*<Profile user_id={user?.id} />*/}
      <div className={styles.write_content}>
        <Textarea rows={5} placeholder="댓글을 남겨주세요!" />
        <Button color={'transparent'} size={'xs'} title={'POST'}></Button>
      </div>
    </div>
  );
}
