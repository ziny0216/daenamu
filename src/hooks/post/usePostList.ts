import { PostData, PostWithImages, PostWriter } from '@/types/components/post';
import { FileData } from '@/types/components/common';
import { updatePost, uploadPost } from '@/utils/file/uploadPostImages';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import browserClient from '@/utils/supabaseClient';
import { Tables } from '@/types/database.types';

export const usePostList = ({
  userProfile,
  sortType,
  only_mine,
  target_user_id,
  keyword,
}: {
  userProfile: Tables<'users'>;
  sortType: 'popular' | 'recent';
  only_mine: boolean;
  target_user_id?: string;
  keyword?: string;
}) => {
  const [postList, setPostList] = useState<(PostWithImages & PostWriter)[]>([]);
  const [postCnt, setPostCnt] = useState(0);

  const submitEditPost = async (
    params: PostData & {
      files: FileData[];
      deleteIds?: number[];
      id?: string;
    },
  ) => {
    const { post, images } = await updatePost(params);
    console.log(images);
    setPostList(prev =>
      prev.map(item => {
        return item.id === params.id
          ? {
              ...item,
              ...post,
              images,
            }
          : item;
      }),
    );
    toast('게시물이 수정되었습니다.');
  };
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
    if (!userProfile?.id) return;
    const fetchPosts = async () => {
      const { data, error } = await browserClient.rpc(
        'get_posts_with_images_and_user',
        {
          uid: userProfile.id,
          sort: sortType,
          only_mine,
          target_user_id,
          keyword,
        },
      );
      if (error) {
        console.error('포스트 가져오기 에러:', error);
        return;
      }

      setPostList(data as (PostWithImages & PostWriter)[]);
    };

    fetchPosts();
  }, [keyword, only_mine, sortType, target_user_id, userProfile.id]);

  // 검색 게시물 개수
  useEffect(() => {
    if (!keyword) return;
    const fetchSearchPostCnt = async () => {
      const { count, error } = await browserClient
        .from('posts')
        .select('id', { count: 'exact', head: true })
        .ilike('content', `%${keyword}%`);

      if (error) {
        console.error('검색된 포스트 가져오기 에러:', error);
        return;
      }
      setPostCnt(count ?? 0);
    };
    fetchSearchPostCnt();
  }, [keyword]);

  //게시물 삭제
  const deletePost = async (postId: string) => {
    const { error } = await browserClient
      .from('posts')
      .delete()
      .eq('id', postId);
    if (error) {
      toast(error.message);
    } else {
      toast('삭제되었습니다!');
      setPostList(prev => prev.filter(post => post.id !== postId));
    }
  };
  return { postList, submitPost, postCnt, deletePost, submitEditPost };
};
