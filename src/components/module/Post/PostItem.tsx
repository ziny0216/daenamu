import styles from '@/components/module/Post/Post.module.css';
import PostActionBar from '@/components/module/Post/PostActionBar';
import PostImageList from '@/components/module/Post/PostImageList';
import Link from 'next/link';
import { PostWithImages, PostWriter } from '@/types/components/post';
import Profile from '@/components/module/User/Profile';

export default function PostItem({
  type,
  post,
  viewerId,
}: {
  type: 'list' | 'detail';
  post: PostWithImages & PostWriter;
  viewerId?: string;
}) {
  return (
    <div className={styles.post_container}>
      <Profile is_anonymity={post.is_anonymity} profile={post.user} />
      <div className={styles.post_content}>
        <Link
          href={`/post/${post.id}`}
          className={type === 'list' ? 'ellipse3' : ''}
        >
          {post.content}
        </Link>
      </div>
      {post.images && <PostImageList files={post.images} listType={'list'} />}

      <PostActionBar post={post} userId={viewerId} />
    </div>
  );
}
