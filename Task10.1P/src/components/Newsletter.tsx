import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const newsletterSchema = z.object({
  email: z.string().email(),
});

function Newsletter() {
  const [success, setSuccess] = useState<boolean>(false);
  const newsletterForm = useForm<z.infer<typeof newsletterSchema>>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });
  async function handleSubmit(values: z.infer<typeof newsletterSchema>) {
    const response = await fetch('http://localhost:5252/sign-up', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (response.status == 200) {
      setSuccess(true);
    }
  }
  return (
    <>
      <section className="flex flex-col md:flex-row md:justify-evenly gap-10 m-10">
        <div className="flex-[1] md:max-w-sm flex flex-col items-center gap-3">
          <h1 className="text-2xl font-yeseva max-w-sm">
            Want to stay in the Loop? Sign up for our{' '}
            <span className="text-cyan-500 underline">Daily Insider.</span>
          </h1>
          <p className="max-w-sm">
            The DevLink Insider showcases what our expert freelancers have been
            up to in the last 24 hours.
          </p>
        </div>
        <div className="flex flex-col flex-[1] items-center md:max-w-sm">
          {!success && (
            <Form {...newsletterForm}>
              <form
                onSubmit={newsletterForm.handleSubmit(handleSubmit)}
                className="w-full h-full py-2 px-2 sm:px-6 md:px-0 flex flex-col gap-6 justify-between"
              >
                <FormField
                  control={newsletterForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-1">
                      <FormLabel>Email: </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Breezy.puppy@hotmail.co.uk"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="sm:w-3/4 md:w-1/2">
                  Submit
                </Button>
              </form>
            </Form>
          )}
          {success && (
            <p className="text-xl font-bold">🎉 Thank you for subscribing!</p>
          )}
        </div>
      </section>
    </>
  );
}

export default Newsletter;
