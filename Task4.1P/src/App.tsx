// import { useState } from 'react';
import './App.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Showcase from '@/components/Showcase';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';

function App() {
  return (
    <>
      <Navbar></Navbar>
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
      <Footer></Footer>
    </>
  );
}

export default App;
