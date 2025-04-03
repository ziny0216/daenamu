import { FileData } from '@/types/components/common';
import browserClient from '@/utils/supabaseClient';
import { Tables } from '@/types/database.types';

export const uploadPostImages = async (files: FileData[], userId: string) => {
  const uploadedUrls: string[] = [];
  for (const { file } of files) {
    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '')}`;
    const filePath = `${userId}/${fileName}`;
    const { data, error } = await browserClient.storage
      .from('post-images')
      .upload(filePath, file, {
        cacheControl: '3600',
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
  nickname,
  is_anonymity,
}: Omit<Tables<'posts'>, 'created_at' | 'id'> & { files: FileData[] }) => {
  const uploadedUrls = await uploadPostImages(files, user_id);

  const { data: post, error: postError } = await browserClient
    .from('posts')
    .insert({
      content,
      user_id,
      nickname,
      is_anonymity,
    })
    .select()
    .single();

  if (postError || !post) throw postError;

  const imagesPayload = uploadedUrls.map(url => ({
    post_id: post.id,
    image_url: url,
  }));

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
