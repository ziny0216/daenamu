import styles from '@/components/module/Post/Post.module.css';

export default function PostHeader({
  type,
  postCount,
}: {
  type: 'search' | 'popular' | 'recent';
  postCount: number;
}) {
  if (type === 'recent') return;
  return (
    <>
      {type === 'search' && (
        <div className={styles.post_header}>
          <h2 className={styles.search_tot}>검색 결과 {postCount}건</h2>
        </div>
      )}
      {type === 'popular' && (
        <div className={styles.post_header}>
          <h2 className={styles.search_tot}>이 순간 가장 주목받는 게시물 🔥</h2>
        </div>
      )}
    </>
  );
}
