import React from 'react'
import Layout from '../Components/Layout'
import Brick from '../Components/Brick'
import Card from '../UI/Card'
import styles from "../styles/Home.module.css";
const Home = () => {
  return (
    <Layout>     
   <div className={styles.main}>
       <Brick 
    img1="/image3.JPG"
    img2="/image1.JPG"
    img3="/image2.JPG"
    img4="/image5right.JPG"
    img5="/image4.JPG"
    text="Family Trip 2020"
    />
    <hr />
        <div className={styles.card}>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <img src="brick-wall.png" alt="" />
        </div>
    <hr />
    <div className={styles.card}>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <img src="brick-wall.png" alt="" />
        </div>
    <hr />
    <div className={styles.card}>
          <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
          <img src="brick-wall.png" alt="" />
        </div>
      </div>
    </Layout>
  )
}

export default Home