import { ChangeEvent } from 'react';
import browserClient from '@/utils/supabaseClient';

export const uploadUserImage = async (
  profileData: File,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void,
): Promise<string | null> => {
  const fileName = `${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  const { data, error } = await browserClient.storage
    .from('avatars')
    .upload(fileName, profileData, { upsert: true });

  if (!data || error) {
    console.error('Upload failed:', error);
    return null;
  }

  const {
    data: { publicUrl },
  } = browserClient.storage.from('avatars').getPublicUrl(data.path);

  // form 상태에 반영
  onChange({
    target: { value: publicUrl, name: 'avatar_url' },
  } as ChangeEvent<HTMLInputElement>);

  return publicUrl;
};
