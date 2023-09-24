import { Post, getPostsWithQuery } from '@/utils/firebase';
import { useContext, useEffect, useState } from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { Info, Loader2 } from 'lucide-react';
import { Navigate, useSearchParams } from 'react-router-dom';
import PostShowcase from '@/components/PostShowcase';
import { UserContext } from '@/context/user.context';

function JobsPage() {
  const { user, loading: authLoading, error } = useContext(UserContext);
  const [searchParams, setSearchParams] = useSearchParams({
    title: [],
    skills: [],
  });
  const titles = searchParams.getAll('title');
  const skills = searchParams.getAll('skills');
  const [posts, setPosts] = useState<Post[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hiddenPosts, setHiddenPosts] = useState<string[]>([]);

  function strToSearchParams(key: string, params: string) {
    searchParams.delete(key);
    params.split(',').forEach((param) => {
      if (param.trim() != '') {
        searchParams.append(key, param.trim());
      }
    });
    setSearchParams(searchParams);
  }

  function searchParamsToStr(key: string) {
    const res = searchParams.getAll(key);
    if (res.length > 0) return res.join(', ');
    return '';
  }

  async function handleFilterChange() {
    setIsLoading(true);
    const posts = await getPostsWithQuery(titles, skills);
    setPosts(posts);
    setIsLoading(false);
  }

  function hidePost(id: string) {
    setHiddenPosts(hiddenPosts.concat(id));
  }

  useEffect(() => {
    async function getData() {
      if (!user) return;
      setIsLoading(true);
      const posts = await getPostsWithQuery(titles, skills);
      setPosts(posts);
      setIsLoading(false);
    }
    getData();
  }, []);
  if (authLoading) {
    return (
      <div className="p-10 gap-6 w-full flex flex-col items-center justify-center">
        <p>Loading Authentication</p>
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div>Error... {error.message}</div>;
  }
  if (user) {
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
            Don't forget to use the custom filter and search options below to
            find the best jobs for you!
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
                onChange={(e) => strToSearchParams('title', e.target.value)}
                defaultValue={searchParamsToStr('title')}
              />
            </div>
            <div className="flex gap-3 items-center w-full max-w-prose">
              <p className="font-bold w-20">Skills:</p>
              <Input
                type="search"
                placeholder="C++, Javascript, Angular, React"
                onChange={(e) => strToSearchParams('skills', e.target.value)}
                defaultValue={searchParamsToStr('skills')}
              />
            </div>
            <div className="flex gap-3 items-center justify-center w-full max-w-prose">
              <Button
                className="w-1/2"
                onClick={async () => handleFilterChange()}
              >
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
        </div>
        <div className="w-full flex items-center mt-12 mb-12">
          {isLoading && (
            <div className="grid place-items-center h-full w-full">
              <Loader2 className="animate-spin" />
            </div>
          )}
          {!isLoading && (
            <PostShowcase
              posts={posts}
              hiddenPosts={hiddenPosts}
              hide={hidePost}
            />
          )}
        </div>
      </div>
    );
  }
  return <Navigate to={'/login'} />;
}

export default JobsPage;
