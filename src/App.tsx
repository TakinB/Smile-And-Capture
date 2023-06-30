import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Camera from "./components/camera";
import { loadModels } from "./components/faceapi";

loadModels();

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
      <h1 className="text-info">Say cheese!</h1>
      <Camera />
      </div>
      
    </>
  )
}

export default App
