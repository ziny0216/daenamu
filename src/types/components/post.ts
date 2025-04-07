import { Tables } from '@/types/database.types';

export type Post = {
  id: string;
  content: string;
  created_at: string;
  is_anonymity: boolean;
  user_id: string | null;
  user: {
    user_id: string | null;
    nickname: string;
    avatar_url: string | null;
  } | null;
  images: {
    image_url: string;
  }[];
};

export type PostWriter = {
  user: {
    user_id: string | null;
    nickname: string;
    avatar_url: string | null;
  } | null;
};
export type PostWithImages = Tables<'posts'> & {
  images: Tables<'post_images'>[];
};
