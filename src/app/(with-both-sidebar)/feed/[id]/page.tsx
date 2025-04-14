import FeedList from '@/components/module/Feed/FeedList';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <FeedList feedId={id} />;
}
