import { PostData, PostWithImages, PostWriter } from '@/types/components/post';
import { FileData } from '@/types/components/common';
import { uploadPost } from '@/utils/file/uploadPostImages';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import browserClient from '@/utils/supabaseClient';
import { Tables } from '@/types/database.types';

export const usePostList = (
  userProfile: Tables<'users'>,
  sortType: 'popular' | 'recent',
  keyword?: string,
) => {
  const [postList, setPostList] = useState<(PostWithImages & PostWriter)[]>([]);
  const [postCnt, setPostCnt] = useState(0);

  // 게시글 작성
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

  // 기본 게시물 리스트
  useEffect(() => {
    if (!userProfile?.id || keyword) return;
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

  // 검색어 게시물 리스트
  useEffect(() => {
    if (!keyword) return;
    const fetchSearchPosts = async () => {
      const { data, count, error } = await browserClient
        .from('posts')
        .select('*', { count: 'exact' })
        .textSearch('content', keyword);

      if (error) {
        console.error('포스트 가져오기 에러:', error);
        return;
      }

      setPostList(data as (PostWithImages & PostWriter)[]);
      setPostCnt(count ?? 0);
    };
    fetchSearchPosts();
  }, [keyword]);

  return { postList, submitPost, postCnt };
};
