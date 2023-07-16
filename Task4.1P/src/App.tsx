// import { useState } from 'react';
import './App.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProfileCard from '@/components/ProfileCard';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <ProfileCard></ProfileCard>
    </>
  );
}

export default App;
