import { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { detectFaces, drawResults } from "./faceapi.tsx";
import "./camera.css";
import PhotoGallery from "./gallery";

const Camera = () => {
  const FACE_DELAY_TIME = 500;
  const TRIGGER_EXPRESSION = "happy";
  
  const cameraRef = useRef<Webcam>();
  const cameraCanvasRef = useRef<HTMLCanvasElement>();

  const [photos, setPhotos] = useState([] as any);
  const [expression, setExpression] = useState("");

  
  const getExpressions = async () => {
    let faces: any = [];
    if (cameraRef.current) {
      faces = await detectFaces(cameraRef.current.video);
      await drawResults(
        cameraRef.current.video,
        cameraCanvasRef.current,
        faces
      );

      if (faces.length > 0) {
        const expressions = faces[0].expressions.asSortedArray();
        setExpression(expressions[0].expression);
      }
    }
  };

  useEffect(() => {
    if (cameraRef) {
      const faceInterval = setInterval(async () => {
        await getExpressions();
      }, FACE_DELAY_TIME);
      return () => {
        // cancel the timer when done
        clearInterval(faceInterval);
        // TODO: clear canvas?
      };
    } else {
      // TODO: clear canvas?
      return;
    }
  }, []);

  useEffect(() => {
    if (expression === TRIGGER_EXPRESSION) {
      capture();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expression]);

  const capture = () => {
    if (cameraRef) {
      setPhotos([cameraRef.current.getScreenshot(), ...photos]);
    }

  };

  return (
    <>
      <div className="camera">
        <div className="camera__wrapper">
          <Webcam audio={false} ref={cameraRef} width="100%" height="auto" />
          <canvas className="webcam-overlay" ref={cameraCanvasRef} />
        </div>
        <p>You're looking {expression}
          {
            expression === TRIGGER_EXPRESSION
              ? <span>! Photo captured!</span>
              : "."
          }
        </p>
        
        <button className='btn btn-primary' onClick={capture}>Capture photo</button>
      </div>
    
      {photos.length > 0 && <PhotoGallery photos={photos} />}
    </>
  );
};
export default Camera;
