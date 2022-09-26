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

    <Card className={styles.card}>
        <div>
          <p> Jake</p>
        </div>
    </Card>
    <Card className={styles.card}>
        <div>
          <p> Jake</p>
        </div>
    </Card>
    <Card className={styles.card}>
        <div>
          <p> Jake</p>
        </div>
    </Card>
      </div>
    </Layout>
  )
}

export default Home