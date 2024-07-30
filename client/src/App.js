import './App.css';
import { Toaster } from 'react-hot-toast';
import Navbar from './Componants/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './Componants/Footer';

function App() {
  return (
    <div className="App">
      <Toaster position='top-center' />
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default App;
