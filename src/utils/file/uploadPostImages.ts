import { FileData } from '@/types/components/common';
import browserClient from '@/utils/supabaseClient';
import { PostData } from '@/types/components/post';

export const uploadPostImages = async (files: FileData[], userId: string) => {
  const uploadedUrls: string[] = [];

  for (const { file } of files) {
    if (!file) return;
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '')}`;
    const filePath = `${userId}/${fileName}`;
    const { data, error } = await browserClient.storage
      .from('post-images')
      .upload(filePath, file, {
        upsert: false,
      });

    if (error) throw error;

    const imageUrl = browserClient.storage
      .from('post-images')
      .getPublicUrl(data.path).data.publicUrl;

    uploadedUrls.push(imageUrl);
  }

  return uploadedUrls;
};

export const uploadPost = async ({
  content,
  files,
  user_id,
  is_anonymity,
}: PostData & {
  files: FileData[];
}) => {
  const uploadedUrls = await uploadPostImages(files, user_id as string);

  const { data: post, error: postError } = await browserClient
    .from('posts')
    .insert({
      content,
      user_id,
      is_anonymity,
    })
    .select()
    .single();

  if (postError || !post) throw postError;

  const imagesPayload =
    uploadedUrls?.map(url => ({
      post_id: post.id,
      image_url: url,
    })) ?? [];

  const { data: imageData, error: imageError } = await browserClient
    .from('post_images')
    .insert(imagesPayload)
    .select();

  if (imageError) throw imageError;

  return {
    post: post,
    images: imageData,
  };
};

export const updatePost = async ({
  content,
  files,
  user_id,
  is_anonymity,
  deleteIds,
  id,
}: PostData & {
  files: FileData[];
  deleteIds?: number[];
  id?: string;
}) => {
  const newFiles = files.filter(file => !file.id);

  // storage에 저장하고 url 가지고 오기
  const uploadedUrls = await uploadPostImages(newFiles, user_id as string);

  // 사진 삭제
  if (deleteIds && deleteIds.length > 0) {
    await browserClient.from('post_images').delete().in('id', deleteIds);
  }

  // 게시물 업데이트
  const { data: post, error: postError } = await browserClient
    .from('posts')
    .update({
      content,
      user_id,
      is_anonymity,
    })
    .eq('id', id as string)
    .select();

  if (postError || !post) throw postError;

  const imagesPayload =
    uploadedUrls?.map(url => ({
      post_id: id,
      image_url: url,
    })) ?? [];

  // 게시물 이미지 테이블 저장
  const { data: imageData, error: imageError } = await browserClient
    .from('post_images')
    .insert(imagesPayload)
    .select();

  if (imageError) throw imageError;

  const updateImage = files.filter(
    img => img.id && !deleteIds?.includes(img.id),
  );

  return {
    post: post,
    images: [...(updateImage ?? []), ...imageData],
  };
};
