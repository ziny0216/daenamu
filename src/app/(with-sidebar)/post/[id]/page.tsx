import PostItem from '@/components/module/Post/PostItem';
import CommentItem from '@/components/module/Comment/CommentItem';
import CommentWrite from '@/components/module/Comment/CommentWrite';

export default function Page() {
  return (
    <div>
      <PostItem type={'detail'} />
      <CommentWrite />
      <div>
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
        <CommentItem />
      </div>
    </div>
  );
}
