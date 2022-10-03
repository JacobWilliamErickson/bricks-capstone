import React from 'react'
import Layout from "../Components/Layout"
import styles from "../styles/About.module.css";

const About = () => {
  return (
    <Layout>
      <div className={styles.main}>

 <h1> Who We Are</h1>
<div className={styles.who}>
 <img src="image3.JPG" />
 <p>Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing layouts and visual mockups.</p>
</div>
<h3>Our Purpose</h3>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit </p>






      </div>
    </Layout>
  )
}

export default About