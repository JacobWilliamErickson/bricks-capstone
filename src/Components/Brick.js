import React from "react";
import styles from "../styles/Brick.module.css";
const Brick = ({ img1, img2, img3}) => {
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
          src={`${img3}`}
          alt="Left"
          className={`${styles.left} ${styles.threedface}`}
        ></img>
      </div>
    </div>
  );
};

export default Brick;
