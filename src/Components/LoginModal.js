import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "../styles/LoginModal.module.css";

import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";



import "cropperjs/dist/cropper.css";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle,registerWithEmailAndPassword } from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
const LoginModal = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isRegister,setIsRegister]=useState(true)
  
  
  //Login
  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      props.closelogin()
      console.log("success")
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  const LoginHandler = async () =>{
    logInWithEmailAndPassword(email, password)
  }
  
  const signInWithGuest = ()=>{
    logInWithEmailAndPassword('brixandstixthecompany@gmail.com', "guestpassword")
    props.closelogin()
  }
  
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
    if(user){
      props.closelogin()
    }
  };
  const registerSwitchHandler = () =>{
    setIsRegister(!isRegister)
  }


  return (
    <div>
      <div className={classes.backdrop} onClick={props.onOkay}>
      </div>
      <Card className={classes.modal}>

      {
        isRegister? (<div className={classes.register}>
      <div className={classes.register__container}>
        <input
          type="text"
          className={classes.register__textBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={classes.register__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={classes.register__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button className={classes.register__btn} onClick={register}>
          Register
        </Button>
        <Button
          className={classes.register__btn}
          onClick={signInWithGuest}
        >
          Guest Checkout
        </Button>
        <div>
          Already have an account? <button onClick={registerSwitchHandler}>Login</button>
        </div>
      </div>
    </div>) : ( <div className={classes.login}>
      <div className={classes.login__container}>
        <input
          type="text"
          className={classes.login__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className={classes.login__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button
          className={classes.login__btn}
          onClick={LoginHandler }
        >
          Login
        </Button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>
        <div>
          Don't have an account? <button onClick={registerSwitchHandler}>Register</button>
        </div>
      </div>
    </div>)
}
      </Card>
    </div>
  );
};
export default LoginModal
