import React from 'react'
import { useNavigate } from 'react-router'
import boxbr from "../../Assets/Boxbreathing/boxbr.png";
import "./Boxbreathing.css";
import closebtn from "../../Assets/Dashboard/Closebtn.png"



const Boxbreathing = () => {
  const Navigate = useNavigate();
  const handleBoxBreathing=()=>{
    Navigate("/extwo")
  }
  return (
    <>
   
    <div className='boxbreathing' >
        <div className='boxbrcontent spaceAroundAlign'>
            <div className='closebtn'><div className="close" onClick={()=>(Navigate("/dashboard"))}><img src={closebtn}/></div></div>
            <div className='prompts'>Box Breathing</div>
            <div className='boxbrgif'><img src={boxbr}/></div>
            <div className='boxbrtext'>
                Box breathing can help you block out the noise and refocus your attention if you're feeling overwhelmed. This easy breathing method also works as a stress reliever.              
            <br/>
            <br/>
The goal is to take deep breaths, hold them, and then exhale for four counts. Consistent and regular breathing gives a message to your brain to relax and calm down.
           </div>  
           <div className='boxstart' onClick={handleBoxBreathing}><div className='box-start-text'>Start</div></div>          
        </div>
    </div>
    </>
  )
}

export default Boxbreathing