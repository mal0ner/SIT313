import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

function PrivacyPage() {
  const { pathname } = useLocation();

  //scroll to top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col gap-6 p-10 w-full items-center justify-center text-xs text-slate-500 sm:text-sm md:text-md lg:text-lg text-justify">
      <Alert className="max-w-prose">
        <AlertTriangle size={20} />
        <AlertTitle>Heads Up!</AlertTitle>
        <AlertDescription>
          This page is for demonstration purposes only, and does not reflect the
          views or policies of a real business or entity.
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-6 max-w-prose items-center justify-center">
        <h1 className="text-black text-2xl font-bold">Privacy Policy</h1>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Information Collection and Use
          </h2>
          <p>
            DevLink Marketplace may collect and process the following types of
            personal information: <br />
            <br />
            a. Account Information: When users create an account, we may collect
            their name, email address, username, and other account-related
            details. <br />
            <br />
            b. Profile Information: Users may provide additional information to
            create a profile, such as a profile picture, skills, work
            experience, and educational background. <br />
            <br />
            c. Posts and Content: Information contained in posts, proposals,
            messages, and other user-generated content may be collected and
            processed. <br />
            <br />
            d. Communication: We may retain records of communication between
            users and the Platform for support and reference purposes. <br />
            <br />
            e. Usage Data: DevLink Marketplace may collect information about
            users' interactions with the Platform, such as IP addresses, device
            information, and browsing activity.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Information Processing
          </h2>
          <p>
            DevLink Marketplace may use personal information for the following
            purposes:
            <br />
            <br /> a. Facilitating Connections: We use user information to
            connect Developers with potential Employers based on their posts and
            preferences. <br />
            <br />
            b. Platform Improvement: Personal information helps us improve and
            optimize the Platform, providing a better user experience.
            <br />
            <br /> c. Communication: We may use contact information to
            communicate with users about their accounts, services, updates, and
            promotional offers.
            <br />
            <br /> d. Analytics: Usage data may be used for analytics, research,
            and statistical purposes to enhance our services.
            <br />
            <br /> e. Legal Compliance: We may process personal information to
            comply with legal obligations and resolve disputes.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Data Sharing</h2>
          <p>
            DevLink Marketplace may share personal information with the
            following entities for the purposes outlined in this Privacy Policy:
            <br />
            <br /> a. Users: Information such as usernames and profile details
            may be visible to other users on the Platform.
            <br />
            <br /> b. Service Providers: We may engage third-party service
            providers to assist in Platform operations, such as hosting, payment
            processing, and analytics.
            <br />
            <br /> c. Legal Authorities: We may disclose personal information if
            required by law or in response to valid requests from law
            enforcement agencies.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Security Measures</h2>
          <p>
            DevLink Marketplace takes reasonable measures to protect users'
            personal information from unauthorized access, disclosure,
            alteration, or destruction. However, no method of data transmission
            over the internet or electronic storage is entirely secure, and we
            cannot guarantee absolute security.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Data Retention</h2>
          <p>
            Personal information will be retained for as long as necessary to
            fulfill the purposes outlined in this Privacy Policy, or as required
            by applicable laws and regulations.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            User Choices and Rights
          </h2>
          <p>
            Users may have the following rights concerning their personal
            information:
            <br />
            <br />
            a. Access: Users can request access to the personal information we
            hold about them.
            <br />
            <br />
            b. Correction: If personal information is inaccurate or incomplete,
            users can request corrections.
            <br />
            <br />
            c. Deletion: Users may request the deletion of their personal
            information under certain circumstances.
            <br />
            <br />
            d. Withdraw Consent: Users can withdraw their consent to data
            processing at any time.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Updates to Privacy Policy
          </h2>
          <p>
            DevLink Marketplace may update this Privacy Policy from time to time
            to reflect changes in our practices or for legal reasons. Users will
            be notified of significant changes, and continued use of the
            Platform after modifications signify acceptance of the updated
            policy.
          </p>
        </section>
      </div>
    </div>
  );
}

export default PrivacyPage;
