import Layout from "../Components/Layout";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import DomToImage from "dom-to-image";
import CustomBrick from "../Components/CustomBrick";
import CustomCube from "../Components/CustomCube";
import Button from "../UI/Button";
import styles from "../styles/BrickPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseID } from "../redux/slices/cartslice";
const Bricks = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
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
  
  const [Front, setFront] = useState(face1 ? face1 : "/brickstarter.png");
  const [Top, setTop] = useState(face2 ? face2 : "/brickstarter.png");
  const [Left, setLeft] = useState(face3 ? face3 : "/squarestarter.png");
  const [Right, setRight] = useState(face4 ? face4 : "/squarestarter.png");
  const [Back, setBack] = useState(face5 ? face5 : "/brickstarter.png");
  const [Bottom, setBottom] = useState(face6 ? face6 : "/brickstarter.png");

  let changehandler = () => {
    setbrickshow(!brickshow);
  };

  function exportToPng(dom) {
    console.log(dom);
    DomToImage.toPng(dom)
      .then(function (dataUrl) {
        localStorage.setItem("face6", JSON.stringify(dataUrl));
        setBottom(dataUrl);
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
    setFront("/brickstarter.png");
    setBack("/brickstarter.png");
    setRight("/squarestarter.png");
    setLeft("/squarestarter.png");
    setTop("/brickstarter.png");
    setBottom("/brickstarter.png");
  };
  let cartHandler = () => {
    let type;
    let price;
    if (brickshow) {
      type = "brick";
      price = 5;
    } else if (brickshow === false) {
      type = "cube";
      price = 7;
    }
    if (face1 && face2 && face3 && face4 && face5 && face6) {
      const product = {
        type: type,
        front: face1,
        top: face2,
        left: face3,
        right: face4,
        back: face5,
        bottom: face6,
        price: price,
        quantity: 1,
        id: cart.id,
      };
      console.log("adding");
      dispatch(addToCart(product))
      dispatch(increaseID())
    } else {
      console.log("cube incomplete");
    }
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
            setFront={setFront}
            setTop={setTop}
            setLeft={setLeft}
            setRight={setRight}
            setBack={setBack}
            setBottom={setBottom}
          />
        ) : (
          <CustomCube
            img1={Front}
            img2={Top}
            img3={Left}
            img4={Right}
            img5={Back}
            img6={Bottom}
            setFront={setFront}
            setTop={setTop}
            setLeft={setLeft}
            setRight={setRight}
            setBack={setBack}
            setBottom={setBottom}
          />
        )}
        <div className={styles.content}>
          <div className={styles.button}>
            {!brickshow ? (
              <Button onClick={changehandler}> Change to Brick </Button>
            ) : (
              <Button onClick={changehandler}> Change to Cube</Button>
            )}
            <Button onClick={cartHandler}> Add to Cart</Button>
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
