import React from "react";
import { useState} from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "../styles/WinnerModal.module.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const EditModal = (props) => {
  let r = 4/3
  if(props.alt ==="right"||props.alt==='left'||props.isBrick===false){
    r = 3/3
  }
  const [image, setImage] = useState(props.message);
  const [cropper, setCropper] = useState();

  const onChange = (e) => { 
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      props.setImg(cropper.getCroppedCanvas().toDataURL())
      props.onOkay()
    }
  };
  
  return (
    <div>
      <div className={classes.backdrop} onClick={props.onOkay}></div>
      <Card className={classes.modal}>
        <div className={classes.content}>
        </div>
        <div>
      <div style={{ width: "100%" }}>
        <Cropper
        className={classes.cropper}
          style={{ height: 300, width: 400 }}
          zoomTo={0.5}
          initialAspectRatio={r}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={40}
          minCropBoxWidth={30}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          onInitialized={(instance) => {
            setCropper(instance);
          }}
          guides={true}
        />
      </div>
    </div>
        <footer className={classes.actions}>
          {
            <>
            <input type="file" onChange={onChange} />
              <Button onClick={getCropData}>Okay</Button>
            </>
          }
        </footer>
      </Card>
    </div>
  );
};

export default EditModal;
