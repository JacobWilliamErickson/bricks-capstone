import React from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "../styles/Shipping.module.css";
import {toast} from "react-toastify"
import { db} from "../firebase-config";
import {query,getDocs,collection,where,addDoc}  from "firebase/firestore";
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
import { useEffect, useState,useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth} from "../firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
const ShippingModal = (props) => {
  let Storagename = JSON.parse(localStorage.getItem("name"));
  let StorageEmail = JSON.parse(localStorage.getItem("email"));
  const [email, setEmail] = useState(StorageEmail?StorageEmail:null);
  const [name, setName] = useState(Storagename? Storagename: "");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState(" ");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const address1ref = useRef("")
  const address2ref = useRef(" ")
  const emailref = useRef("")
  const nameref = useRef("")
  const cityref = useRef("")
  const stateref = useRef("")
  const zipref = useRef("")
  const countryref = useRef("")
  const [user, loading, error] = useAuthState(auth);
  

  const toPaymentHandler = () =>{
    if (address1ref&& zipref && nameref && emailref && countryref && cityref && stateref){
      let address = {
        name:nameref.current.value,
        email:emailref.current.value,
        line1:address1ref.current.value,
        line2:address2ref.current.value,
        city:cityref.current.value,
        state:stateref.current.value,
        zip:zipref.current.value,
        country:countryref.current.value
      }
      props.checkout(address)
    }
   else{
    console.log("not firing")
   }
  }
  
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onOkay}>
      </div>
      <Card className={classes.modal}>

      {
       (<div className={classes.register}>
      <div className={classes.register__container}>
        <h4>Personal Details</h4>
        <input
          type="text"
          className={classes.register__textBox}
          ref={nameref}
          placeholder="Full Name"
        />
        <input
          type="text"
          className={classes.register__textBox}
          ref={emailref}
          placeholder="E-mail Address"
        />
        <h4>Shipping Address</h4>
        <input
          type="text"
          className={classes.register__textBox}
          ref={address1ref}
          placeholder="Street Address"
        />
        <input
          type="text"
          className={classes.register__textBox}
          ref={address2ref}
          placeholder="Street Address line 2"
        />
        <div className={classes.address}>
        <input
          type="text"
          className={classes.register__textBox}
          ref={cityref}
          placeholder="City"
        />
        <input
          type="text"
          className={classes.register__textBox}
          ref={stateref}
          placeholder="State"
        />

        </div>
        <div className={classes.address}>
        <input
          type="text"
          className={classes.register__textBox}
          ref={zipref}
          placeholder="Postal / Zip Code"/>
          <input
          type="text"
          className={classes.register__textBox}
          defaultValue={"United States"}
          value={country}
          ref={countryref}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"/>
        </div>
        <button
          className={classes.register__btn}
          onClick={toPaymentHandler}
        >
          Continue to Payment
        </button>
      </div>
    </div>) 
}
      </Card>
    </div>
  );
};
export default ShippingModal
