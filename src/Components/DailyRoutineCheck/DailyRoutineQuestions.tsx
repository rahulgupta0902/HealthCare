import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';

import Modal from 'react-modal';
import "./DailyRoutineCheck.css"
import content from '../../Assets/Content';
import closebtn from "../../Assets/Dashboard/Closebtn.png"



interface props {
    value : number,
    max : number,
    color : string,
    width : any,
    
}
type DailyRoutineQuestions = {
    Question :string,
    Options :string[]
}
const ProgressBarTwo = ({value,max,color,width}:props) => {      
  return (
      <div className='Containerprogress'><progress className="progressbarinner" value={value} max={max} color="#E6878A" /></div>
    
  )
}
const DailyRoutineQuestions = () => {
    const Navigate = useNavigate();
    const Questions:DailyRoutineQuestions[] = content.DailyRoutineQuestions; 

    //State variable to show percent in daily routine progress bar
    const [percent,setPercent] = React.useState<number>(0)

    //State variable to update index of questions
    const [currentQuestion,setCurrentQuestion]=React.useState<number>(0);

    //State varriable to update daily routine questions      
    const [dailyRoutineQuestions,setDailyRoutineQuestions] = React.useState<DailyRoutineQuestions[]>(Questions);

    //state variable for showing dailyroutinequestions
    const [showDailyRoutineFinished,setDailyRoutineFinished]=React.useState<boolean>(false)
    const values=[];
   
    //Functions to handle finished dailyroutine modal
    const setModalIsOpenToTrue =()=>{
        setDailyRoutineFinished(true)
    }

    const setModalIsOpenToFalse =()=>{
        setDailyRoutineFinished(false)
        Navigate("/dashboard")
    }

    //Function when called when daily routine questions are finished
    const handleSubmitDailyRoutineQuestions = async()=>{
        // const response = await submitDailyRoutineAnswer();
        console.log("A Function Called to Submit the Answers of DailyRoutine");
    }

    //Function to handle Each daily routine question
    const handleQuestion =()=>{     
        const nextQuestion = currentQuestion+1;  
        const nextPercent =percent+16.7;     
        if(nextQuestion < Questions.length){
            values.push()
            setCurrentQuestion(nextQuestion);
            setPercent(nextPercent)
            
        }else{
            handleSubmitDailyRoutineQuestions();
            setModalIsOpenToTrue();
        } 
    }
      
    //Function to fetch daily routine questions
    const handleDailyRoutineQuestions =async()=>{
        // const response = await getDailyRoutineQuestions();
        // setDailyRoutineQuestions(response);
        console.log("An Api to Fetch all the DailyRoutine Questions");

    }

    useEffect(()=>{
        handleDailyRoutineQuestions();
    })
  


  return (
    <>
    <div className='drcontainer'>
        <div className='drc'>
            <div className='drday'>
                <div className='drtext'>Today's routine check</div>
                <div className='drtime'>07 February, 2022</div>
            </div>
            <div className='drq'>                {             
                       <>
                       <div className='drqs'>{Questions[currentQuestion].Question}</div>
                       <div className='drqa'> {Questions[currentQuestion].Options.map((option)=>(
                           <div className='dailyRoutineOption' onClick={handleQuestion}><img src={option}/></div>
                       ))}</div>
                       </>                 
                }
            </div>
            <div className='drp'>
                <div>Progress</div>
                <ProgressBarTwo  value={percent} max={100} color="#6F9792;" width="90%" />                
            </div>
        </div>
    </div>
    <Modal isOpen={showDailyRoutineFinished} style={content.customStylesOne} onRequestClose={()=> setDailyRoutineFinished(false)} ariaHideApp={false}>
            <div className='closebtn' style={{width:"90%"}}><div className="close" onClick={setModalIsOpenToFalse}><img src={closebtn}/></div></div>
            <div className='completedsc'>
                <div>We have recorded your information.</div>
                <div className='completedsccaption'> You can check the details in your “Deatiled Analysis”.</div>
            </div>        
    </Modal>
    </>
  )
}

export default DailyRoutineQuestions;