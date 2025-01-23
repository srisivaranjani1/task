import React from 'react';
import { useRef } from 'react';


function App() {
     const ref=useRef(0);
     const videoplay=()=> {
 if(ref.current.paused){
  ref.current.play();
 }
     };
     const videopause=()=>{
      if(ref.current.played){
        ref.current.paused();
      }
     };

  return (
    <div className='mama'>
      <h1>USREF EXAMPLE</h1>
      <video ref ={ref} src="https://www.w3schools.com/html/mov_bbb.mp4" type = "video/mp4">VIDEO SONG</video>
      <div>
   <button className='new' onClick={videopause}>pause</button>
   <button className='new1' onClick={videoplay}>play</button>
    </div>
    </div>
    
  )
}

export default App
