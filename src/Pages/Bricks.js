import Layout from "../Components/Layout"
import { useState,useEffect } from "react"
import CustomBrick from "../Components/CustomBrick"
import CustomCube from "../Components/CustomCube"
import Button from "../UI/Button"
import styles from "../styles/BrickPage.module.css";
const Bricks = () => {
  const [text,setText]=useState("text")
  const [brickshow, setbrickshow] = useState(true)
  let cube1 = JSON.parse(localStorage.getItem('cube1'))
  let cube2 = JSON.parse(localStorage.getItem('cube2'))
  let cube3 = JSON.parse(localStorage.getItem('cube3'))
  let cube4 = JSON.parse(localStorage.getItem('cube4'))
  let cube5 = JSON.parse(localStorage.getItem('cube5'))
  let storedtext = JSON.parse(localStorage.getItem('text'))
  let brick1 = JSON.parse(localStorage.getItem('brick1'))
  let brick2 = JSON.parse(localStorage.getItem('brick2'))
  let brick3 = JSON.parse(localStorage.getItem('brick3'))
  let brick4 = JSON.parse(localStorage.getItem('brick4'))
  let brick5 = JSON.parse(localStorage.getItem('brick5'))
  let changehandler = ()=>{
    setbrickshow(!brickshow)
  }
    useEffect(() => {
      storedtext? setText(storedtext): setText("enter text here")
    
    }, [storedtext])
    
  let restartHandler = ()=>{
    localStorage.removeItem('cube1')
    localStorage.removeItem('cube2')
    localStorage.removeItem('cube3')
    localStorage.removeItem('cube4')
    localStorage.removeItem('cube5')
    localStorage.removeItem('brick1')
    localStorage.removeItem('brick2')
    localStorage.removeItem('brick3')
    localStorage.removeItem('brick4')
    localStorage.removeItem('brick5')
    window.location.reload(false);
  }
  return (
    <Layout>
      <div className={styles.page}>
        { brickshow ?
        <CustomBrick
        img1={brick1? brick1: ""}
        img2={brick2? brick2: ""}
        img3={brick3? brick3: ""}
        img4={brick4? brick4: ""}
        img5={brick5? brick5: ""}
        text={text}
        />
          :               
         <CustomCube
        img1={cube1? cube1: ""}
        img2={cube2? cube2: ""}
        img3={cube3? cube3: ""}
        img4={cube4? cube4: ""}
        img5={cube5? cube5: ""}
        text={text}
         />}
         <div className={styles.content}>
         <div className={styles.button}>
    {!brickshow ? <Button onClick={changehandler}> Change to Brick </Button> : <Button onClick={changehandler}> Change to Cube</Button>}
          <Button onClick={restartHandler}> Restart</Button>
         </div>
         <div>
         <input  value={text} onChange= 
         { e => {setText(e.target.value)
          
            }} />
           <Button onClick={()=>localStorage.setItem('text', JSON.stringify(text))}>Save</Button>

         </div>
         </div>
      </div>
    </Layout>
  )
}

export default Bricks