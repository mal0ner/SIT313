import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

function TermsPage() {
  const { pathname } = useLocation();

  //scroll to top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex text-xs text-slate-500 sm:text-sm md:text-md lg:text-lg flex-col gap-6 p-10 items-center justify-center text-justify">
      <Alert className="max-w-prose">
        <AlertTriangle size={20} />
        <AlertTitle>Heads Up!</AlertTitle>
        <AlertDescription>
          This page is for demonstration purposes only, and does not reflect the
          views or policies of a real business or entity.
        </AlertDescription>
      </Alert>
      <div className="flex flex-col gap-6 max-w-prose items-center justify-center">
        <h1 className="text-black text-2xl font-bold">Terms of Service</h1>
        <section className="flex flex-col gap-3 w-full">
          <p>
            Acceptance of Terms By accessing or using DevLink Marketplace , all
            users, including freelance developers and potential employers agree
            to be bound by these Terms of Service. These terms constitute a
            legally binding agreement between DevLink Marketplace and its users.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Eligibility</h2>
          <p>
            Users must be at least 18 years old and legally capable of forming a
            binding contract to use the Platform. DevLink Marketplace reserves
            the right to deny service, terminate accounts, or remove content in
            its sole discretion if any user is found to violate the eligibility
            criteria.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Accout Registration</h2>
          <p>
            Users must create an account to access certain features of the
            Platform. During registration, users must provide accurate and
            complete information and promptly update any changes. Users are
            responsible for maintaining the confidentiality of their account
            credentials and for all activities that occur under their account.
            Any unauthorized use of accounts must be reported immediately to
            DevLink Marketplace.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            User Posts and Content
          </h2>
          <p>
            The Platform allows both Developers and Employers to create posts
            for availability. Users are solely responsible for the content they
            post and must ensure that it complies with all applicable laws,
            regulations, and the terms of this agreement. DevLink Marketplace
            reserves the right to moderate, remove, or suspend any content that
            violates these terms or is deemed inappropriate, offensive, or
            harmful.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Fees and Payment</h2>
          <p>
            DevLink Marketplace may charge fees for the use of certain features
            or services. Any applicable fees and payment terms will be clearly
            communicated to users before they incur charges. All payments must
            be made in accordance with the designated payment methods provided
            on the Platform.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Intellectual Property
          </h2>
          <p>
            Users retain ownership of the content they post on the Platform. By
            posting content, users grant DevLink Marketplace a non-exclusive,
            worldwide, royalty-free license to use, display, reproduce, and
            distribute their content for the purposes of operating and promoting
            the Platform.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Prohibited Conduct</h2>
          <p>Users agree not to engage in any conduct that may: </p>
          <div className="flex flex-col gap-1 text-left">
            <p>
              <span className="font-bold">A. </span>Infringe on the intellectual
              property rights of others
            </p>
            <p>
              <span className="font-bold">B. </span>Violate any applicable laws
              or regulations
            </p>
            <p>
              <span className="font-bold">C. </span>
              Disrupt or interfere with the proper functioning of the Platform
            </p>
            <p>
              <span className="font-bold">D. </span>
              Attempt to gain unauthorized access to any part of the Platform or
              other user accounts
            </p>
            <p>
              <span className="font-bold">E. </span>Engage in fraudulent,
              misleading, or deceptive activities
            </p>
            <p>
              <span className="font-bold">F. </span>Post or promote harmful or
              illegal content.
            </p>
          </div>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Dispute Resolution</h2>
          <p>
            Any disputes arising from or relating to these Terms of Service or
            the use of the Platform shall be resolved through arbitration in
            accordance with the rules of Arby's Corporation. The seat of
            arbitration shall be Melbourne, Victoria, and the language of the
            arbitration shall be English.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">
            Limitation of Liability
          </h2>
          <p>
            DevLink Marketplace shall not be liable for any direct, indirect,
            incidental, special, consequential, or exemplary damages resulting
            from the use or inability to use the Platform, including but not
            limited to loss of profits, data, or goodwill.
          </p>
        </section>
        <section className="flex flex-col gap-3 w-full">
          <h2 className="text-black text-lg font-bold">Amendments to Terms</h2>
          <p>
            DevLink Marketplace reserves the right to update or modify these
            Terms of Service at any time. Users will be notified of any changes,
            and continued use of the Platform after the modifications signify
            acceptance of the updated terms.
          </p>
        </section>
      </div>
    </div>
  );
}

export default TermsPage;
