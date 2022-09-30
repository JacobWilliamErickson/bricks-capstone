import React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector, useDispatch } from "react-redux";
import { db } from "../firebase-config";
import Layout from "../Components/Layout";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "../styles/Checkout.module.css";
import { createCheckoutSession } from "@stripe/firestore-stripe-payments";
import { getStripePayments } from "@stripe/firestore-stripe-payments";
import { getProducts } from "@stripe/firestore-stripe-payments";
import { getApp } from "@firebase/app";
import { auth } from "../firebase-config";
import {
  increaseQ,
  decreaseQ,
  getTotals,
  removeFromCart,
} from "../redux/slices/cartslice";
import LoginModal from "../Components/LoginModal";





const Checkout = () => {
  const [user, loading, error] = useAuthState(auth);
  const [needslogin,setNeedslogin] = useState(false)
  const app = getApp();
  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "customers",
  });
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const cart = useSelector((state) => state.cart);
  const Ordersref = collection(db, "products");
  const stripe = require;








  
  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(Ordersref);
      // console.log(data);
    };
    getOrders();
  }, []);

  useEffect(() => {
    dispatch(getTotals());
    console.log(cart.cartTotalAmount);
  }, [cart, dispatch]);
  const LoginHandler = ()=> {
    setNeedslogin(false)
  }
  const onCheckout = async () =>{
    if (user){
      console.log('firing')
      const session = await createCheckoutSession(payments, {
        line_items: [
          { price: "price_1LnObAAV5tKMOK6lQBYw14Po" },
          { price: "price_1Ln9aVAV5tKMOK6lKFVsKx3Y" },
        ],
      });
      window.location.assign(session.url);

    }
    else {
      setNeedslogin(true)
    }
      };


  return (
    <div>
    {needslogin && <LoginModal closelogin={LoginHandler}/>}
    <Layout>
      <div className={styles.main}>
        <div className={styles.gen}>
          <div className={styles.card}>
            <h1>Cart</h1>

            {cart.cartItems.map((cartItem) => (
              <div className={styles.gen}>
                <Card className={styles.personalcard}>
                  <div className={styles.photocontainer}>
                    <div className={styles.photos}>
                      <img src={cartItem.front}></img>
                      <img src={cartItem.top}></img>
                      <img src={cartItem.left}></img>
                    </div>
                    <div className={styles.photos}>
                      <img src={cartItem.right}></img>
                      <img src={cartItem.back}></img>
                      <img src={cartItem.bottom}></img>
                    </div>
                  </div>
                  <div className={styles.cardContent}>
                    <p>Item: {cartItem.type}</p>
                    <p>${cartItem.price}.00 USD</p>
                    <div className={styles.buttoncontainer}>
                      <Button
                        onClick={() => {
                          dispatch(decreaseQ(cartItem));
                        }}
                        >
                        -
                      </Button>
                      <p>{cartItem.quantity}</p>
                      <Button
                        onClick={() => {
                          dispatch(increaseQ(cartItem));
                        }}
                        >
                        +
                      </Button>
                    </div>
                    <Button
                      onClick={() => {
                        dispatch(removeFromCart(cartItem));
                      }}
                      >
                      Remove Item
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.summary}>
          <h3>Summary</h3>
          <div className={styles.titlesNumbers}>
            <div className={styles.titles}>
              <h4>Total Items: </h4>
              <h4>Subtotal:</h4>
            </div>
            <div className={styles.numbers}>
              <h4>{cart.cartTotalQuantity}</h4>
              <h4>${cart.cartTotalAmount}.00</h4>
            </div>
          </div>
          <p className={styles.checkoutText}>
            * Taxes and Shipping calculated at Checkout
          </p>
          <Button onClick={onCheckout}>Checkout</Button>
        </div>
      </div>
    </Layout>
            </div>
  );
};

export default Checkout;
