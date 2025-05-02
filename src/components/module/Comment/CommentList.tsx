'use client';
import CommentWrite from '@/components/module/Comment/CommentWrite';
import CommentItem from '@/components/module/Comment/CommentItem';
import browserClient from '@/utils/supabaseClient';
import { CommentWriteType } from '@/types/components/comment';
import { toast } from 'react-toastify';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Tables } from '@/types/database.types';
import { PostWriter } from '@/types/components/post';
import { useTooltip } from '@/components/common/Tooltip';
import { useModal } from '@/hooks/common/useModal';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import ReportModal from '@/components/modal/ReportModal';
import { ReportReasonType } from '@/types/components/module';

export default function CommentList({
  postId,
  setCmtCnt,
}: {
  postId: string;

  setCmtCnt: Dispatch<SetStateAction<number>>;
}) {
  const [commentList, setCommentList] = useState<
    (Tables<'comments'> & PostWriter)[]
  >([]);
  const [cmtId, setCmtId] = useState<number>();
  const userProfile = useSelector((state: RootState) => state.user.users);
  const { setTooltipState, tooltipState, selectedItem } = useTooltip();
  const { openConfirmModal } = useModal();
  const [isReportModal, setIsReportModal] = useState(false);

  const onSubmitComment = async (params: CommentWriteType & PostWriter) => {
    const { comment, user_id, user } = params;
    const { data, error } = await browserClient
      .from('comments')
      .insert({
        comment,
        user_id,
        post_id: postId,
      })
      .select()
      .single();
    if (data) {
      setCommentList(prev => [{ ...data, user }, ...prev]);
      setCmtCnt(prev => prev + 1);
      toast('등록되었습니다.');
    }
    if (error) {
      console.error(error);
      toast('댓글 등록이 실패했습니다.');
    }
  };

  const handleCmtMore = (
    e: React.MouseEvent<HTMLButtonElement>,
    cmt: Tables<'comments'> & PostWriter,
  ) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + window.scrollX - 154,
      y: rect.bottom + window.scrollY + 12,
    };
    setCmtId(cmt.id);

    let defaultList = [{ name: '신고하기', value: 'report' }];
    defaultList =
      userProfile.id === cmt.user?.user_id
        ? [{ name: '삭제하기', value: 'delete' }]
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
    const fetchComments = async () => {
      const { data, error } = await browserClient.rpc('get_comment_with_user', {
        pid: postId,
      });
      if (error) {
        console.error('댓글 가져오기 에러:', error);
        return;
      }
      setCommentList(data as (Tables<'comments'> & PostWriter)[]);
    };
    fetchComments();
  }, []);

  useEffect(() => {
    if (selectedItem?.value === 'report') {
      setIsReportModal(true);
    }

    if (selectedItem?.value === 'delete') {
      openConfirmModal({
        modalText: '삭제하시겠습니까?',
        onConfirm: async () => {
          await deletePost();
        },
      });
    }
  }, [selectedItem]);

  const deletePost = async () => {
    if (!cmtId) return;
    const { error } = await browserClient
      .from('comments')
      .delete()
      .eq('id', cmtId);
    if (error) {
      toast(error.message);
    } else {
      toast('삭제되었습니다!');
      setCommentList(prev => prev.filter(cmt => cmt.id !== cmtId));
    }
  };

  const handleConfirm = async (report: ReportReasonType) => {
    setIsReportModal(false);

    openConfirmModal({
      modalText: '신고하시겠습니까?',
      onConfirm: async () => {
        const { error } = await browserClient.from('reports').insert({
          target_type: 'comment',
          target_id: String(cmtId),
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
      <CommentWrite onSubmit={onSubmitComment} />
      {commentList.map(cmt => (
        <CommentItem handleCmtMore={handleCmtMore} key={cmt.id} comment={cmt} />
      ))}
      <ReportModal
        onClickCancel={() => setIsReportModal(false)}
        isReportModal={isReportModal}
        handleConfirm={handleConfirm}
      />
    </>
  );
}
