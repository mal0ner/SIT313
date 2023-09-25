import { UserContext } from '@/context/user.context';
import {
  Post,
  UserDoc,
  getPostsById,
  getUserData,
  unlikePost,
} from '@/utils/firebase';
import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import PostShowcase from '@/components/PostShowcase';
import { Loader2, ScrollText, Send } from 'lucide-react';

function ProfilePage() {
  const { user, loading, error } = useContext(UserContext);
  const [userData, setUserData] = useState<UserDoc | null>(null);

  useEffect(() => {
    async function getData() {
      if (!user) return;
      const profile = await getUserData(user.uid);
      setUserData(profile);
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
        <section className="flex flex-col gap-6 text-center">
          <h2 className="text-xl font-yeseva">Liked Posts</h2>
          <LikedPosts user={user} />
        </section>

        <section className="flex flex-col gap-6 text-center">
          <h2 className="text-xl font-yeseva">Applied Posts</h2>
          <AppliedPosts user={user} />
        </section>
      </div>
    );
  }
  return <Navigate to={'/login'} />;
}

type LikedPostsProps = {
  user: User;
};

type AppliedPostsProps = {
  user: User;
};

function AppliedPosts(props: AppliedPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hiddenPosts, setHiddenPosts] = useState<string[]>([]);

  async function hideAndUnapplyToPost(id: string) {
    setHiddenPosts(hiddenPosts.concat(id));
    await unlikePost(props.user, id);
  }

  useEffect(() => {
    async function getData() {
      const profile = await getUserData(props.user.uid);
      if (!profile) return;
      const likedPosts = await getPostsById(profile.appliedPosts);
      setPosts(likedPosts);
    }
    getData();
  }, []);

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

function LikedPosts(props: LikedPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hiddenPosts, setHiddenPosts] = useState<string[]>([]);

  async function hideAndUnlikePost(id: string) {
    setHiddenPosts(hiddenPosts.concat(id));
    await unlikePost(props.user, id);
  }

  useEffect(() => {
    async function getData() {
      const profile = await getUserData(props.user.uid);
      if (!profile) return;
      const likedPosts = await getPostsById(profile.likedPosts);
      setPosts(likedPosts);
    }
    getData();
  }, []);

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

export default ProfilePage;
