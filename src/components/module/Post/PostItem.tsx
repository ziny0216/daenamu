import styles from '@/components/module/Post/Post.module.css';
import PostActionBar from '@/components/module/Post/PostActionBar';
import PostImageList from '@/components/module/Post/PostImageList';
import Link from 'next/link';
import { PostWithImages, PostWriter } from '@/types/components/post';
import Profile from '@/components/module/User/Profile';
import Button from '@/components/common/Button';
import MoreIcon from '@/assets/icons/icon-more.svg';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useTooltip } from '@/components/common/Tooltip';
import { useModal } from '@/hooks/common/useModal';

export default function PostItem({
  type,
  post,
  viewerId,
}: {
  type: 'list' | 'detail';
  post: PostWithImages & PostWriter;
  viewerId?: string;
}) {
  const userProfile = useSelector((state: RootState) => state.user.users);
  const { setTooltipState, tooltipState, selectedItem } = useTooltip();
  const { openConfirmModal } = useModal();

  const handlePostMore = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      x: rect.left + window.scrollX - 154,
      y: rect.bottom + window.scrollY + 12,
    };

    let defaultList = [{ name: '신고하기', value: 'report' }];
    defaultList =
      userProfile.id === post.user?.user_id
        ? [
            { name: '삭제하기', value: 'delete' },
            {
              name: '수정하기',
              value: 'edit',
            },
            ...defaultList,
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
          console.log('삭제');
        },
      });
    }
  }, [selectedItem]);
  return (
    <div className={styles.post_container}>
      <div className={styles.pf_header}>
        <Profile is_anonymity={post.is_anonymity} profile={post.user} />
        <Button
          className={'tooltip_trigger'}
          onClick={handlePostMore}
          icon={<MoreIcon />}
          isIcon
          color={'transparent'}
        />
      </div>
      <div className={styles.post_content}>
        <Link
          href={`/post/${post.id}`}
          className={type === 'list' ? 'ellipse3' : ''}
        >
          {post.content}
        </Link>
      </div>
      {post.images && <PostImageList files={post.images} listType={'list'} />}

      <PostActionBar post={post} userId={viewerId} />
    </div>
  );
}
