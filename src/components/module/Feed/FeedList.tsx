import FeedProfile from '@/components/module/Feed/FeedProfile';
import styles from '@/components/module/Feed/Feed.module.css';

export default function FeedList() {
  return (
    <div className={styles.feed_container}>
      <FeedProfile />
      <div className={styles.feed_list}>{/*<PostItem type={'list'} />*/}</div>
    </div>
  );
}
