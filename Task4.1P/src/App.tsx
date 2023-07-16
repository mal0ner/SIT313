// import { useState } from 'react';
import './App.css';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProfileCard from '@/components/ProfileCard';
// import Avatar from 'boring-avatars';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Hero></Hero>
      <ProfileCard></ProfileCard>
    </>
  );
}

export default App;
