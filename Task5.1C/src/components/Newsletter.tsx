import { Button } from '@/components/ui/button';

function Newsletter() {
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
          <form
            action="/sign-up"
            method="POST"
            className="flex flex-col justify-between w-full gap-3 h-full"
          >
            <input
              name="email"
              type="email"
              id="email-input"
              className="border p-2 rounded"
              placeholder="Enter your email"
              required
            />
            <Button type="submit" className="w-fit">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

export default Newsletter;
