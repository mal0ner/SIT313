import { Post } from '@/utils/firebase';
import PostCard from '@/components/PostCard';

type PostShowcaseProps = {
  posts: Post[];
  hide: (id: string) => void;
  hiddenPosts: string[];
};

function PostShowcase(props: PostShowcaseProps) {
  return (
    <>
      <div className="flex flex-col gap-5 items-center w-full">
        {props.posts.length == 0 ? (
          <div>Uh oh, there's nothing here!</div>
        ) : null}
        {props.posts.map((post: Post, index) => {
          if (!props.hiddenPosts.includes(post.postId)) {
            return <PostCard key={index} post={post} hide={props.hide} />;
          }
        })}
      </div>
    </>
  );
}

export default PostShowcase;
