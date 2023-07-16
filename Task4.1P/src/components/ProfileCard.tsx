import Avatar from 'boring-avatars';
import { faker } from '@faker-js/faker';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function ProfileCard() {
  const profileName = faker.person.fullName();
  const profilePhrase = faker.hacker.phrase();
  const rating = 4 + faker.number.float({ precision: 0.1 });
  // let ratingStyle =
  //   "inline-block text-lg before:content-['●●●●●'] before:bg-[linear-gradient(90deg,_#000000_" +
  //   rating +
  //   '%,_#9DA3AE_' +
  //   rating +
  //   '%)] before:bg-clip-text before:text-transparent';
  const langs = [
    'Java',
    'C++',
    'Python',
    'Ruby',
    'Go',
    'C#',
    'Haskell',
    'OCaml',
    'Erlang',
    'Elixir',
    'React',
    'Typescript',
    'Angular',
    'Svelte',
    'Fortran',
    'COBOL',
    'Mojo',
    'Rust',
    'Flutter',
    'Zig',
    'Ruby',
    'Django',
    '.NET',
    'Mediocre',
  ];

  return (
    <>
      <Card className="w-[300px] hover:bg-slate-100">
        <CardHeader className="items-center">
          <CardTitle>
            <div className="flex justify-center m-3">
              <Avatar
                size={100}
                name={profileName}
                variant="beam"
                colors={['#AFD6D7', '#FE9C3B', '#92A95C', '#D9A884', '#75996C']}
              />
            </div>
            {profileName}
          </CardTitle>
          <CardDescription>
            {langs[Math.floor(Math.random() * langs.length)]} Developer
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">{profilePhrase}</CardContent>
        <CardFooter className="flex justify-center">
          <p className="mr-3 bg-green-200 p-2 rounded-lg">
            <span className="font-bold">Rating:</span> {rating} / 5
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

export default ProfileCard;
