import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from 'react-modal';
import closebtn from "../../Assets/Dashboard/Closebtn.png";
import SelfPromptQuestions from '../SelfCarePrompt/SelfPromptQuestions';
import content from '../../Assets/Content';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


type DailyActivityObject ={
    time : string,
    activity: string,
    isDone : boolean,
    icon : any,
    function : any
}

const DailyActivities = (handleActivities : any) => {
    const Navigate = useNavigate();
   
    //A Variable that Stores all the Self-Care Prompts
    const preQuestions:string[] = content.preQuestions;

    //A State to Control Modal of Self-Care Prompts
    const [findmeaprompt,setfindmeaprompt] = React.useState<boolean>(false);

    //A State to Initilazie Modal of SelfCare
    const [selfcare,setSelfCare] = React.useState<boolean>(false);

    //A State Which Stores all the Random Prompts
    const [randomQuestions,setRandomQuestions]= React.useState<string[]>([]);

    //A State Variable to control the step in daily activities section 
    const [activeStep, setActiveStep] = React.useState<number>(1);
    
     
    //A Function Which Generates all the Random Questions
    const handleRandomQuestions = ()=>{
        let i : number = 0;
        if(randomQuestions.length>=5){
            setRandomQuestions([])
        }
        while (i<5){
            const random: number = Math.floor(Math.random() * 29)
            if(preQuestions[random] in randomQuestions){
                continue;
            }
            else{
                // randomQuestions.push(preQuestions[random]);
                setRandomQuestions(prev=>[...prev,preQuestions[random]])
                i++;
            }
        }
    }
    //A Function Which Closes all the Modals
    const handlePrompt = ()=>{
        setSelfCare(false);
        setfindmeaprompt(false)
    }

    //A Function whicn sets the Self-care Prompt
    const handleSelfCare = ()=>{
        setfindmeaprompt(false);
        setSelfCare(true);
       
    }

    //Functions which is called after find me a prompt Button is Clicked
    const handleFindMePrompt =async()=>{
        handleRandomQuestions();
        setSelfCare(false);  
        setfindmeaprompt(true)      
    }

    //Function to Handle Box-Breathing
    const handleBoxBreathing = async()=>{
        // const response = await getBoxBreathingDetails();       
        Navigate("/boxbreathing")
        console.log("Box-Breathing Exercise Started");
    }

    //Function to Handle Heal Journey
    const handleHealJourney = ()=>{
        Navigate("/healyourself");
    }

    //Function to Handle Daily Routine
    const handleDailyRoutine = ()=>{
        Navigate("/dailyroutinecheck")
    }

    //Variable that Stores the Details of Daily Activities
    const dailyActivities:DailyActivityObject[] =[       
        {
            time : "Morning",
            activity: "Self Care Prompt",
            isDone : false,
            icon : content.DashboardImages.Morning,
            function : handleSelfCare
        },
        
        { 
            time :"Afternoon",
            activity:"Box-Breathing",
            isDone : false,
            icon : content.DashboardImages.Afternoon,
            function : handleBoxBreathing
        },
    
       
        {
            time : "Evening",
            activity : "Heal-Journey",
            isDone:false,
            icon : content.DashboardImages.Evening,
            function : handleHealJourney
        },
       
        {
            time:"Night",
            activity :"Daily Routine Check",
            isDone : false,
            icon : content.DashboardImages.Night,
            function : handleDailyRoutine
        }   
    ];
   
  return (
    <>
    <Modal isOpen={findmeaprompt} style={content.customStylesThree}  onRequestClose={()=> setfindmeaprompt(false)} ariaHideApp={false}>    
             <div className='primaryalign'><SelfPromptQuestions handlePrompt ={handlePrompt} randomQuestions={randomQuestions}/> </div>       
    </Modal>
    <Modal isOpen={selfcare} style={content.customStylesModal} onRequestClose={()=> setSelfCare(false)} ariaHideApp={false}>        
        <div className='sccontent'>
            <div className='closebtn'><div className="closeButton" onClick={()=>setSelfCare(false)}><img src={closebtn}/></div></div>
            <div className='prompts'>Self-care prompt</div>           
            <div className='sctext primaryalign'>
                <div>A daily self-care prompt to help you feel better.</div>        
                <div>As a mood booster, do these 1 minute prompts every day.</div>
                <div>To improve your mood, you can run a randomizer to receive different activities.</div>        
           </div>  
           <div className='boxstart' onClick={handleFindMePrompt}><div className='box-start-text' >Find me a prompt</div></div>          
        </div>      
    </Modal>

       <div className='dailyactivitiescontents'>  
         <Stepper activeStep={activeStep} orientation="vertical" style={{margin:"0%",padding:"0%"}}>
            {
            dailyActivities.map((item)=>(
                <Step>
                    <StepLabel style={{margin:"0%",padding:"0"}}>            
                        <div className='dailyCard' onClick={item.function}>                      
                            <div className='dailytext'>
                                 <div className='dayTime'>{item.time}</div>
                                 <div className='dayCare'>{item.activity}</div>
                            </div>
                            <div className='dailyImage'><img src={item.icon}/></div>
                        </div>
                    </StepLabel>           
                </Step>
                ))
            }    
         </Stepper>      
       </div> 
    </>
  )
}

export default DailyActivities