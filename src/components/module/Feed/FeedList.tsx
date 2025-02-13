import FeedProfile from '@/components/module/Feed/FeedProfile';
import PostItem from '@/components/module/Post/PostItem';
import styles from '@/components/module/Feed/Feed.module.css';
import FeedToolbar from '@/components/module/Feed/FeedToolbar';

export default function FeedList() {
  return (
    <div className={styles.feed_container}>
      <div>
        <FeedProfile />
        <div className={styles.feed_list}>
          <PostItem type={'list'} />
          <PostItem type={'list'} />
          <PostItem type={'list'} />
          <PostItem type={'list'} />
          <PostItem type={'list'} />
          <PostItem type={'list'} />
          <PostItem type={'list'} />
          <PostItem type={'list'} />
        </div>
      </div>
      <FeedToolbar />
    </div>
  );
}
