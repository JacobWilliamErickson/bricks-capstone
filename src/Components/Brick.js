import React from "react";
import styles from "../styles/Brick.module.css";
const Brick = ({ img1, img2, img3, img4, img5, img6 }) => {
  return (
    <div className={styles.space3d}>
      <div className={styles._3dbox}>
        <img
          src={`${img1}`}
          alt="Front"
          className={`${styles.front} ${styles.threedface}`}
        />
        <img
          src={`${img2}`}
          alt="Top"
          className={`${styles.top} ${styles.threedface}`}
        ></img>
        <img          
         src={`${img6}`}
          alt="Bottom"
         className={`${styles.bottom} ${styles.threedface}`}>
        </img>
        <img
          src={`${img3}`}
          alt="Left"
          className={`${styles.left} ${styles.threedface}`}
        ></img>
        <img
          src={`${img4}`}
          alt="Right"
          className={`${styles.right} ${styles.threedface}`}
        ></img>
        <img
          src={`${img5}`}
          alt="Back"
          className={`${styles.back} ${styles.threedface}`}
        ></img>
      </div>
    </div>
  );
};

export default Brick;
