import React from "react";
import DomToImage from "dom-to-image";
import { useState} from "react";
import styles from "../styles/CustomBrick.module.css";
import EditModal from "./EditModal";

const CustomBrick = ({ img1, img2, img3, img4, img5, img6, setFront, setTop, setLeft, setRight, setBack, setBottom}) => {
  const [Face, setFace] = useState("");
  const[alt,setAlt]=useState(null)




  const handleDoubleClick = (e) => {
    setFace(e.target.src);
    setAlt(e.target.alt)
  };


  const onOkay = () => {
    setFace(null);
  };
  const setImg = (src) => {
    if (alt==='front'){
      setFront(src);
      localStorage.setItem('face1', JSON.stringify(src));
    }
    else if (alt==='top'){
      setTop(src);
      localStorage.setItem('face2', JSON.stringify(src));
    }
    else if (alt==='left'){
      setLeft(src);
      localStorage.setItem('face3', JSON.stringify(src));
    }
    else if (alt==='right'){
      setRight(src);
      localStorage.setItem('face4', JSON.stringify(src));
    }
    else if (alt==='back'){
      setBack(src);
      localStorage.setItem('face5', JSON.stringify(src));
    }
    else if (alt==='bottom'){
      setBottom(src);
      localStorage.setItem('face6', JSON.stringify(src));
    }

    setFace(null)
  };

  return (
    <div className={styles.both} >
      {Face && <EditModal 
      onOkay={onOkay} 
      message={Face}
      setImg={setImg} 
      alt={alt}
      isBrick={true}/>}



      <input type="radio" id={styles["radio-left"]} name="select-face" />
      <input type="radio" id={styles["radio-back"]} name="select-face" />
      <input type="radio" id={styles["radio-right"]} name="select-face" />
      <input type="radio" id={styles["radio-front"]} name="select-face" />
      <input type="radio" id={styles["radio-top"]} name="select-face" />
      <input type="radio" id={styles["radio-default"]} name="select-face" />
      <input type="radio" id={styles["radio-bottom"]} name="select-face" />
      <div className="separator"> </div>
      <div className={styles.space3d}>
        <div className={styles._3dbox}>
          <img
            src={`${img1}`}
            alt="front"
            value="front"
            className={`${styles.front} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          />
          <img
            src={`${img2}`}
            alt="top"
            value="Top"
            className={`${styles.top} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          ></img>

           <img
            src={`${img6}`}
            alt="bottom"
            value="Bottom"
            className={`${styles.bottom} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          ></img>
          <img
            src={`${img3}`}
            alt="left"
            value="Left"
            className={`${styles.left} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          ></img>
          <img
            src={`${img4}`}
            alt="right"
            value="Right"
            className={`${styles.right} ${styles.threedface}`}
            onDoubleClick={handleDoubleClick}
          ></img>
          <img
            src={`${img5}`}
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

export default CustomBrick;
