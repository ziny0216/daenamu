import PostWrite from '@/components/module/Post/PostWrite';
import PostItem from '@/components/module/Post/PostItem';

export default function Home() {
  return (
    <main>
      <PostWrite />
      <PostItem type={'list'} />
      <PostItem type={'list'} />
      <PostItem type={'list'} />
    </main>
  );
}
