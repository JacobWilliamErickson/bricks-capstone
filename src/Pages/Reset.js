import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import { auth, sendPasswordReset } from "../firebase-config";
import styles from "../styles/Reset.module.css";
function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    console.log(user)
    if (user) navigate("/profile/checkout");
  }, [user, loading]);
  return (
    <Layout className={styles.reset}>
      <div className={styles.reset__container}>
        <input
          type="text"
          className={styles.reset__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className={styles.reset__button}
          onClick={() => sendPasswordReset(email)}
        >
          Send password reset email
        </button>
      </div>
    </Layout>
  );
}
export default Reset;