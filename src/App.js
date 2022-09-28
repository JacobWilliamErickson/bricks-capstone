import { Route, Routes } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import Home from './Pages/Home';
import About from './Pages/About';
import Bricks from './Pages/Bricks';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import Company from './Pages/Company';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  return (
    <div>
      <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/products/bricks" element={<Bricks/>}/>
      <Route path="/profile/checkout" element={<Checkout/>}/>
      <Route path="/company" element={<Company/>}/>
      <Route path="/profile" element={<Profile/>}/>

    </Routes>

    </div>
  );
}

export default App;
