import React from "react";
import { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import Card from "../UI/Card";
import { toast } from "react-toastify";
import { db } from "../firebase-config";
import { Link } from "react-router-dom";
import styles from "../styles/Profile.module.css"
import Button from "../UI/Button";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  auth,
  logout,
} from "../firebase-config";
const Profile = () => {
  const [orders,setOrders]= useState([])
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user] = useAuthState(auth);

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("success")
      toast.success("Succesful Login! Welcome!",{position: "bottom-center", autoClose:1000})
      localStorage.setItem('email',JSON.stringify(email));
    } catch (err) {
      console.error(err);
      toast.error(err.message,{position: "top-center", autoClose:1000})
    }
  };
  const LoginHandler = async () =>{
    logInWithEmailAndPassword(email, password)
  }



  const getOrders = async () => {
    const q = query(
      collection(db, "orders"),
      where("user", "==", `${user.uid}`)
    );


    const querySnapshot = await getDocs(q);
    const results = []
    querySnapshot.forEach((doc) => {
      let order = doc.data()
      console.log(order)
      results.push(order)
    });
    console.log(results)
    setOrders([...results])
  };

  useEffect(() => {
    if(user){
      getOrders()
    }
    else{setOrders(null)}
  }, [user]);
  useEffect(() => {
    getOrders()
  }, []);
  
  console.log(orders)


  
  return (
    <Layout>
      { user ? (
      <div className={styles.cardContainer}>
                  <h1>My Orders</h1>
      { orders && orders.map((orderItem) => (
        <Card className={styles.card}>
        <div>Name on Order: {orderItem.address.name}</div>
        <div>Date Ordered: {orderItem.date}</div>
        <div>Total Items Ordered: {orderItem.cart.cartTotalQuantity}</div>
        <div>Order Total: ${orderItem.cart.cartTotalAmount}.00</div>
        <div>Address: {orderItem.address.line1} {orderItem.address.line2} {orderItem.address.city}{orderItem.address.state} {orderItem.address.zip}</div>
        <div>Processed: {orderItem.paymentConfirmed.toString()}</div>
        </Card>
      ))}
      <button onClick={logout}>Log Out</button>
      </div>
      
      ):(<div className={styles.login}>

         <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <Button
          onClick={LoginHandler }
        >
          Login
        </Button>
        <div>
          <Link to="/reset">Forgot Password</Link>
        </div>

      </div>)}

    </Layout>
  );
};

export default Profile;
