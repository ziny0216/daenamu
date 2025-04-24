import browserClient from '@/utils/supabaseClient';

export const uploadUserImage = async (
  profileData: File,
): Promise<string | null> => {
  const filePath = `${Date.now()}-${profileData.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9._-]/g, '')}`;
  const { data, error } = await browserClient.storage
    .from('avatars')
    .upload(filePath, profileData, { upsert: true });

  if (!data || error) {
    console.error('Upload failed:', error);
    return null;
  }

  const imageUrl = browserClient.storage.from('avatars').getPublicUrl(data.path)
    .data.publicUrl;

  return imageUrl;
};
