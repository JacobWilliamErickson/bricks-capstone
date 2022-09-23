import Layout from "../Components/Layout"
import Select from "react-select"
import { useState,useEffect } from "react"
import CustomBrick from "../Components/CustomBrick"
import CustomCube from "../Components/CustomCube"
import Button from "../UI/Button"
import styles from "../styles/BrickPage.module.css";
const Bricks = () => {
  const [text,setText]=useState("text")
  const [brickshow, setbrickshow] = useState(true)
  const style1 = {
  };
  const style2 = {
    backgroundColor:'#ECDEC9',
  };
  const style3 = {
    backgroundColor:'#545454',
    color:"whitesmoke",
  };
  const [style, setStyle] = useState(style1)
  const options = [
    { value: style1, label: 'White' },
    { value: style2, label: 'Tan' },
    { value: style3, label: 'Black' },
  ]
  let storedtext = JSON.parse(localStorage.getItem('text'))
  let face1 = JSON.parse(localStorage.getItem('face1'))
  let face2 = JSON.parse(localStorage.getItem('face2'))
  let face3 = JSON.parse(localStorage.getItem('face3'))
  let face4 = JSON.parse(localStorage.getItem('face4'))
  let face5 = JSON.parse(localStorage.getItem('face5'))
  let changehandler = ()=>{
    setbrickshow(!brickshow)
  }
  let selecthandler = (e)=>{
    setStyle(e.value)
    console.log(style)
  }
    useEffect(() => {
      storedtext? setText(storedtext): setText("enter text here")
    
    }, [storedtext])
    
  let restartHandler = ()=>{
    localStorage.removeItem('face1')
    localStorage.removeItem('face2')
    localStorage.removeItem('face3')
    localStorage.removeItem('face4')
    localStorage.removeItem('face5')
    localStorage.removeItem('text')
    window.location.reload(false);
  }
  return (
    <Layout>
      <div className={styles.page}>
        { brickshow ?
        <CustomBrick
        img1={face1? face1: ""}
        img2={face2? face2: ""}
        img3={face3? face3: ""}
        img4={face4? face4: ""}
        img5={face5? face5: ""}
        text={text}
        />
          :               
         <CustomCube
         img1={face1? face1: ""}
         img2={face2? face2: ""}
         img3={face3? face3: ""}
         img4={face4? face4: ""}
         img5={face5? face5: ""}
         text={text}
         style = {style}
         />}
         <div className={styles.content}>
         <div className={styles.button}>
    {!brickshow ? <Button onClick={changehandler}> Change to Brick </Button> : <Button onClick={changehandler}> Change to Cube</Button>}
          <Button onClick={restartHandler}> Restart</Button>
         </div>
         <div className={styles.textBlock}>
          <h3>Text Block</h3>
         <textarea  value={text} onChange= 
         { e => {setText(e.target.value)
          
         }} />
          
           <Button onClick={()=>localStorage.setItem('text', JSON.stringify(text))}>Save</Button>
           <Select options={options} onChange={selecthandler}/> 

         </div>
         </div>
      </div>
    </Layout>
  )
}

export default Bricks