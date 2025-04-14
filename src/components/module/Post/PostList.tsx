'use client';
import PostItem from '@/components/module/Post/PostItem';
import PostWrite from '@/components/module/Post/PostWrite';
import PostHeader from '@/components/module/Post/PostHeader';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { usePostList } from '@/hooks/post/usePostList';

export default function PostList({ keyword }: { keyword?: string }) {
  const pathName = usePathname();
  const sortType = pathName.includes('/hot') ? 'popular' : 'recent';
  const userProfile = useSelector((state: RootState) => state.user.users);
  const { postList, submitPost, postCnt } = usePostList(
    userProfile,
    sortType,
    keyword,
  );

  return (
    <>
      {!keyword && <PostWrite onSubmit={submitPost} />}
      <PostHeader postCount={postCnt} type={keyword ? 'search' : sortType} />
      {postList.map(post => (
        <PostItem
          key={post.id}
          type={'list'}
          post={post}
          viewerId={userProfile.id}
        />
      ))}
    </>
  );
}
