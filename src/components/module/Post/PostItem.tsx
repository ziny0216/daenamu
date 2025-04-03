import styles from '@/components/module/Post/Post.module.css';
import PostActionBar from '@/components/module/Post/PostActionBar';
import PostImageList from '@/components/module/Post/PostImageList';
import Link from 'next/link';
import { PostWithImages } from '@/types/components/post';

export default function PostItem({
  type,
  post,
}: {
  type: 'list' | 'detaill';
  post: PostWithImages;
}) {
  return (
    <div className={styles.post_container}>
      {/*<StyledProfile user={user} />*/}
      <div className={styles.post_content}>
        <Link href={'/'} className={type === 'list' ? 'ellipse3' : ''}>
          {post.content}
        </Link>
      </div>
      {post.images && <PostImageList files={post.images} listType={'list'} />}

      <PostActionBar />
    </div>
  );
}
