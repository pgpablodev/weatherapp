import './App.scss';
import { useEffect, useState } from 'react'
import Layout from './components/Layout';

function App() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResizeWindow = () => setWidth(window.innerWidth)        
    window.addEventListener("resize", handleResizeWindow)        
    return () => {
        window.removeEventListener("resize", handleResizeWindow)       
    }
  },[])

  let cadena = `width=${width}, height=device-height, initial-scale=1`

  return(
    <div>
      <meta name="viewport" content={cadena}></meta>
      <Layout />
    </div>    
  );
}

export default App;
