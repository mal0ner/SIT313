import { Post, getPosts } from '@/utils/firebase';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';

function JobsPage() {
  const [data, setData] = useState<Post[] | []>([]);
  // const [query, setQuery] = useState('');

  useEffect(() => {
    async function getData() {
      const posts = await getPosts();
      setData(posts);
    }
    getData();
  }, []);
  return (
    <div className="grid place-items-center min-h-screen">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-2xl md:text-4xl font-yeseva">Jobs Page</h1>
        {data.map((post: Post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
    </div>
  );
}

export default JobsPage;
