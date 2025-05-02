'use client';

import PostActionBar from '@/components/module/Post/PostWriteActionBar';
import styles from '@/components/module/Post/Post.module.css';
import Textarea from '@/components/common/TextArea';
import PostImageList from '@/components/module/Post/PostImageList';
import { ChangeEvent, useEffect, useState } from 'react';
import { FileData } from '@/types/components/common';
import Profile from '@/components/module/User/Profile';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { PostData, PostWithImages } from '@/types/components/post';
import { useModal } from '@/hooks/common/useModal';

export default function PostWrite({
  onSubmit,
  isEdit,
  postData,
}: {
  onSubmit: (
    params: PostData & {
      files: FileData[];
      deleteIds?: number[];
      id?: string;
    },
  ) => void;
  isEdit?: boolean;
  postData?: PostWithImages;
}) {
  const { openConfirmModal } = useModal();
  const userProfile = useSelector((state: RootState) => state.user.users);
  const [postContent, setPostContent] = useState('');
  const [previewData, setPreviewData] = useState<FileData[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const handlePostContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  const setProfileData = (data: FileData[]) => {
    setPreviewData(prev => [...prev, ...data]);
  };

  const handleDelete = (idx: number, id: number) => {
    if (id) {
      setDeletedFiles(prev => [...prev, id]);
    }

    setPreviewData(prev => prev.filter((_, index) => index !== idx));
  };

  const handlePost = async () => {
    openConfirmModal({
      modalText: isEdit
        ? '게시물을 수정하시겠습니까?'
        : '게시물을 등록하시겠습니까?',
      onConfirm: () => {
        submitPost();
      },
    });
  };

  const submitPost = () => {
    const params = {
      content: postContent,
      files: previewData,
      is_anonymity: isChecked,
      user_id: userProfile.id,
      ...(isEdit && { deleteIds: deletedFiles, id: postData?.id }),
    };
    onSubmit(params);
    setPostContent('');
    setPreviewData([]);
    setIsChecked(false);
  };

  useEffect(() => {
    if (!postData) return;
    setPostContent(postData.content);
    setPreviewData(postData.images);
    setIsChecked(postData.is_anonymity);
  }, [postData]);

  return (
    <div className={styles.post_container}>
      <Profile
        profile={userProfile}
        is_anonymity={isEdit ? isChecked : false}
      />
      <Textarea
        inputSize={'md'}
        rows={2}
        value={postContent}
        onChange={handlePostContent}
        placeholder="지금 내 생각은...?"
      />
      <PostImageList onDeleteImg={handleDelete} files={previewData} />
      <PostActionBar
        isEdit={isEdit}
        isChecked={isChecked}
        onChange={(checked: boolean) => setIsChecked(checked)}
        handlePost={handlePost}
        disabled={!postContent}
        setProfileData={setProfileData}
      />
    </div>
  );
}
