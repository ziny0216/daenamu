'use client';
import PostItem from '@/components/module/Post/PostItem';
import PostWrite from '@/components/module/Post/PostWrite';
import styles from '@/components/module/Post/Post.module.css';
import { uploadPost } from '@/utils/file/uploadPostImages';
import { toast } from 'react-toastify';
import { FileData } from '@/types/components/common';
import { useEffect, useState } from 'react';
import { PostData, PostWithImages, PostWriter } from '@/types/components/post';
import browserClient from '@/utils/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

export default function PostList({ keyword }: { keyword?: string }) {
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
    const fetchPosts = async () => {
      const { data, error } = await browserClient.rpc(
        'get_posts_with_images_and_user',
        {
          uid: userProfile.id,
        },
      );

      if (error) {
        console.error('포스트 가져오기 에러:', error);
        return;
      }

      setPostList(data as (PostWithImages & PostWriter)[]);
    };

    fetchPosts();
  }, []);

  return (
    <>
      {!keyword && <PostWrite onSubmit={submitPost} />}
      {keyword && (
        <div className={styles.post_header}>
          <h2 className={styles.search_tot}>검색 결과 5건</h2>
        </div>
      )}
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
