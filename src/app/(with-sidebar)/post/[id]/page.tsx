import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabaseServer';
import PostDetail from '@/components/module/Post/PostDetail';
import { PostWithImages, PostWriter } from '@/types/components/post';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { id } = await params;

  const { data, error } = await supabase.rpc(
    'get_post_with_images_and_user_by_id',
    { pid: id, uid: user?.id },
  );
  console.log(data, 'data');
  if (error || !data) {
    return notFound();
  }

  return (
    <div>
      <PostDetail
        userId={user?.id}
        detail={data as PostWithImages & PostWriter}
        postId={id}
      />
    </div>
  );
}
