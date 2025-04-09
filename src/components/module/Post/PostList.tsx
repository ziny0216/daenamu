'use client';
import PostItem from '@/components/module/Post/PostItem';
import PostWrite from '@/components/module/Post/PostWrite';
import { uploadPost } from '@/utils/file/uploadPostImages';
import { toast } from 'react-toastify';
import { FileData } from '@/types/components/common';
import { useEffect, useState } from 'react';
import { PostData, PostWithImages, PostWriter } from '@/types/components/post';
import browserClient from '@/utils/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { usePathname } from 'next/navigation';
import PostHeader from '@/components/module/Post/PostHeader';

export default function PostList({ keyword }: { keyword?: string }) {
  const pathName = usePathname();
  const sortType = pathName.includes('/hot') ? 'popular' : 'recent';

  const [postList, setPostList] = useState<(PostWithImages & PostWriter)[]>([]);
  const userProfile = useSelector((state: RootState) => state.user.users);

  const submitPost = async (
    params: PostData & {
      files: FileData[];
    },
  ) => {
    try {
      const { post, images } = await uploadPost(params);
      setPostList(prev => [
        {
          ...post,
          images,
          is_like: false,
          user: userProfile
            ? {
                user_id: userProfile.id,
                nickname: userProfile.nickname,
                avatar_url: userProfile.avatar_url,
              }
            : null,
        },
        ...prev,
      ]);
      toast('게시물이 등록되었습니다.');
    } catch (e) {
      console.error(e);
      toast('게시물 등록에 실패 했습니다.');
    }
  };

  useEffect(() => {
    if (!userProfile?.id) return;
    const fetchPosts = async () => {
      const { data, error } = await browserClient.rpc(
        'get_posts_with_images_and_user',
        {
          uid: userProfile.id,
          sort: sortType,
        },
      );

      if (error) {
        console.error('포스트 가져오기 에러:', error);
        return;
      }

      setPostList(data as (PostWithImages & PostWriter)[]);
    };

    fetchPosts();
  }, [userProfile?.id]);

  return (
    <>
      {!keyword && <PostWrite onSubmit={submitPost} />}
      <PostHeader type={keyword ? 'search' : sortType} />
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
