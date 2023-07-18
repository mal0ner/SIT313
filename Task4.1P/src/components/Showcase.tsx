import ProfileCard from '@/components/ProfileCard';
import { Button } from '@/components/ui/button';
import { faker } from '@faker-js/faker';

interface ShowcaseOpts {
  type: 'developer' | 'customer';
  title: string;
  numProfiles: number;
}

interface Developer {
  fullName: string;
  language: string;
  description: string;
  rating: number;
}

interface Customer {
  fullName: string;
  jobTitle: string;
  company: string;
  aboutMe: string;
}

function Showcase(props: ShowcaseOpts) {
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

  const developers: Developer[] = [];
  const customers: Customer[] = [];

  if (props.type == 'customer') {
    for (let i = 0; i < props.numProfiles; i++) {
      const customer: Customer = {
        fullName: faker.person.fullName(),
        jobTitle: faker.person.jobTitle(),
        company: faker.company.name(),
        aboutMe: faker.person.bio(),
      };
      customers.push(customer);
    }
  }

  if (props.type == 'developer') {
    for (let i = 0; i < props.numProfiles; i++) {
      const dev: Developer = {
        fullName: faker.person.fullName(),
        language: langs[Math.floor(Math.random() * langs.length)],
        description: faker.hacker.phrase(),
        rating: 4 + faker.number.float({ precision: 0.1 }),
      };
      developers.push(dev);
    }
  }

  return (
    <>
      <section className="flex flex-col justify-center items-center gap-10 m-10">
        <h1 className="text-2xl font-yeseva">{props.title}</h1>
        <div className="flex flex-col sm:flex-row gap-10 justify-center w-full items-center">
          {props.type == 'developer' &&
            developers.map((dev) => (
              <ProfileCard
                key={dev.fullName}
                fullName={dev.fullName}
                language={dev.language}
                description={dev.description}
                rating={dev.rating}
                avatarOpts={{ size: 60 }}
              ></ProfileCard>
            ))}
          {props.type == 'customer' &&
            customers.map((c) => (
              <ProfileCard
                key={c.fullName}
                fullName={c.fullName}
                jobTitle={c.jobTitle}
                company={c.company}
                aboutMe={c.aboutMe}
                avatarOpts={{ size: 60 }}
              ></ProfileCard>
            ))}
        </div>
        <Button variant="default">
          <a href="#">See More</a>
        </Button>
      </section>
    </>
  );
}

export default Showcase;
