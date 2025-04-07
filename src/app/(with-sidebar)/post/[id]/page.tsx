import CommentItem from '@/components/module/Comment/CommentItem';
import CommentWrite from '@/components/module/Comment/CommentWrite';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabaseServer';
import PostItem from '@/components/module/Post/PostItem';
import { PostWithImages, PostWriter } from '@/types/components/post';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const { id } = await params;

  const { data, error } = await supabase.rpc(
    'get_post_with_images_and_user_by_id',
    { pid: id },
  );

  if (error || !data) {
    return notFound();
  }

  return (
    <div>
      {data && (
        <PostItem type={'detail'} post={data as PostWithImages & PostWriter} />
      )}
      <CommentWrite />
      <div>
        <CommentItem />
      </div>
    </div>
  );
}
