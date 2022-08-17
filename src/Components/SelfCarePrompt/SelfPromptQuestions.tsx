import React, { useEffect, useState } from 'react'
import "./SelfCarePrompt.css";
import illustration from "../../Assets/Dashboard/illustration.png";
import closebtn from "../../Assets/Dashboard/Closebtn.png"
import {  useNavigate } from 'react-router';

import celebrate from "../../Assets/Dashboard/celebrate.gif";
import celebrate2 from "../../Assets/Dashboard/celebrate2.gif"

interface Props {
    handlePrompt: any,
    randomQuestions : string[]

}


const SelfPromptQuestions = ({handlePrompt,randomQuestions}:Props) => {
    const Navigate =useNavigate();
    const [currentPrompt,setCurrentPrompt] = React.useState<number>(0)
    const [showScore,setShowScore] = React.useState<boolean>(false)
    const [selfCareScore,setSelfCareScore]= React.useState<number>(0);     
    console.log("RandomQuestions",randomQuestions)  
    const handleSubmitPrompts =async()=>{     
        // const response = await submitPrompts();        
        console.log("Submission of Prompts and Self-Care Prompt Done");
    }
    const handleDoneButton =(e:any)=>{       
        setSelfCareScore( selfCareScore+1);
        const nextPrompt:number = currentPrompt+1;     
        if(nextPrompt < randomQuestions.length){
            setCurrentPrompt(nextPrompt);
        }else{
            handleSubmitPrompts();
            setShowScore(true)
        }       
    }
    const handleAnotherButton= (e:any)=>{
        e.preventDefault();
        const nextPrompt = currentPrompt+1;        
        if(nextPrompt < randomQuestions.length){
            setCurrentPrompt(nextPrompt);
        }else{
            handleSubmitPrompts();
            setShowScore(true)
        } 
    }
    const handlePrompts =async()=>{
        // const response = await getPrompts();
        console.log("Prompts are Getting Fetched")

    }
    useEffect(()=>{
        handlePrompts();
})   
  return (
    <div className='selfcarepromptquestion'>
        {showScore ? (
            <div className='promptQuestions'>
                <div className='closebtn'><div className="close" onClick={handlePrompt}><img src={closebtn}/></div></div>
                <div className='prompttext secondaryalign'><img src={celebrate}/>You Have Done {selfCareScore} out of {randomQuestions.length} Prompts <img  src={celebrate2}/></div>
            </div>
             ) : (
            <>
            <div className='promptQuestions'> 
                <div className='promptimage'><img src={illustration}/></div>
                <div className='prompttext secondaryalign'>
                      {randomQuestions[currentPrompt]}
                </div>                
                <div className='btns'>
                      <button className='primary-btn' name={randomQuestions[currentPrompt]} value ="true" onClick={handleDoneButton}><div className='primary-btn-text'>Done</div></button>
                      <button className='secondary-btn' value ="false" onClick={handleAnotherButton}><div className='secondary-btn-text'>I want Another Prompt</div></button>
                </div>
                              
            </div>
            </>
        )}
    </div>
  )
}

export default SelfPromptQuestions