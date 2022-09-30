import React from 'react'
import Layout from '../Components/Layout'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, signInWithGoogle,registerWithEmailAndPassword, logout } from "../firebase-config";
const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <Layout>
      <button onClick={logout}>Log Out</button>

    </Layout>
  )
}

export default Profile