// import { useState } from 'react';
import './App.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
// import ProfileCard from '@/components/ProfileCard';
import Showcase from '@/components/Showcase';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <Showcase
        type="developer"
        title="Featured Freelancers"
        numProfiles={2}
      ></Showcase>
      <Showcase
        type="customer"
        title="Featured Customers"
        numProfiles={2}
      ></Showcase>
    </>
  );
}

export default App;
