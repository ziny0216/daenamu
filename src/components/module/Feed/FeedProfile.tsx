import styles from '@/components/module/Feed/Feed.module.css';

export default function FeedProfile() {
  return (
    <div className={styles.feed_profile}>
      {/*<Profile user_id={user?.id} size={'lg'} />*/}
      <p className={styles.feed_introduce}>소개말 어쩌구 저쩌구 </p>
    </div>
  );
}
