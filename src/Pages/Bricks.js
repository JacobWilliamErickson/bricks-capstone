import Layout from "../Components/Layout";
import Select from "react-select";
import { useState, useEffect, useRef } from "react";
import DomToImage from "dom-to-image";
import CustomBrick from "../Components/CustomBrick";
import CustomCube from "../Components/CustomCube";
import { v4 } from "uuid";
import {toast} from "react-toastify"
import { storage } from "../firebase-config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
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

  function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
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
    localStorage.removeItem("text");
    setFront("/brickstarter.png");
    setBack("/brickstarter.png");
    setRight("/squarestarter.png");
    setLeft("/squarestarter.png");
    setTop("/brickstarter.png");
    setBottom("/brickstarter.png");
  };
  const folder = (v4())
  const uploader = async (face) => {
    const imageRef = ref(storage, `/${folder}/${v4()}`);
    console.log(folder)
    const bytes = dataURLtoFile(face,`${face}`) 
   // const bytes = new File([face], `${face}`, { type: "text/plain" });
    const snapshot = await uploadBytes(imageRef, bytes);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };
  
  let cartHandler = async () => {
    let type;
    let price;
    if (brickshow) {
      type = "brick";
      price = 9;
    } else if (brickshow === false) {
      type = "cube";
      price = 7;
    }
    if (face1 && face2 && face3 && face4 && face5 && face6) {
      toast.info("adding to cart please give one moment to load",{position: "bottom-center", autoClose:5000})
      let front = await uploader(face1);
      let top = await uploader(face2);
      let left = await uploader(face3);
      let right = await uploader(face4);
      let back = await uploader(face5);
      let bottom = await uploader(face6);
      

      const product = {
        folder:folder,
        type: type,
        front: front,
        top: top,
        left: left,
        right: right,
        back: back,
        bottom: bottom,
        price: price,
        quantity: 1,
        id: cart.id,
      };
      console.log("adding");
      dispatch(addToCart(product));
      dispatch(increaseID());
    } else {
      toast.error("The object does not have content for every side. Please double check then add again",{position:"top-center"})
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
