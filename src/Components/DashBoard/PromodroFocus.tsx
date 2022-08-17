import React, { useEffect, useRef, useState } from 'react';
import promodoro from "../../Assets/Dashboard/promodoro.png";
import startbg from "../../Assets/Dashboard/startbg.png";
import playicon from "../../Assets/Dashboard/playicon.png"
import content from '../../Assets/Content';
import moment from 'moment';
import {GoPlay} from "react-icons/go"
import {RiRestartFill} from "react-icons/ri"
import {ImPause2} from "react-icons/im"

interface Props {
  nosb : number,
  handleNosb : any
}
type scale = {
  rect: string;
  number: number;
} | {
  rect: string;
  number: string;
}
type handleVoidFunction = () => void;
 
const PromodroFocus = ({nosb,handleNosb}:Props) => {

  //The Scales are Set According to the work/shortbreak/longbreak
  const [scale,setScales] = React.useState<scale[]>(content.workscale);

  //State Variable to decide animation is running or not
  const [isOn,setOn] = React.useState<boolean>(false);
  
  //State to change the classname of animation according to the scale in used
  const [type,setType] = React.useState<string>("workingscale")

  //States to Calculate the NUmber of Work/Short Break/Long Break
  const [numberOfWork,setNumberOfWork] = React.useState<number>(0);
  const [numberOfShortBreak,setNumberOfShortBreak] = React.useState<number>(0);
  const [numberOfLongBreak,setNumberOfLongBreak] = React.useState<number>(0);

  //State to change the state of button when clicked
  const [promdorobtn,setPromdoroBtn] = React.useState<string>("workbtn");

  //State to control animation
  const [animation,setAnimation]=React.useState<string>("running");

  //Start time to caluclate the time at that moment 
  const [startTime,setStartTime] = useState(moment());

  //State to Calculate Overall WorkDuration/ShortBreak Duration/Long Break Duration
  const [workduration,setWorkDuration] = React.useState<number>(0);
  const [shortbreakduration,setShortBreakDuration] = React.useState<number>(0);
  const [longbreakduration,setLongBreakDuration] = React.useState<number>(0);
  

  //Handle Functions for work/short break/long break
  const handleWork:handleVoidFunction = ()=>{ 
    setPromdoroBtn("workbtn");
    setOn(false)  
    setScales(content.workscale)  
    setType("workingscale")
  }
  const handleShortBreak:handleVoidFunction = ()=>{ 
    setPromdoroBtn("shortbreakbtn");

    setOn(false)
  
    setScales(content.shortbreakscale);   
    setType("shortbreakscale");
  }
  const handleLongBreak:handleVoidFunction = ()=>{ 
    setPromdoroBtn("longbreakbtn");
    setOn(false)
 
    setScales(content.longbreakscale) 
    setType("longbreakscale");
  }

  //Handle Play Called whenever the Play button is Clicked
  const handlePlay:handleVoidFunction=()=>{ 
    setOn(true);
    setStartTime(moment());
    console.log(moment());

    if(scale == content.workscale){
      handleNumberOfWork();
    }
    else if(scale==content.shortbreakscale){
      handleNumberOfShortBreak();
    }
    else{
      handleNumberOfLongBreak();
    } 
  }

  //Function to increase the Number of work/short break/long break
  const handleNumberOfWork:handleVoidFunction =()=>{
    setNumberOfWork(numberOfWork+1);
  }

  const handleNumberOfShortBreak:handleVoidFunction = ()=>{
    handleNosb();
  }
  const handleNumberOfLongBreak:handleVoidFunction = ()=>{
    setNumberOfLongBreak(numberOfLongBreak+1);
  }  

  //Function called whenever the play or paused button is clicked
  const handleAnimation:handleVoidFunction = ()=>{
    if(animation=="running"){   
      setAnimation("paused");
      if(type=="workingscale"){
        setWorkDuration(time=>time+moment().diff(startTime,'second'))
      }
      else if(type=="shortbreakscale"){
        setShortBreakDuration(time=>time+moment().diff(startTime,'second'))
      }
      else{
        setLongBreakDuration(time=>time+moment().diff(startTime,'second'))
      }
      
      
    }
    else{
      setAnimation("running");
      setStartTime(moment())
    }    
  }

//Function called whenever the animation ends
const handleAnimationEnd =()=>{
  console.log("Animation Ended");
  setOn(false);
 
  if(type=="workingscale"){
    setWorkDuration(time=>time+moment().diff(startTime,'second'))
    
  }
  else if(type=="shortbreakscale"){
    setShortBreakDuration(time=>time+moment().diff(startTime,'second'))
   
  }
  else{
    setLongBreakDuration(time=>time+moment().diff(startTime,'second'))

  }
 
  
  
}


 
  return (
      <>   
        <div className='breakButtons'>
            <div className={promdorobtn=="workbtn"?'workbtn primaryalignbtns activepromdorobtn':'workbtn unactivepromdorobtn primaryalignbtns'}  onClick={handleWork}>Work</div>
            <div className={promdorobtn=="shortbreakbtn"?'shortbreakbtn primaryalignbtns activepromdorobtn':'shortbreakbtn unactivepromdorobtn primaryalignbtns'}   onClick={handleShortBreak}>Short Break</div>
            <div className={promdorobtn=="longbreakbtn"?'longbreakbtn primaryalignbtns activepromdorobtn':'longbreakbtn unactivepromdorobtn primaryalignbtns'}   onClick={handleLongBreak}>Long Break</div>
        </div>      
        <div className='playPausePromdoro'>
        <RiRestartFill onClick={()=>{setOn(false)}} size={20} style={{cursor:"pointer"}}/>  
        {animation=="running"?<ImPause2 onClick={handleAnimation} size={20} style={{cursor:"pointer",marginRight:"0.5rem"}}/>:<GoPlay onClick={handleAnimation} size={20} style={{cursor:"pointer",marginRight:"0.5rem"}}/>}          
        </div>
         
        <div className='promodoroImage'>
              {isOn ? 
                <div className="animationContainer">
                  <img src={promodoro} className="test"/>
                  <div className={type} style={{animationPlayState:animation}} onAnimationEnd={handleAnimationEnd}>
                  {
                  scale.map((i:any)=>(
                    <div className='smallscales'><img src={i.rect}/><div className='timenumber'>{i.number}</div></div>
                  ))
                  }
                  </div> 
                </div>:
                <div className='primaryalign startingPromdoro' style={{width:"100%"}}>
                  <img className="startbg" src={startbg}/>
                  <div className='playicon' onClick={handlePlay}>
                    <img src={playicon}/>
                  </div>
                </div>
              }
        </div>
</>
)}
export default PromodroFocus;