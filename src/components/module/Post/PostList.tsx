'use client';
import PostItem from '@/components/module/Post/PostItem';
import PostWrite from '@/components/module/Post/PostWrite';
import styles from '@/components/module/Post/Post.module.css';
import { uploadPost } from '@/utils/file/uploadPostImages';
import { toast } from 'react-toastify';
import { Tables } from '@/types/database.types';
import { FileData } from '@/types/components/common';
import { useEffect, useState } from 'react';
import { PostWithImages } from '@/types/components/post';

export default function PostList({ keyword }: { keyword?: string }) {
  const [postList, setPostList] = useState<PostWithImages[]>([]);
  const submitPost = async (
    params: Omit<Tables<'posts'>, 'created_at' | 'id'> & { files: FileData[] },
  ) => {
    try {
      const { post, images } = await uploadPost(params);
      setPostList(prev => [{ ...post, images }, ...prev]);
      toast('게시물이 등록되었습니다.');
    } catch (e) {
      console.error(e);
      toast('게시물 등록에 실패 했습니다');
    }
  };
  useEffect(() => {
    console.log(postList, 'postListpostList');
  }, [postList]);
  return (
    <>
      {!keyword && <PostWrite onSubmit={submitPost} />}
      {keyword && (
        <div className={styles.post_header}>
          <h2 className={styles.search_tot}>검색 결과 5건</h2>
        </div>
      )}
      {postList.map(post => (
        <PostItem key={post.id} type={'list'} post={post} />
      ))}
    </>
  );
}
