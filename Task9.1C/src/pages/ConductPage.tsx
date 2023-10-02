import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

function ConductPage() {
  const { pathname } = useLocation();

  //scroll to top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col gap-6 p-10 items-center justify-center text-slate-500 text-xs sm:text-sm md:text-md lg:text-lg text-justify">
      <Alert className="max-w-prose">
        <AlertTriangle size={20} />
        <AlertTitle>Heads Up!</AlertTitle>
        <AlertDescription>
          This page is for demonstration purposes only, and does not reflect the
          views or policies of a real business or entity.
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-6 max-w-prose items-center justify-center">
        <h1 className="text-black text-2xl font-bold">Code of Conduct</h1>
        <section className="flex flex-col gap-3 w-full">
          <p>
            At DevLink Marketplace, we are committed to fostering a positive and
            inclusive environment for all users. Our community is built on
            trust, professionalism, and respect. By using our platform, you
            agree to abide by the following code of conduct:
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Professionalism and Respect
          </h2>
          <ul className="flex flex-col gap-3">
            <li>
              Treat all users with respect, regardless of their background,
              skills, or experience
            </li>
            <li>
              Avoid any form of discrimination, harassment, or offensive
              behavior. This includes but is not limited to discrimination based
              on race, gender, religion, nationality, age, disability, or sexual
              orientation.
            </li>
            <li>
              Maintain a professional and courteous tone in all interactions,
              including messages, posts, and comments.
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Transparency and Accuracy
          </h2>
          <ul className="flex flex-col gap-3">
            <li>
              Provide accurate and truthful information in your posts,
              proposals, and profile.
            </li>
            <li>
              Disclose any conflicts of interest or potential biases that may
              influence your actions on the platform.
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Privacy and Data Protection
          </h2>
          <ul className="flex flex-col gap-3">
            <li>
              Respect the privacy and confidentiality of other users'
              information.
            </li>
            <li>
              Do not share personal or sensitive information without explicit
              consent.
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Intellectual Property
          </h2>
          <ul className="flex flex-col gap-3">
            <li>
              Respect the intellectual property rights of others. Do not use or
              share copyrighted material without permission.
            </li>
            <li>Only post content that you have the legal right to share.</li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Communication</h2>
          <ul className="flex flex-col gap-3">
            <li>
              Respond to messages and inquiries promptly and professionally.
            </li>
            <li>
              If you are unable to fulfill a commitment or project, communicate
              this as soon as possible to the relevant parties.
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Fair Competition</h2>
          <ul className="flex flex-col gap-3">
            <li>
              Do not engage in unfair or deceptive practices to gain an
              advantage over others.
            </li>
            <li>
              Do not engage in spammy or fraudulent activities on the platform.
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Reporting Violations</h2>
          <ul className="flex flex-col gap-3">
            <li>
              If you encounter a violation of this code of conduct, report it to
              DevLink Marketplace immediately.
            </li>
            <li>
              Provide accurate and complete information when reporting an issue.
            </li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Consequences of Violations
          </h2>
          <p>Violations of this code of conduct may result in:</p>
          <ul className="flex flex-col gap-3 list-disc list-inside">
            <li>Warning or suspension of your account.</li>
            <li>Removal of content that violates these guidelines.</li>
            <li>Legal action if violations involve illegal activities.</li>
          </ul>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Continuous Improvement
          </h2>
          <p>
            We are committed to continuously improving our platform and
            community. Your feedback and suggestions for making DevLink
            Marketplace a better place are always welcome. <br />
            <br />
            By using DevLink Marketplace, you agree to adhere to this code of
            conduct. We reserve the right to modify or update these guidelines
            as needed to ensure a safe and productive environment for all users.
            <br />
            <br />
            Thank you for being a part of the DevLink Marketplace community and
            helping us create a respectful and professional online space.
          </p>
        </section>
      </div>
    </div>
  );
}

export default ConductPage;
