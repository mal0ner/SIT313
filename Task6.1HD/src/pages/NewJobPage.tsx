import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/context/user.context';
import { Loader2, Sparkle } from 'lucide-react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const PUBLIC_KEY =
  'pk_test_51Nup4mJ4LHIpY7ymF0QCaUzcDPOFLXGJMTH4KGnAax6z50tSLT8Hcg4sNogbSp7xGYvR5PnF14d5iMKMwKzgPPZf00WWaUXGoc';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function NewJobPage() {
  const { user, loading, error } = useContext(UserContext);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    fetch('http://localhost:5252/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({}),
    })
      .then(async (res) => {
        const { clientSecret } = await res.json();
        setClientSecret(clientSecret);
      })
      .catch((e) => {
        console.log(e);
      });
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
      <div className="flex flex-col gap-6 m-6 mt-20 mb-20">
        <section className="max-w-prose flex flex-col gap-3">
          <h1 className="text-3xl md:text-5xl font-yeseva">
            Your new hire is just a few clicks away...
          </h1>
          <p>
            Fill out the following form to create a new post on DevLink
            marketplace, and connect directly to developers in minutes.
          </p>
          <div className="w-fit flex gap-1 items-center rounded border border-slate-200 px-4 py-2">
            <b>Hint:</b>
            <Sparkle size={17} color="#fbbf24" /> denotes a <em>premium</em>{' '}
            option
          </div>
        </section>
        <div>
          <div className="flex">
            <NavLink
              to={'/find/freelancers'}
              className={({ isActive }) =>
                isActive
                  ? 'p-2 pr-4 pl-4 rounded-t-md bg-sky-200 font-bold font-josefin'
                  : 'p-2 pr-4 pl-4 rounded-t-md bg-slate-100 font-josefin'
              }
            >
              Freelance
            </NavLink>
            <NavLink
              to={'/find/employees'}
              className={({ isActive }) =>
                isActive
                  ? 'p-2 pr-4 pl-4 rounded-t-md bg-sky-200 font-bold font-josefin flex gap-1 items-center'
                  : 'p-2 pr-4 pl-4 rounded-t-md bg-slate-100 font-josefin flex gap-1 items-center'
              }
            >
              Employment <Sparkle size={17} color="#fbbf24" />
            </NavLink>
          </div>
          <div className="outline outline-sky-200 outline-6 rounded">
            <Elements stripe={stripeTestPromise} options={{ clientSecret }}>
              <Outlet />
            </Elements>
          </div>
        </div>
      </div>
    );
  }
  return <Navigate to={'/login'} />;
}

export default NewJobPage;
