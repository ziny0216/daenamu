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
import { PostData } from '@/types/components/post';
import { useModal } from '@/hooks/common/useModal';

export default function PostWrite({
  onSubmit,
}: {
  onSubmit: (
    params: PostData & {
      files: FileData[];
    },
  ) => void;
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

  useEffect(() => {
    console.log(deletedFiles);
  }, [deletedFiles]);

  const setProfileData = (data: FileData[]) => {
    setPreviewData(prev => [...prev, ...data]);
  };

  const handleDelete = (idx: number) => {
    if (idx) {
      setDeletedFiles(prev => [...prev, idx]);
    }

    setPreviewData(prev => prev.filter((_, index) => index !== idx));
  };

  const handlePost = async () => {
    openConfirmModal({
      modalText: '게시물을 등록하시겠습니까?',
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
    };
    onSubmit(params);
    setPostContent('');
    setPreviewData([]);
    setIsChecked(false);
  };
  return (
    <div className={styles.post_container}>
      <Profile profile={userProfile} is_anonymity={false} />
      <Textarea
        inputSize={'md'}
        rows={2}
        value={postContent}
        onChange={handlePostContent}
        placeholder="지금 내 생각은...?"
      />
      <PostImageList onDeleteImg={handleDelete} files={previewData} />
      <PostActionBar
        isChecked={isChecked}
        onChange={(checked: boolean) => setIsChecked(checked)}
        handlePost={handlePost}
        disabled={!postContent}
        setProfileData={setProfileData}
      />
    </div>
  );
}
