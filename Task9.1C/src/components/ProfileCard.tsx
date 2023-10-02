import Avatar from 'boring-avatars';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface DeveloperProfile {
  avatarOpts: {
    size: number;
  };
  fullName: string;
  language: string;
  description: string;
  rating: number;
}

interface CustomerProfile {
  avatarOpts: {
    size: number;
  };
  fullName: string;
  jobTitle: string;
  company: string;
  aboutMe: string;
}

function ProfileCard(props: CustomerProfile | DeveloperProfile) {
  return (
    <>
      <Card className="flex flex-col p-1 justify-between w-4/5 sm:w-2/5 md:w-1/3 lg:w-1/5 hover:bg-slate-100 hover:drop-shadow-lg hover:cursor-pointer">
        <CardHeader className="items-center p-2 select-none">
          <CardTitle className="text-xs md:text-lg text-center">
            <div className="flex justify-center m-3">
              <Avatar
                size={props.avatarOpts.size}
                name={props.fullName}
                variant="beam"
                colors={['#AFD6D7', '#FE9C3B', '#92A95C', '#D9A884', '#75996C']}
              />
            </div>
            {props.fullName}
          </CardTitle>
          <CardDescription className="text-xs md:text-md text-center">
            {'language' in props && (
              <span>
                {props.language} Developer
                <br />
              </span>
            )}
            {'jobTitle' in props && (
              <span>
                {props.jobTitle}
                <br />
              </span>
            )}
            {'company' in props && (
              <span className="font-bold">
                {props.company}
                <br />
              </span>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center hidden md:block select-none">
          {'description' in props && <div>{props.description}</div>}
          {'aboutMe' in props && <div>{props.aboutMe}</div>}
        </CardContent>
        {'rating' in props && (
          <CardFooter className="justify-center text-xs select-none">
            <p className="bg-green-200 p-2 flex justify-center gap-1 rounded-lg w-11/12">
              <span className="font-bold hidden md:block">Rating: </span>{' '}
              {props.rating} / 5
            </p>
          </CardFooter>
        )}
      </Card>
    </>
  );
}

export default ProfileCard;
