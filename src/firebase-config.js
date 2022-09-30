import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {query,getDocs,collection,where,addDoc}  from "firebase/firestore";
import {toast} from "react-toastify"
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
const { measurementId } = process.env;
const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_APIKEY}`,
  projectId: `${process.env.REACT_APP_PROJECTID}`,
  authDomain: `${process.env.REACT_APP_AUTHDOMAIN}`,
  storageBucket: `${process.env.REACT_APP_STORAGEBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGINGSENDERID}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
// const analytics = getAnalytics(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }

};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
  toast.info("Logged out! Thank you for visiting",{position: "bottom-center", autoClose:1000})
  
};

export {
  auth,
  signInWithGoogle,
  sendPasswordReset,
  logout,
};