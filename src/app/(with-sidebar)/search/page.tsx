import PostList from '@/components/module/Post/PostList';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ keyword: string }>;
}) {
  const { keyword } = await searchParams;

  return (
    <div>
      <PostList keyword={keyword} />
    </div>
  );
}
