import { Tables } from '@/types/database.types';

export type PostDetail = {
  id: string;
  content: string;
  created_at: string;
  is_anonymity: boolean;
  user_id: string | null;
  images: {
    created_at: string;
    id: number;
    image_url: string | null;
    post_id: string | null;
  }[];
  user: {
    user_id: string | null;
    nickname: string;
    avatar_url: string | null;
  } | null;
};
export type PostData = {
  content: string;
  is_anonymity: boolean;
  user_id: string | null;
};
export type PostWriter = {
  user: {
    user_id: string | null;
    nickname: string;
    avatar_url: string | null;
  } | null;
};

export type PostWithImages = Tables<'posts'> & {
  images: Partial<Tables<'post_images'>>[];
  is_like: boolean;
};
