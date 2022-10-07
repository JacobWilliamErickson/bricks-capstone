import React from "react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs,updateDoc,doc } from "firebase/firestore";
import Card from "../UI/Card";
import { toast } from "react-toastify";
import { db } from "../firebase-config";
import styles from "../styles/Profile.module.css";
import Button from "../UI/Button";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase-config";
import Layout from "../Components/Layout";
const Company = () => {
  const [orders, setOrders] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate()
  const processHandler =async (e)=>{
      let order= e.target.value
      const changeRef = doc(db, "orders",`${order}`)
        await updateDoc(changeRef,{paymentConfirmed:true})
        getOrders()
      }

const logoutHandler = ()=>{
  logout()
  navigate("/profile")
}


  const getOrders = async () => {
    const q = await query(collection(db, "orders"));

    const querySnapshot = await getDocs(q);
    const results = [];
    await querySnapshot.forEach(  async (doc) => {
      let order = await  doc.data();
        let secondq = await query(
          collection(db, "customers", `${user.uid}`, "payments"),
          where("metadata.orderNumber", "==", `${order.orderNumber}`)
        );
        const secondqsnapshot = await getDocs(secondq);
        if(secondqsnapshot.docs[0] ){
          order.paymentRecieved=secondqsnapshot.docs[0].data().amount_received
          console.log(secondqsnapshot.docs[0].data().amount_received)
        }
        else{
          console.log(order.orderNumber + 'could not find')
          order.paymentRecieved=0
        }
       console.log(order)
       setOrders([...results,order])
       results.push(order);

    });
   console.log(results);
   return results
  };
  
  useEffect( () => {
      getOrders()
  }, []);
  useEffect(() => {
    getOrders();
  }, [user]);

  console.log(orders);

  return (
    <Layout>
      {user.uid === `${process.env.REACT_APP_USERID}` && (
        <div className={styles.cardContainer}>
          <h1>Company Orders</h1>
          {orders &&
            orders.map((orderItem) => (
              <Card className={styles.card}>
                <div>OrderNumber: {orderItem.orderNumber}</div>
                <div>UserId: {orderItem.user}</div>
                <div>Name on Order: {orderItem.address.name}</div>
                <div>Date Ordered: {orderItem.date}</div>
                <div>
                  Total Items Ordered: {orderItem.cart.cartTotalQuantity}
                </div>
                {orderItem.cart.cartItems.map((cartItem)=>(
                  <div>
                <div> Item {cartItem.id}:</div>
                <div>-Quantity: {cartItem.quantity}</div>
                <div>-Type: {cartItem.type}</div>
                
                <div className={styles.links}>-
                <a href={cartItem.front} target="_blank">Front</a>
                <a href={cartItem.left} target="_blank">Left</a>
                <a href={cartItem.back} target="_blank">Back</a>
                </div>
                  <div className={styles.links}>-
                <a href={cartItem.right} target="_blank">Right</a>
                <a href={cartItem.top} target="_blank">Top</a>
                <a href={cartItem.bottom} target="_blank">Bottom</a>
                  </div>
                  </div>
                
                
                
                ))}
                <div>Order Total: ${orderItem.cart.cartTotalAmount}.00</div>
                <div>
                  Address: {orderItem.address.line1} {orderItem.address.line2}{" "}
                  {orderItem.address.city} 
                   {orderItem.address.state} {orderItem.address.zip}
                </div>
                <div>Processed: {orderItem.paymentConfirmed.toString()}</div>
                <div>Amount Received: {orderItem.paymentRecieved}</div>
                <button onClick={processHandler}value={orderItem.orderNumber}>Process</button>
              </Card>
            ))}
          <Button onClick={logoutHandler} >Log Out</Button>
        </div>
      )}
    </Layout>
  );
};

export default Company;
