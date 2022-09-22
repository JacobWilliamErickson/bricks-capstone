import React from "react";
import { useState, useEffect} from "react";
import styles from "../styles/CustomCube.module.css";
import EditModal from "./EditModal";
const CustomCube = ({ img1, img2, img3, img4, img5, text }) => {
  const [Face, setFace] = useState("");
  const [Front, setFront] = useState(img1);
  const [Top, setTop] = useState(img2);
  const [Left, setLeft] = useState(img3);
  const [Right, setRight] = useState(img4);
  const [Back, setBack] = useState(img5);
  const[alt,setAlt]=useState(null)
  const handleDoubleClick = (e) => {
    setFace(e.target.src);
    setAlt(e.target.alt)
  };
  const onOkay = () => {
    setFace(null);
  };
  const setImg = (src) => {
    if (alt=='front'){
      setFront(src);
      localStorage.setItem('cube1', JSON.stringify(src));
    }
    else if (alt==='top'){
      setTop(src);
      localStorage.setItem('cube2', JSON.stringify(src));
    }
    else if (alt==='left'){
      setLeft(src);
      localStorage.setItem('cube3', JSON.stringify(src));
    }
    else if (alt==='right'){
      setRight(src);
      localStorage.setItem('cube4', JSON.stringify(src));
    }
    else if (alt==='back'){
      setBack(src);
      localStorage.setItem('cube5', JSON.stringify(src));
    }

    setFace(null)
  };

  return (
    <div className={styles.both}>
      {Face && <EditModal 
      onOkay={onOkay} 
      message={Face}
      setImg={setImg} 
      alt={alt}
      isBrick={false}/>}



      <input type="radio" id={styles["radio-left"]} name="select-face" />
      <input type="radio" id={styles["radio-back"]} name="select-face" />
      <input type="radio" id={styles["radio-right"]} name="select-face" />
      <input type="radio" id={styles["radio-front"]} name="select-face" />
      <input type="radio" id={styles["radio-top"]} name="select-face" />
      <input type="radio" id={styles["radio-bottom"]} name="select-face" />
      <input type="radio" id={styles["radio-default"]} name="select-face" />
      
      <div className="separator"></div>

      <div className={styles.space3d}>
        <div className={styles._3dbox}>
          <img
            src={`${Front}`}
            alt="front"
            value="front"
            className={`${styles.front} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          />
          <img
            src={`${Top}`}
            alt="top"
            value="Top"
            className={`${styles.top} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          ></img>

          <h2 className={`${styles.bottom} ${styles.threedface} ${styles.text}`}>{text}</h2>
          <img
            src={`${Left}`}
            alt="left"
            value="Left"
            className={`${styles.left} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          ></img>
          <img
            src={`${Right}`}
            alt="right"
            value="Right"
            className={`${styles.right} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          ></img>
          <img
            src={`${Back}`}
            alt="back"
            value="Back"
            className={`${styles.back} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default CustomCube;
