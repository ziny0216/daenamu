'use client';
import PostItem from '@/components/module/Post/PostItem';
import PostWrite from '@/components/module/Post/PostWrite';
import PostHeader from '@/components/module/Post/PostHeader';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { usePostList } from '@/hooks/post/usePostList';
import { useTooltip } from '@/components/common/Tooltip';
import React, { useEffect, useState } from 'react';
import { PostWithImages, PostWriter } from '@/types/components/post';
import { useModal } from '@/hooks/common/useModal';

export default function PostList({ keyword }: { keyword?: string }) {
  const pathName = usePathname();
  const sortType = pathName.includes('/hot') ? 'popular' : 'recent';
  const userProfile = useSelector((state: RootState) => state.user.users);
  const { postList, submitPost, postCnt, deletePost } = usePostList({
    userProfile,
    sortType,
    only_mine: false,
    keyword: keyword,
  });
  const [postId, setPostId] = useState('');
  const { setTooltipState, tooltipState, selectedItem } = useTooltip();
  const { openConfirmModal } = useModal();

  const handlePostMore = (
    e: React.MouseEvent<HTMLButtonElement>,
    post: PostWithImages & PostWriter,
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + window.scrollX - 154,
      y: rect.bottom + window.scrollY + 12,
    };
    setPostId(post.id);
    let defaultList = [{ name: '신고하기', value: 'report' }];
    defaultList =
      userProfile.id === post.user?.user_id
        ? [
            { name: '삭제하기', value: 'delete' },
            {
              name: '수정하기',
              value: 'edit',
            },
          ]
        : defaultList;

    if (
      tooltipState.visible &&
      tooltipState.position.x === position.x &&
      tooltipState.position.y === position.y
    ) {
      setTooltipState(prev => ({ ...prev, visible: false }));
      return;
    }
    setTooltipState({
      visible: true,
      list: defaultList,
      position,
    });
  };

  useEffect(() => {
    if (selectedItem?.value === 'edit') {
      openConfirmModal({
        modalText: '수정하시겠습니까?',
        onConfirm: async () => {
          console.log('수정');
        },
      });
    }
    if (selectedItem?.value === 'report') {
      openConfirmModal({
        modalText: '신고하시겠습니까?',
        onConfirm: async () => {
          console.log('신고');
        },
      });
    }

    if (selectedItem?.value === 'delete') {
      openConfirmModal({
        modalText: '삭제하시겠습니까?',
        onConfirm: async () => {
          await deletePost(postId);
        },
      });
    }
  }, [selectedItem]);
  return (
    <>
      {!keyword && <PostWrite onSubmit={submitPost} />}
      <PostHeader postCount={postCnt} type={keyword ? 'search' : sortType} />
      {postList.map(post => (
        <PostItem
          handlePostMore={handlePostMore}
          key={post.id}
          type={'list'}
          post={post}
          viewerId={userProfile.id}
        />
      ))}
    </>
  );
}
