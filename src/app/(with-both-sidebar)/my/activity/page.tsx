'use client';

import React, { useEffect, useState } from 'react';
import TabList from '@/components/common/TabList';
import { DefaultObj } from '@/types/components/common';
import CommentItem from '@/components/module/Comment/CommentItem';
import browserClient from '@/utils/supabaseClient';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { Tables } from '@/types/database.types';
import { PostWithImages, PostWriter } from '@/types/components/post';
import PostItem from '@/components/module/Post/PostItem';

const tabMok: DefaultObj[] = [
  { name: '좋아요한 글', value: 'post' },
  { name: '작성한 댓글', value: 'comment' },
];

export default function Page() {
  const [tab, setTab] = useState('post');
  const [commentList, setCommentList] = useState<
    (Tables<'comments'> & PostWriter)[]
  >([]);

  const [postList, setPostList] = useState<(PostWithImages & PostWriter)[]>([]);

  const userProfile = useSelector((state: RootState) => state.user.users);
  const handTabChange = (value: string) => {
    setCommentList([]);
    setPostList([]);
    setTab(value);
  };

  // 작성한 댓글
  const fetchMyComments = async () => {
    if (!userProfile) return;
    const { data, error } = await browserClient
      .from('comments')
      .select('*')
      .eq('user_id', userProfile.id);

    if (error) {
      console.log('나의 댓글 가져오기 실패:', error);
    }

    if (!data) return;

    setCommentList(prev => [
      ...data.map(comment => ({
        ...comment,
        user: userProfile
          ? {
              user_id: userProfile.id,
              nickname: userProfile.nickname,
              avatar_url: userProfile.avatar_url,
            }
          : null,
      })),
      ...prev,
    ]);
  };

  // 좋아요한글
  const fetchMyLikePost = async () => {
    const { data, error } = await browserClient.rpc(
      'get_liked_posts_with_user',
      {
        uid: userProfile.id,
      },
    );

    if (error) {
      console.log('좋아요한 글 가져오기 실패:', error);
    }

    if (data) {
      setPostList(data as (PostWithImages & PostWriter)[]);
    }
  };

  useEffect(() => {
    const fetchMyActivity = async () => {
      if (tab === 'post') {
        await fetchMyLikePost();
      } else {
        await fetchMyComments();
      }
    };
    fetchMyActivity();
  }, [tab]);

  return (
    <div className="inner flex-col">
      <TabList tabList={tabMok} onChange={handTabChange} />
      <div>
        {tab === 'post'
          ? postList.map(post => (
              <PostItem
                key={post.id}
                type={'list'}
                post={post}
                viewerId={userProfile?.id}
              />
            ))
          : commentList.map(cmt => <CommentItem key={cmt.id} comment={cmt} />)}
      </div>
    </div>
  );
}
