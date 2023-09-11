import { Post, getPosts } from '@/utils/firebase';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

function JobsPage() {
  const [data, setData] = useState<Post[] | []>([]);
  const [filter, setFilter] = useState<string>('');
  const [query, setQuery] = useState<string[]>([]);

  function handleFilterChange() {
    const searchItems = filter.split(',');
    searchItems.forEach((s, idx) => {
      searchItems[idx] = s.trim().toLowerCase();
    });
    setQuery(searchItems);
  }

  useEffect(() => {
    async function getData() {
      const posts = await getPosts();
      setData(posts);
    }
    getData();
  }, []);
  return (
    <div className="">
      <div className="flex flex-col gap-5 w-full p-6 md:p-12 items-center justify-center text-justify">
        <h1 className="text-2xl md:text-4xl font-yeseva">Find Jobs</h1>
        <p className="font-josefin max-w-prose text-lg">
          Welcome to the DevLink Marketplace Job's Page! This is the heart of
          our website, and the place where passionate employers meet the next
          member of their team.
        </p>
        <p className="font-josefin max-w-prose text-lg">
          Don't forget to use the custom filter and search options below to find
          the best jobs for you!
        </p>
      </div>
      <Separator />
      <div className="flex flex-col gap-3 p-6 md:p-12">
        <p className="font-bold">Search</p>
        <Input
          type="search"
          placeholder="Angular, Javascript, Typescript"
          onChange={(e) => setFilter(e.target.value)}
        />
        <Button onClick={handleFilterChange}>Apply</Button>
        <p>{query}</p>
      </div>
      <div className="w-full flex items-center mt-12 mb-12">
        <div className="flex flex-col gap-5 items-center w-full">
          {data.map((post: Post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default JobsPage;
