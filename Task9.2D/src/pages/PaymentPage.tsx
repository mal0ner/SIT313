import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Payment from '@/components/Payment';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '@/context/user.context';
import { Loader2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const PUBLIC_KEY =
  'pk_test_51Nup4mJ4LHIpY7ymF0QCaUzcDPOFLXGJMTH4KGnAax6z50tSLT8Hcg4sNogbSp7xGYvR5PnF14d5iMKMwKzgPPZf00WWaUXGoc';

const stripeTestPromise = loadStripe(PUBLIC_KEY);

export default function PaymentPage() {
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
      <div className="grid place-items-center py-20">
        {!clientSecret && (
          <div className="p-10 gap-6 w-full flex flex-col items-center justify-center">
            Loading Secure Payment Service...{' '}
            <Loader2 className="animate-spin" />
          </div>
        )}
        {clientSecret && (
          <Elements stripe={stripeTestPromise} options={{ clientSecret }}>
            <Payment />
          </Elements>
        )}
      </div>
    );
  }
  return <Navigate to={'/login'} />;
}
