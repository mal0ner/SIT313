import './App.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    document.title = 'DevLink Marketplace';
  }, []);
  return (
    <>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </>
  );
}

export default App;
