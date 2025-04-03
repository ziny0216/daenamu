import { Tables } from '@/types/database.types';

export type PostWithImages = Tables<'posts'> & {
  images: Tables<'post_images'>[];
};
