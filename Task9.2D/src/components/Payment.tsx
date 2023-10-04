import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();

  async function handlePayment() {
    if (!stripe || !elements) return;
  }
  return (
    <>
      <PaymentElement />
      <Button disabled={true} onClick={handlePayment}>
        Purchase $10
      </Button>
    </>
  );
}
