import {
  Post,
  UserDoc,
  applyToPost,
  auth,
  getUserData,
  likePost,
  unapplyToPost,
  unlikePost,
} from '@/utils/firebase';

import { Button } from '@/components/ui/button';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { formatDistance } from 'date-fns';

import { useEffect, useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Send,
  Heart,
  Trash,
} from 'lucide-react';
import { useAuthState } from 'react-firebase-hooks/auth';

type PostCardProps = {
  post: Post;
  hide: (id: string) => void; // ../../README.md
};

function PostCard(props: PostCardProps) {
  const [user, ,] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [posterData, setPosterData] = useState<UserDoc | null>(null);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likes, setLikes] = useState<number>(props.post.likes);
  const [isApplied, setIsApplied] = useState<boolean>(false);

  function getExperienceColor(years: number) {
    if (years < 3) {
      return <p className="rounded bg-orange-100 p-1">{years} years</p>;
    } else if (years < 5) {
      return <p className="rounded bg-orange-200 p-1">{years} years</p>;
    } else if (years < 7) {
      return <p className="rounded bg-orange-300 p-1">{years} years</p>;
    } else {
      return <p className="rounded bg-orange-400 p-1">{years} years</p>;
    }
  }

  async function handleLike() {
    if (isLiked && user) {
      setLikes(likes - 1);
      await unlikePost(user, props.post.postId);
    } else if (!isLiked && user) {
      setLikes(likes + 1);
      await likePost(user, props.post.postId);
    }
  }

  async function handleApplication() {
    if (isApplied && user) {
      setIsApplied(false);
      // This would theoretically do something other than just remove the user from the
      // applicants field of the post doc and the post id from the users applications field
      // but alas for now this is it.
      await unapplyToPost(user, props.post.postId);
    } else if (!isApplied && user) {
      setIsApplied(true);
      // This would theoretically do something other than just add the user to the
      // applicants field of the post doc and the post id to the users applications field
      // but alas for now this is it.
      await applyToPost(user, props.post.postId);
    }
  }

  useEffect(() => {
    async function getPosterData() {
      if (!user) return;
      const userData = await getUserData(props.post.userId);
      if (!userData) return;
      setIsLiked(userData.likedPosts.includes(props.post.postId));
      setIsApplied(userData.appliedPosts.includes(props.post.postId));
      setPosterData(userData);
    }
    getPosterData();
  }, []);
  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[330px] sm:w-[550px] md:w-[650px] lg:w-[900px] xl:w-[1020px] space-y-2 flex flex-col p-1 md:p-3 rounded items-center justify-between shadow-sm border border-slate-200"
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full gap-3">
            <div className="flex flex-col justify-between p-1 md:p-3 w-full gap-3">
              <div className="flex justify-between border border-slate-200 p-1 items-center w-full rounded-md bg-sky-200">
                <p className="font-bold text-sm sm:text-md md:text-l lg:text-xl w-fit p-1 rounded-md">
                  {props.post.title}
                </p>
                <CollapsibleTrigger asChild>
                  <Button variant="outline" size="sm" className="w-9 p-0">
                    {isOpen && <ChevronUp />}
                    {!isOpen && <ChevronDown />}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm md:text-md italic text-left">
                {props.post.business}
              </p>
            </div>
          </div>
          <div className="flex p-1 md:px-3 justify-between text-xs md:text-sm">
            <div className="flex gap-3 h-fit">
              <p className="rounded bg-slate-100 p-1 border border-slate-200 text-slate-500">
                {props.post.jobType}{' '}
              </p>
              <div className="flex gap-1 rounded bg-slate-100 p-1 items-center border border-slate-200 text-slate-500">
                <Clock size={15} />
                <p>
                  {formatDistance(props.post.createdDate.toDate(), new Date(), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {!isOpen && props.post.experience
                ? props.post.experience.slice(0, 1).map((experience) => (
                    <p
                      key={experience.type}
                      className="rounded bg-slate-100 p-1 border border-slate-200 text-slate-500"
                    >
                      {experience.type}
                    </p>
                  ))
                : null}
            </div>
          </div>
        </div>
        <CollapsibleContent className="w-full">
          <div className="flex flex-col gap-3 p-1 md:p-3 text-xs sm:text-sm md:text-md lg:text-lg text-justify">
            <div className="flex flex-col gap-3">
              {props.post.imageURL ? (
                <img
                  src={props.post.imageURL}
                  alt="an image for the job post"
                  className="object-contain rounded-xl"
                />
              ) : null}
              <div>
                {posterData && (
                  <div className="flex gap-3 p-2 rounded w-fit border border-slate-200">
                    <img src={posterData?.photoURL} width={40} />
                    <div className="flex flex-col justify-center items-start text-xs sm:text-sm md:text-md">
                      <p className="font-semibold text-xs md:text-md">
                        {posterData.displayName}
                      </p>
                      <p className="text-slate-500 text-xs">
                        {props.post.userRole}
                      </p>
                    </div>
                  </div>
                )}
                {!posterData && (
                  <div className="text-red-400">User was deleted</div>
                )}
              </div>
              <p className="font-bold">Description</p>
              <p className="text-slate-800">{props.post.description}</p>
              {props.post.skills && (
                <div>
                  <p className="font-bold">Skills</p>
                  <ul className="grid auto-cols-auto w-fit gap-x-12 gap-y-1 text-slate-800 marker:text-slate-600 list-disc list-inside">
                    {props.post.skills.map((skill) => (
                      <li key={skill.length}>{skill}</li>
                    ))}
                  </ul>
                </div>
              )}
              <p className="font-bold">Experience</p>
              <div className="flex gap-5 flex-wrap text-slate-800">
                {props.post.experience
                  ? props.post.experience.map((experience) => (
                      <div
                        key={experience.type}
                        className="flex h-fit items-center border rounded border-slate-200"
                      >
                        <p className="h-fit p-1 pr-2 bg-slate-100">
                          {experience.type}
                        </p>
                        {getExperienceColor(experience.years)}
                      </div>
                    ))
                  : null}
              </div>
              <p className="font-bold">Remuneration</p>
              <p className="rounded bg-slate-100 text-slate-800 w-fit p-1 border border-slate-200">
                ${props.post.paymentMin} - ${props.post.paymentMax}
              </p>
              <p className="font-bold">Hours</p>
              <p className="rounded bg-slate-100 text-slate-800 w-fit p-1 border border-slate-200">
                {props.post.workingHours}
              </p>
            </div>
            <div className="mt-12 flex gap-3 justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        setIsApplied(!isApplied);
                        await handleApplication();
                      }}
                    >
                      {!isApplied && <Send size={18} />}
                      {isApplied && <Send size={18} fill="#0ea5e9" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Apply</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        setIsLiked(!isLiked);
                        await handleLike();
                      }}
                    >
                      {!isLiked && <Heart size={18} />}
                      {isLiked && <Heart size={18} fill="#e11d48" />}
                      <p className="ml-3 text-xs text-slate-400">{likes}</p>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Like</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => props.hide(props.post.postId)}
                    >
                      <Trash size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="mb-1">Hide this post</p>
                    <p className="text-slate-400 italic">
                      This only removes the post from your personal view.
                    </p>
                    <p className="text-slate-400 italic">
                      It will be back next time you visit
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}

export default PostCard;
