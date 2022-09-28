import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../Components/Layout";
import Card from "../UI/Card";
import Button from "../UI/Button";
import styles from "../styles/Checkout.module.css";
import { increaseQ,decreaseQ, getTotals, removeFromCart } from "../redux/slices/cartslice";
const Checkout = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getTotals());
    console.log(cart.cartTotalAmount)
  }, [cart, dispatch]);



  return (
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
                    <Button onClick={()=>{
                      dispatch(decreaseQ(cartItem))
                    }}  >-</Button>
                    <p>{cartItem.quantity}</p>
                    <Button onClick={()=>{
                        dispatch(increaseQ(cartItem));
                    }}
                    >+</Button>
                    </div>
                    <Button onClick={()=>{
                        dispatch(removeFromCart(cartItem));
                    }}>Remove Item</Button>
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
          <p className={styles.checkoutText}>* Taxes and Shipping calculated at Checkout</p>
          <Button>Checkout</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
