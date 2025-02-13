import PostItem from '@/components/module/Post/PostItem';

export default function PostList({ keyword }: { keyword?: string }) {
  return (
    <>
      {keyword && <div>검색 결과 5건</div>}
      <PostItem type={'list'} />
    </>
  );
}
