'use client';

import PostActionBar from '@/components/module/Post/PostWriteActionBar';
import styles from '@/components/module/Post/Post.module.css';
import Textarea from '@/components/common/TextArea';
import PostImageList from '@/components/module/Post/PostImageList';
import { ChangeEvent, useEffect, useState } from 'react';
import { FileData } from '@/types/components/common';

export default function PostWrite() {
  const [postContent, setPostContent] = useState('');
  const [previewData, setPreviewData] = useState<FileData[]>([]);
  const [deletedFiles, setDeletedFiles] = useState<number[]>([]);
  const handlePostContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setPostContent(e.target.value);
  };

  useEffect(() => {
    console.log(deletedFiles);
  }, [deletedFiles]);
  const handleFileChange = (data: FileData[]) => {
    setPreviewData(prev => [...prev, ...data]);
  };

  const handleDelete = (file_seq: number | null, idx: number) => {
    if (file_seq) {
      setDeletedFiles(prev => [...prev, file_seq]);
    }

    setPreviewData(prev => prev.filter((_, index) => index !== idx));
  };
  return (
    <div className={styles.post_container}>
      {/*<Profile user_id={user?.id} />*/}
      <Textarea
        inputSize={'md'}
        rows={2}
        onChange={handlePostContent}
        placeholder="지금 내 생각은...?"
      />
      <PostImageList onDeleteImg={handleDelete} files={previewData} />
      <PostActionBar
        disabled={!postContent}
        handleFileChange={handleFileChange}
      />
    </div>
  );
}
