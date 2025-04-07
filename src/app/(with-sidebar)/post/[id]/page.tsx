import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabaseServer';
import PostItem from '@/components/module/Post/PostItem';
import { PostWithImages, PostWriter } from '@/types/components/post';
import CommentList from '@/components/module/Comment/CommentList';

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
      <CommentList post_id={id} />
    </div>
  );
}
