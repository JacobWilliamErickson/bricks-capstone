import Layout from "../Components/Layout";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import DomToImage from "dom-to-image";
import CustomBrick from "../Components/CustomBrick";
import CustomCube from "../Components/CustomCube";
import Button from "../UI/Button";
import styles from "../styles/BrickPage.module.css";


const Bricks = () => {
  
  
  
  
  
  
  const preview = useRef(null);
  const [text, setText] = useState("text");
  const [brickshow, setbrickshow] = useState(true);
  const style1 = {};
  const style2 = {
    backgroundColor: "#ECDEC9",
  };
  const style3 = {
    backgroundColor: "#545454",
    color: "whitesmoke",
  };
  const [style, setStyle] = useState(style1);
  const options = [
    { value: style1, label: "White" },
    { value: style2, label: "Tan" },
    { value: style3, label: "Black" },
  ];
  let storedtext = JSON.parse(localStorage.getItem("text"));
  let face1 = JSON.parse(localStorage.getItem("face1"));
  let face2 = JSON.parse(localStorage.getItem("face2"));
  let face3 = JSON.parse(localStorage.getItem("face3"));
  let face4 = JSON.parse(localStorage.getItem("face4"));
  let face5 = JSON.parse(localStorage.getItem("face5"));
  let face6 = JSON.parse(localStorage.getItem("face6"));

  
  const [Front, setFront] = useState(face1 ? face1 : "");
  const [Top, setTop] = useState(face2 ? face2 : "");
  const [Left, setLeft] = useState(face3 ? face3 : "");
  const [Right, setRight] = useState(face4 ? face4 : "");
  const [Back, setBack] = useState(face5 ? face5 : "");
  const [Bottom, setBottom] = useState(face6 ? face6 : "");

  let changehandler = () => {
    setbrickshow(!brickshow);
  };

  function exportToPng(dom) {
    console.log(dom);
    DomToImage.toPng(dom)
      .then(function (dataUrl) {
        let src = JSON.stringify(dataUrl)
        localStorage.setItem("face6",  JSON.stringify(dataUrl));
        setBottom(dataUrl)
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }

  let selecthandler = (e) => {
    setStyle(e.value);
    console.log(style);
  };
  useEffect(() => {
    storedtext ? setText(storedtext) : setText("enter text here");
  }, [storedtext]);

  let restartHandler = () => {
    localStorage.removeItem("face1");
    localStorage.removeItem("face2");
    localStorage.removeItem("face3");
    localStorage.removeItem("face4");
    localStorage.removeItem("face5");
    localStorage.removeItem("face6");
      setFront(null)
      setBack(null)
      setRight(null)
      setLeft(null)
      setTop(null)
      setBottom(null)
  };
  return (
    <Layout>
      <div className={styles.page}>
        {brickshow ? (
          <CustomBrick
            img1={Front}
            img2={Top}
            img3={Left}
            img4={Right}
            img5={Back}
            img6={Bottom}
            setFront = {setFront}
            setTop = {setTop}
            setLeft = {setLeft}
            setRight = {setRight}
            setBack = {setBack}
            setBottom = {setBottom}
          />
        ) : (
          <CustomCube
          img1={Front}
          img2={Top}
          img3={Left}
          img4={Right}
          img5={Back}
          img6={Bottom}
            setFront = {setFront}
            setTop = {setTop}
            setLeft = {setLeft}
            setRight = {setRight}
            setBack = {setBack}
            setBottom = {setBottom}
          />
        )}
        <div className={styles.content}>
          <div className={styles.button}>
            {!brickshow ? (
              <Button onClick={changehandler}> Change to Brick </Button>
            ) : (
              <Button onClick={changehandler}> Change to Cube</Button>
            )}
            <Button onClick={restartHandler}> Restart</Button>
          </div>
          <div className={styles.textBlock}>
            <div className={styles.textBlockSelect}>
              <p>Text Block</p>
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />

              <Select
                options={options}
                onChange={selecthandler}
                title="theme"
              />
              <Button
                onClick={() => {
                  localStorage.setItem("text", JSON.stringify(text));
                  exportToPng(preview.current);
                }}
              >
                Save
              </Button>
            </div>
            {!brickshow ? (
              <div ref={preview} style={style} className={styles.cubepreview}>
                <p className={`${styles.text}`}>{text}</p>
              </div>
            ) : (
              <div ref={preview} style={style} className={styles.preview}>
                <p className={`${styles.text}`}>{text}</p>{" "}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bricks;
