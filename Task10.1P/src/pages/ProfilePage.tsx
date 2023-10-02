import { UserContext } from '@/context/user.context';
import { Post, UserDoc, getPostsById, unlikePost } from '@/utils/firebase';
import { useContext, useEffect, useState } from 'react';
import { NavLink, Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { User } from 'firebase/auth';
import PostShowcase from '@/components/PostShowcase';
import { Loader2, ScrollText, Send } from 'lucide-react';

function ProfilePage() {
  const { user, userDoc: userData, loading, error } = useContext(UserContext);

  if (loading) {
    return (
      <div className="p-10 gap-6 w-full flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (error) {
    return <div>Error... {error.message}</div>;
  }
  if (user) {
    return (
      <div className="flex flex-col gap-6 p-10 items-center">
        <section className="flex flex-col items-center gap-1 border border-slate-200 rounded p-5 w-[250px]">
          {user.photoURL && <img src={user.photoURL} alt="profile image" />}
          <h1 className="font-josefin text-slate-600 text-xl text-center whitespace-nowrap overflow-ellipsis w-full overflow-hidden">
            {user.displayName}
          </h1>
          <div className="flex gap-5 items-center justify-center w-full">
            <div className="flex gap-1 items-center text-slate-500">
              <ScrollText size={17} />
              <p>{userData && userData.posts.length}</p>
            </div>
            <div className="flex gap-1 items-center text-slate-500">
              <Send size={17} />
              <p>{userData && userData.appliedPosts.length}</p>
            </div>
          </div>
        </section>
        <ul className="flex flex-wrap gap-6 items-center justify-center">
          <li>
            <NavLink
              to={'/profile/posts'}
              className={({ isActive }) =>
                isActive
                  ? 'rounded-lg px-4 py-2 bg-sky-200 font-bold font-josefin'
                  : 'rounded-lg px-4 py-2 bg-slate-100 font-josefin'
              }
            >
              My Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/profile/likes'}
              className={({ isActive }) =>
                isActive
                  ? 'rounded-lg px-4 py-2 bg-sky-200 font-bold font-josefin'
                  : 'rounded-lg px-4 py-2 bg-slate-100 font-josefin'
              }
            >
              Liked Posts
            </NavLink>
          </li>
          <li>
            <NavLink
              to={'/profile/applications'}
              className={({ isActive }) =>
                isActive
                  ? 'rounded-lg px-4 py-2 bg-sky-200 font-bold font-josefin'
                  : 'rounded-lg px-4 py-2 bg-slate-100 font-josefin'
              }
            >
              Applications
            </NavLink>
          </li>
        </ul>
        {/*
          <section className="flex flex-col gap-6 text-center">
            <h2 className="text-xl font-yeseva">Liked Posts</h2>
            <LikedPosts user={user} />
          </section>

            <section className="flex flex-col gap-6 text-center">
              <h2 className="text-xl font-yeseva">Applied Posts</h2>
                <AppliedPosts user={user} />
        </section>
        */}
        <Outlet
          context={{ user, data: userData } satisfies ProfileOutletProps}
        />
      </div>
    );
  }
  return <Navigate to={'/login'} />;
}

type ProfileOutletProps = {
  user: User;
  data: UserDoc | null;
};

export function AppliedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, data } = useOutletContext<ProfileOutletProps>();
  const [hiddenPosts, setHiddenPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function hideAndUnapplyToPost(postId: string) {
    setHiddenPosts(hiddenPosts.concat(postId));
    await unlikePost(user, postId);
  }

  useEffect(() => {
    async function getData() {
      if (!data) return;
      const likedPosts = await getPostsById(data.appliedPosts);
      setPosts(likedPosts);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <div className="p-10 gap-6 w-full flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <PostShowcase
        posts={posts}
        hide={hideAndUnapplyToPost}
        hiddenPosts={hiddenPosts}
        emptyMessage="Apply to a Post to see it here."
      />
    </div>
  );
}

export function LikedPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user, data } = useOutletContext<ProfileOutletProps>();
  const [hiddenPosts, setHiddenPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  async function hideAndUnlikePost(postId: string) {
    setHiddenPosts(hiddenPosts.concat(postId));
    await unlikePost(user, postId);
  }

  useEffect(() => {
    async function getData() {
      if (!data) return;
      const likedPosts = await getPostsById(data.likedPosts);
      setPosts(likedPosts);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <div className="p-10 gap-6 w-full flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <PostShowcase
        posts={posts}
        hide={hideAndUnlikePost}
        hiddenPosts={hiddenPosts}
        emptyMessage="Like a post to see it here"
      />
    </div>
  );
}

export function MyPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hiddenPosts, setHiddenPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { data } = useOutletContext<ProfileOutletProps>();

  function hidePost(postId: string) {
    setHiddenPosts(hiddenPosts.concat(postId));
  }

  useEffect(() => {
    async function getData() {
      if (!data) return;
      const myPosts = await getPostsById(data.posts);
      setPosts(myPosts);
      setLoading(false);
    }
    getData();
  }, []);

  if (loading) {
    return (
      <div className="p-10 gap-6 w-full flex flex-col items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  return (
    <div>
      <PostShowcase
        posts={posts}
        hide={hidePost}
        hiddenPosts={hiddenPosts}
        emptyMessage="Create a post to see it here"
      />
    </div>
  );
}

export default ProfilePage;
