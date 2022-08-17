import React, { useEffect, useState } from 'react';
import boxbr from "../../Assets/Boxbreathing/boxbr.png";
import { useNavigate } from 'react-router';
import Modal from 'react-modal';
import Arrow from "../../Assets/onboardingimages/Arrow.png";
import content from '../../Assets/Content';


 type handleDisplaySides =()=> () => void
 type handleVoidFunction = ()=> void

const BoxbreathingExercise = () => {
    const Navigate=useNavigate();

    const [numberOfBreaths,setNumberOfBreaths]=React.useState<number>(0);


   //The State Variables For the Four Sides of Box
    const [isOnTop,setIsOnTop]= React.useState<boolean>(true)
    const [isOnRight,setIsOnRight] = React.useState<boolean>(false);
    const [isOnLeft,setIsOnLeft]= React.useState<boolean>(false);
    const [isOnBottom,setIsOnBottom] = React.useState<boolean>(false);
    
    //State Variables to display the modals

    const [dailyReminderBoxBreathing,setDailyReminderBoxBreathing]=React.useState<boolean>(false);  //For Showing Daily Reminder Modal
    const [feedbackBoxBreathing,setFeedbackBoxBreathing]=React.useState<boolean>(false);            //For Showing Feedback Modal
    const [continueBoxBreathing,setContinueBoxBreathing]=React.useState<boolean>(false);            //For Showing Continue or Stop Modal

    //Function to Increase Breaths
    const handleIncreaseBreaths =()=>{
        console.log("Old Breaths")
        const newBreaths:number = numberOfBreaths+1;
        console.log("New Breaths: ",newBreaths);
        setNumberOfBreaths(prev=>prev+1);
 
    }

    //handle functions for the four sides

    const handleTop:handleDisplaySides = ()=>{
       handleIncreaseBreaths();
       setIsOnTop(true);
       setIsOnLeft(false);
       const timer = setTimeout(()=>{
        handleRight();    
        },4000)
        return ()=>clearTimeout(timer);
    }
    const handleLeft:handleDisplaySides=()=>{
            setIsOnBottom(false);
            setIsOnLeft(true);
            const timer = setTimeout(()=>{
                handleTop();    
            },4000)
            return ()=>clearTimeout(timer);
    }
    const handleBottom:handleDisplaySides =()=>{
            setIsOnBottom(true)
            setIsOnRight(false);
            const timer = setTimeout(()=>{
                handleLeft();
    
            },4000)
            return ()=>clearTimeout(timer);
    }
    const handleRight:handleDisplaySides = ()=>{
            setIsOnTop(false)
            setIsOnRight(true);
            const timer = setTimeout(()=>{
                handleBottom();
    
            },4000)
            return ()=>clearTimeout(timer);
        }

    //Continue Function 
       const handleContinue:handleVoidFunction =()=>{   
        setContinueBoxBreathing(false);
    }

    //Stop Function
    const handleStop:handleVoidFunction =()=>{
        setContinueBoxBreathing(false);
        setFeedbackBoxBreathing(true);       
        console.log("Total Breaths is been Submited")     
    }

    //Reminder Function
    const handleReminder:handleVoidFunction = ()=>{        
        setFeedbackBoxBreathing(false);        
        setDailyReminderBoxBreathing(true);
        console.log("Reminder is been posted");
    }

    //Feel Review Function
    const handleFeelReview:handleVoidFunction=()=>{
        // const response = await postFeeling();
        console.log("Feeling Has been sent");
        
    }

    //handle finish function
    const handleFinish:handleVoidFunction = ()=>{
        setContinueBoxBreathing(true);
    }

    //handle more exercises function
    const handleMoreExercises:handleVoidFunction = ()=>{
        console.log("Getting More Exercises");
        Navigate("/dashboard")
    }


    useEffect(()=>{
        console.log("useeffect")
        const timer =setTimeout(()=>{
            handleRight();
            console.log("making true");            
        },4000)
        return ()=>clearTimeout(timer)
    },[]);

    
  return (
    
      <>    
      <div className='primaryalign' style={{height:"91%"}}>
        <div className='boxBreathingExercise spaceAroundAlign'>
            <div className='holdTopBoxBreathing'>
                <div>Breathe in {isOnTop?<span className='secondscount'>For 4 seconds</span>:<></>}</div>
                <div className='border-top'>{isOnTop ?<div className='borderprogress'></div>:<></>}</div>            
            </div>
            <div className='middleContainerBoxBreathing'>
                <div className='holdLeftBoxBreathing primaryalign'>
                    <div className='hold'>Hold {isOnLeft?<span className='secondscount'>For 4 seconds</span>:<></>}</div>
                    <div className='testing'> {isOnLeft ?<div className='borderprogress'></div>:<></>  }</div>           
                </div>
                <div className='pictureBoxBreathing'><img src={boxbr}/></div>
                <div className='holdright primaryalign'>
                    <div className='hold'>Hold {isOnRight?<span className='secondscount'>For 4 seconds</span>:<></>}</div>
                    <div className='testing'>{isOnRight?<div className='borderprogress'></div>:<></> }</div>
                </div>
            </div>
            <div className='holdTopBoxBreathing boxBreathingBottom'>
                <div>Breathe Out {isOnBottom?<span className='secondscount'>For 4 seconds</span>:<></>}</div>
                <div className='rotated'>{isOnBottom ?<div className='borderprogress'></div>:<></> }</div>           
            </div>
            <div className='boxBreathingFooter'>Number of Breaths : <span className="number">{numberOfBreaths}</span></div>
            <div onClick={handleFinish} className='boxstart'><div className='box-start-text' >Finish</div></div>      
        </div>
        <Modal isOpen={dailyReminderBoxBreathing} style={content.customStylesModal} onRequestClose={()=> setDailyReminderBoxBreathing(false)} ariaHideApp={false}>
            <div className='finishedbreathing'>
                <div className='boxreviewheader'>Daliy Reminder has been set</div>
                <div className='moreexercises' onClick={handleMoreExercises}>Click here for more exercises <img src={Arrow}/></div>
            </div>
        </Modal>
        <Modal isOpen={feedbackBoxBreathing} style={content.customStylesModal} onRequestClose={()=> setFeedbackBoxBreathing(false)} ariaHideApp={false}>
                <div className='finishedbreathing'>
                    <div className='boxreviewheader'>How did you feel after this activity?</div>
                    <div className='emotionsboxbr'>
                        {content.smallIcons.map((icon)=>(<div onClick={handleFeelReview} ><img src={icon} className="selectFeelingBoxBreathing"/></div>))}
                    </div>
                    <div className='boxquestions'>
                        <div className='boxreviewheader'>Would You Like to set a reminder for this activity?</div>
                        <div className='welldoneheader'>Daily at <input type="time" name="time" placeholder="TIME" pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$" className="inputs time" required></input></div>
                        <button onClick={handleReminder} className="plan-button"><div className='plan-button-text'>Set A Reminder</div></button>
                    </div>
                </div>      

        </Modal>
        <Modal isOpen={continueBoxBreathing} style={content.customStylesModal} onRequestClose={()=> setContinueBoxBreathing(false)} ariaHideApp={false}>
        <div className='finishedbreathing'>
                <div className='welldoneheader'>Well Done You Are Doing A Great Job</div>
                    <div className='home-buttons boxbtns'>
                        <button className='plan-button boxbtn' onClick={handleContinue}> <div className='plan-button-text '>Continue</div></button>
                        <button className='plan-button boxbtn' onClick={handleStop}><div className='plan-button-text '>Stop</div></button>
                    </div>
                </div>  
        </Modal>
        </div>
    </>
  )
}

export default BoxbreathingExercise