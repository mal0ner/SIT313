import { Post } from '@/utils/firebase';

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

import { useState } from 'react';
import { ChevronDown, ChevronUp, Send, Heart, Trash } from 'lucide-react';

function ProfileCard(props: Post) {
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="w-[330px] sm:w-[550px] md:w-[650px] lg:w-[900px] xl:w-[1020px] space-y-2 flex flex-col p-1 md:p-3 rounded items-center justify-between shadow-sm border border-slate-200"
      >
        <div className="flex flex-col w-full">
          <div className="flex items-center w-full gap-3">
            <div className="flex justify-between p-1 md:p-3 w-full gap-3 items-center">
              <div className="flex justify-between border border-slate-200 p-1 items-center bg-slate-100 w-full rounded-md">
                <p className="font-bold text-sm sm:text-md md:text-l lg:text-xl w-fit p-1 rounded-md">
                  {props.title}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm md:text-md italic">
                  @{props.business}
                </p>
              </div>
            </div>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-9 p-0">
                {isOpen && <ChevronUp />}
                {!isOpen && <ChevronDown />}
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className="flex p-2 justify-between text-xs md:text-sm">
            <div className="flex gap-3 h-fit">
              <p className="rounded bg-slate-100 p-1 border border-slate-200 text-slate-500">
                {props.jobType}{' '}
              </p>
              <p className="rounded overflow-ellipsis whitespace-nowrap bg-slate-100 p-1 border border-slate-200 text-slate-500">
                {props.projectLength}
              </p>
            </div>
            <div className="flex gap-3">
              {!isOpen && props.experience
                ? props.experience
                    .slice(0, 1)
                    .map((experience) => (
                      <p className="rounded bg-slate-100 p-1 border border-slate-200 text-slate-500">
                        {experience.type}
                      </p>
                    ))
                : null}
            </div>
          </div>
        </div>
        <CollapsibleContent className="w-full">
          <div className="flex flex-col gap-3 p-3 text-xs sm:text-sm md:text-md lg:text-lg text-justify">
            <div className="flex flex-col gap-3">
              <p className="font-bold">Description</p>
              <p className="text-slate-800">{props.description}</p>
              <p className="font-bold">Experience</p>
              <div className="flex gap-5 flex-wrap text-slate-800">
                {props.experience
                  ? props.experience.map((experience) => (
                      <div className="flex h-fit items-center border rounded border-slate-200">
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
                ${props.paymentMin} - ${props.paymentMax}
              </p>
              <p className="font-bold">Hours</p>
              <p className="rounded bg-slate-100 text-slate-800 w-fit p-1 border border-slate-200">
                {props.workingHours}
              </p>
            </div>
            <div className="mt-12 flex gap-3 justify-end">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Send size={18} />
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
                    <Button variant="outline">
                      <Heart size={18} />
                      <p className="ml-3 text-xs text-slate-400">742</p>
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
                    <Button variant="outline">
                      <Trash size={18} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="mb-1">Delete this post</p>
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

export default ProfileCard;
