import React from "react";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSelector, useDispatch } from "react-redux";
import { v4 } from "uuid";
import axios from 'axios'
import { db } from "../firebase-config";
import Layout from "../Components/Layout";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "../styles/Checkout.module.css";
import {
  createCheckoutSession,
  paymentintent,
} from "@stripe/firestore-stripe-payments";
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
import { Link } from "react-router-dom";

const Checkout = () => {
  
  const [user, loading, error] = useAuthState(auth);
  const [needslogin, setNeedslogin] = useState(false);
  const app = getApp();
  const payments = getStripePayments(app, {
    productsCollection: "products",
    customersCollection: "customers",
  });


  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [stripeCart, setStripeCart] = useState([]);

  const setCartHandler = () => {
    let priceID;
    let cartObjects = cart.cartItems.map((cartItem) => {
      if (cartItem.type === "brick") {
        priceID = "price_1Ln9aVAV5tKMOK6lKFVsKx3Y";
      } else if (cartItem.type === "cube") {
        priceID = "price_1LnObAAV5tKMOK6lQBYw14Po";
      }
      let cartobject = { price: priceID, quantity: cartItem.quantity };
      return cartobject;
    });

    setStripeCart([...cartObjects]);
  };


  useEffect(() => {
    setCartHandler();
  }, []);

  useEffect(() => {
    setCartHandler();
  }, [cart]);


  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);


  const LoginHandler = () => {
    setNeedslogin(false);
  };

  const orderNum = v4()

  const onCheckout = async () => {
    console.log("firing")
    if (user) {
      await setDoc(doc(db, "orders",`${orderNum}`), {
        paymentConfirmed:false,
        country: "USA",
        cart:cart,
        orderNumber:orderNum
      });
      console.log('got a user')
      const session = await createCheckoutSession(payments, {
        mode: "payment",
        line_items: stripeCart,
      });
      window.location.assign(session.url);
    } else {
      setNeedslogin(true);
    }
  };

  const onCheckout2 = async () => {
    console.log("firing")
      console.log('got a user')
      const session = await createCheckoutSession(payments, {
        collect_shipping_address: true,
        mode: "payment",
        line_items: stripeCart,
        metadata:{orderNumber:orderNum}
      });
      window.location.assign(session.url);
    } 
console.log(cart)
  return (
    <div>
      {needslogin && (
        <LoginModal closelogin={LoginHandler} checkout={onCheckout2} />
      )}
      <Layout>
        <div className={styles.main}>
          <div className={styles.gen}>
            <div className={styles.card}>
              <h1>Cart</h1>
              {!cart.cartItems.length && (
                <div className={styles.empty}>
                  <h3>There are no items in your cart! </h3>
                  <Link to="/">Start Shopping</Link>
                </div>
              )}
              {cart.cartItems.map((cartItem) => (
                <div className={styles.gen}>
                  <Card className={styles.personalcard}>
                    <div className={styles.photocontainer}>
                        <img src={cartItem.preview}></img>
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
