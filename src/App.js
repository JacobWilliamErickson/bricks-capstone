import { Route, Routes } from 'react-router-dom'
import {ToastContainer} from "react-toastify"
import { useAuthState } from "react-firebase-hooks/auth";
import {auth,} from "./firebase-config";
import Home from './Pages/Home';
import About from './Pages/About';
import Bricks from './Pages/Bricks';
import Profile from './Pages/Profile';
import Checkout from './Pages/Checkout';
import { Link, useNavigate} from 'react-router-dom';
import Company from './Pages/Company';
import Reset from './Pages/Reset';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
function App() {
  let navigate = useNavigate();
  const [user] = useAuthState(auth);
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
      <Route path="/reset" element={<Reset/>}/>
    </Routes>

    </div>
  );
}

export default App;
