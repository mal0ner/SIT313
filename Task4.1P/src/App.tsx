import './App.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <>
      <Navbar></Navbar>
      <HomePage />
      <Footer></Footer>
    </>
  );
}

export default App;
