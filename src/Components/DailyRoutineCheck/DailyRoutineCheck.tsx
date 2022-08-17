import React from 'react';
import closebtn from "../../Assets/Dashboard/Closebtn.png"
import Frame from "../../Assets/DailyRoutine/Frame.png";
import { useNavigate } from 'react-router';


const DailyRoutineCheck = () => {
    const Navigate= useNavigate();
    const handleDailyRoutine =()=>{
        Navigate("/exfour")
    }
  return (
    <>
   <div className='dailyRoutineContent'>
    <div className='bbthree' >
    <div className='dailyRoutineBox'>
        <div className='closebtn'><div className="close" onClick={()=>(Navigate("/dashboard"))}><img src={closebtn}/></div></div>
        <div className='prompts'>Daily Routine Check</div>
        <div className='boxbrgif'><img src={Frame}/></div>
        <div className='boxbrtext'>
        To keep track of your overall health, try including this daily check into your routine. This will assist you in keeping track of your healthy habits, allowing you to maintain a happy and healthy lifestyle.
       </div>  
       <div className='boxstart' onClick={handleDailyRoutine}><div className='box-start-text'>Start</div></div>          
    </div>
</div>
</div>
</>
  )
}

export default DailyRoutineCheck