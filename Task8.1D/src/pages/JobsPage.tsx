import { Post, getPosts } from '@/utils/firebase';
import { useEffect, useState } from 'react';
import PostCard from '@/components/PostCard';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Info, Loader2 } from 'lucide-react';

function JobsPage() {
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [filter, setFilter] = useState<string>('');
  const [query, setQuery] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deletedPosts, setDeletedPosts] = useState<string[]>([]);

  function handleFilterChange() {
    const searchItems = filter.split(',');
    searchItems.forEach((s, idx) => {
      searchItems[idx] = s.trim().toLowerCase();
    });
    setQuery(new Set(searchItems));
  }

  function hidePost(id: string) {
    setDeletedPosts(deletedPosts.concat(id));
  }

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const posts = await getPosts();
      setPosts(posts);
      setIsLoading(false);
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
      <div className="flex flex-col items-center w-full gap-3 p-6 md:p-12">
        <p className="font-bold text-lg font-yeseva">Filter</p>
        <div className="flex flex-col gap-5 w-full max-w-prose">
          <div className="flex gap-3 items-center w-full max-w-prose">
            <p className="font-bold w-20">Title:</p>
            <Input
              type="search"
              placeholder="Senior Software Engineer"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-3 items-center w-full max-w-prose">
            <p className="font-bold w-20">Skills:</p>
            <Input
              type="search"
              placeholder="C++, Javascript, Angular, React"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-3 items-center justify-center w-full max-w-prose">
            <Button className="w-1/2" onClick={handleFilterChange}>
              {isLoading && <Loader2 className="animate-spin" />}
              {!isLoading && 'Apply'}
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button>
                  <Info />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <p>Filters should be a comma-separated list of values</p>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <p>{query}</p>
      </div>
      <div className="w-full flex items-center mt-12 mb-12">
        {isLoading && (
          <div className="grid place-items-center h-full w-full">
            <Loader2 className="animate-spin" />
          </div>
        )}
        {!isLoading && (
          <div className="flex flex-col gap-5 items-center w-full">
            {posts.map((post: Post, index) => {
              if (!deletedPosts.includes(post.postId)) {
                return <PostCard key={index} post={post} hide={hidePost} />;
              }
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobsPage;
