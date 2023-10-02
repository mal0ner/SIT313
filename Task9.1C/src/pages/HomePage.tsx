import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import Newsletter from '@/components/Newsletter';
import { Separator } from '@/components/ui/separator';

function HomePage() {
  return (
    <>
      <Hero></Hero>

      <Showcase
        type="developer"
        title="Featured Freelancers"
        numProfiles={3}
      ></Showcase>

      <Showcase
        type="customer"
        title="Featured Customers"
        numProfiles={3}
      ></Showcase>

      <Newsletter></Newsletter>

      <Separator className="mb-6 mt-6" />
    </>
  );
}

export default HomePage;
