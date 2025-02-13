import PostItem from '@/components/module/Post/PostItem';
import PostWrite from '@/components/module/Post/PostWrite';
import styles from '@/components/module/Post/Post.module.css';

export default function PostList({
  keyword,
  isFeedPage = false,
}: {
  keyword?: string;
  isFeedPage?: boolean;
}) {
  return (
    <>
      {!isFeedPage && <PostWrite />}
      {keyword && (
        <div className={styles.post_header}>
          <h2 className={styles.search_tot}>검색 결과 5건</h2>
        </div>
      )}
      <PostItem type={'list'} />
    </>
  );
}
