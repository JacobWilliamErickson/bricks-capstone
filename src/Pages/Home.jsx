import React from 'react'
import Layout from '../Components/Layout'
import Brick from '../Components/Brick'
import styles from "../styles/Home.module.css";
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <Layout>     
   <div className={styles.main}>
       <Brick 
    img1="/image3.JPG"
    img2="/image1.JPG"
    img3="/image2.JPG"
    />
    <hr />
        <div className={styles.card}>
          <div>
            <h3>The Bricks and Cubes</h3>
          <p> The Bricks (3 inches by 4 inches) and Cubes (3 inches by 3 inches) are our pride and joy. These foam core blocks are light weight, eyecatching and an awesome way to store your memories. Build a wall as you grow old of life events, vacations and any other images you have.</p>
          <Link to={"/products/bricks"}> Start Designing Now</Link>

          </div>
          <img src="bricksample.jpg" alt="" />
        </div>
    <hr />
    <div className={styles.card}>
          <img src="3-piece-decorative.jpg" alt="" />

          <div className={styles.three}>
            <h3>The Three Piece </h3>
          <p> Coming Soon! Design and Create your own three piece artwork on the light and easy to mount foam core </p>
          </div>
        </div>
    <hr />
    <div className={styles.card}>
    <div>
            <h3>The Classic  </h3>
          <p> Coming Soon! Design and Create your own artwork on the light and easy to mount foam core. Get the look of Canvas at a fraction of the cost  </p>
          </div>
          <img src="figmaCanvass.jpg" alt="" />
          <img src="figmaCanvas.jpg" alt="" />
        </div>
      </div>
    </Layout>
  )
}

export default Home