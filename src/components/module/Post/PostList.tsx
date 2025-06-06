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
import ReportModal from '@/components/modal/ReportModal';
import { ReportReasonType } from '@/types/components/module';
import browserClient from '@/utils/supabaseClient';
import { toast } from 'react-toastify';
import PostEditModal from '@/components/modal/PostEditModal';

export default function PostList({ keyword }: { keyword?: string }) {
  const pathName = usePathname();
  const sortType = pathName.includes('/hot') ? 'popular' : 'recent';
  const userProfile = useSelector((state: RootState) => state.user.users);
  const { postList, submitPost, submitEditPost, postCnt, deletePost } =
    usePostList({
      userProfile,
      sortType,
      only_mine: false,
      keyword: keyword,
    });
  const { setTooltipState, tooltipState, selectedItem } = useTooltip();
  const { openConfirmModal } = useModal();
  const [isReportModal, setIsReportModal] = useState(false);
  const [isPostEditModal, setIsPostEditModa] = useState(false);
  const [postId, setPostId] = useState('');
  const [targetPost, setTargetPost] = useState<PostWithImages>();

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
      return setTooltipState(prev => ({ ...prev, visible: false }));
    }
    setTooltipState({
      visible: true,
      list: defaultList,
      position,
    });
  };

  useEffect(() => {
    if (selectedItem?.value === 'edit') {
      const targetPost = postList.find(edit => edit.id === postId);
      if (targetPost) {
        setTargetPost(targetPost);
      }
      setIsPostEditModa(true);
    }
    if (selectedItem?.value === 'report') {
      setIsReportModal(true);
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

  const handleConfirm = async (report: ReportReasonType) => {
    setIsReportModal(false);

    openConfirmModal({
      modalText: '신고하시겠습니까?',
      onConfirm: async () => {
        const { error } = await browserClient.from('reports').insert({
          target_type: 'post',
          target_id: postId,
          reporter_id: userProfile.id,
          ...report,
        });

        if (error) {
          if (error.code === '23505') {
            return toast('이미 신고되었습니다.');
          }
          return toast(error.message);
        }

        toast('신고되었습니다.');
      },
    });
  };

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
      <ReportModal
        onClickCancel={() => setIsReportModal(false)}
        isReportModal={isReportModal}
        handleConfirm={handleConfirm}
      />
      <PostEditModal
        onSubmitEditPost={params => {
          submitEditPost(params);
          setIsPostEditModa(false);
        }}
        onClickCancel={() => setIsPostEditModa(false)}
        isPostEditModal={isPostEditModal}
        postData={targetPost}
      />
    </>
  );
}
