'use client';

import Modal from '@/components/modal/Modal';
import PostWrite from '@/components/module/Post/PostWrite';
import { PostData, PostWithImages } from '@/types/components/post';
import { FileData } from '@/types/components/common';

export default function PostEditModal({
  isPostEditModal,
  onClickCancel,
  postData,
  onSubmitEditPost,
}: {
  onSubmitEditPost: (
    params: PostData & {
      files: FileData[];
      deleteIds?: number[];
      id?: string;
    },
  ) => void;
  onClickCancel: () => void;
  isPostEditModal: boolean;
  postData?: PostWithImages;
}) {
  const onSubmit = (
    params: PostData & {
      files: FileData[];
      deleteIds?: number[];
      id?: string;
    },
  ) => {
    onSubmitEditPost(params);
  };

  return (
    <Modal
      onClose={onClickCancel}
      className={'report_modal'}
      isOpen={isPostEditModal}
      title={'POST 수정'}
    >
      <PostWrite isEdit={true} onSubmit={onSubmit} postData={postData} />
    </Modal>
  );
}
