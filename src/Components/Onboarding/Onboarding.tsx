import React,{useState} from 'react';
import content from '../../Assets/Content'

import './Onboarding.css'
import { useNavigate } from 'react-router';

function Onboarding()  {

const Navigate = useNavigate();

const [score,setScore]=useState<number>(0);
const [step,setStep]=useState<number>(0);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [questions,setQuestions]=useState<string[]>([
  'I don’t feel that I am able to fulfil my duties and add value within my contracted hours and still take brakes.',
  'I don’t feel I have manageable workloads, achievable deadlines and/or realistic time pressures.',
  'I don’t feel that my working time can be flexible and/or that I can decide when to take a break.',
  'I don’t feel that I have a choice in what I do at work and/or how I do it and I can’t work at a pace that suits me.',
  'I don’t feel respected and/or encouraged and/pr that I dont recieve helpful feedback on the work I do.',
  'I don’t feel able to talk openly about challenges and/or that I will receive the help I need if I am struggling.',
  'I don’t feel that relationships at work are positive and feel that there is friction and anger between colleagues.',
  'I don’t feel respected and that I am treated kindly and fairly by colleagues.',
  'I don’t feel clear on what’s expected of me and/or how to get my work done.',
  'I don’t feel clear about the goals for my department and/or how my work fits into the bigger picture.',
  'I don’t feel I am consulted on and/or given sufficient opportunities to question changes.',
  'I don’t feel clear about how changes at work will work out in practice.'
])
const [answers,setAnswers] = useState<number[]>([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1])

  

// method to move to the previous question
const previous = (step: number) => {
  setStep(
   step - 1,
  )
 
  
}

// method to move to the next question
const next = (step: number) => {
  setStep(
   step + 1,
  )
  
};

const updateAns = (step: number,x:number) => {
  let array = [...answers]
  array[step]=x
  setAnswers(array)
}

const calcScore = () => {
    let x=0
    for(let i=0;i<12;i++)
    x+=answers[i]
    setScore(x)
    next(step)
}


    return(
      
    <div className="onboard-content">
    {step < 12 ? 
                    (<>
                        
                        <div className='Question-content'>
                          <div className='Question-pic'>
                           <img src={content.images.illustration} alt = ''/>
                          </div>
                          <div className='Question-text-content'>
                              <div className='Question-text'>
                              {questions[step]}
                              </div>
                          </div>
                        </div>
                        
                           <div  className="Answers">
                            {answers[step]===1?
                           (<><button style = {{ backgroundColor: "#080b69",  color: '#fff', borderLeft: '4px solid #080b69'}} >Agree</button>
                           <button  onClick={() => (updateAns(step,0))}>Disagree</button></>)
                           :answers[step]===0?
                           (<><button onClick={() => (updateAns(step,1))} >Agree</button>
                           <button className='Disagree' style = {{ backgroundColor: "#080b69",  color: '#fff', borderLeft: '4px solid #080b69'}}>Disagree</button></>)
                           :(
                            <><button onClick={() => (updateAns(step,1) )} >Agree</button>
                           <button onClick={() => (updateAns(step,0))} >Disagree</button></>
                           )}
                           </div>


                        <div className='End-section'>
                        <button
                        className="Previous"
                        disabled={
                            step===0 
                            ? true : false
                        }
                        onClick={() => previous(step)}>Previous</button>

                        <div className='QuestionTag'>
                          Question {step+1} of 12.
                        </div>

                        <button
                        className="Next"
                        disabled={
                            step===13
                            ? true : false
                        }
                        onClick={
                          step<11?(
                          answers[step]!==-1?(
                          
                            ()=> next(step)
                            
                           ):(
                            ()=>alert('Please select an option before moving ahead!'))
                          ):(
                            answers[step]!==-1?(
                              
                              
                              ()=> (calcScore())
                             
                              
                             ):(
                              ()=> alert('Please select an option before moving ahead!'))
                          )}
                          >Next</button>
                        </div>
                    </>) : (
                       (score>=0 && score<=3)?
                        <div className="finalPage">
                          <div className='sec-1'>
                            Score
                          </div>
                          <div className='sec-2'>
                            {score} out of 12  
                          </div>
                            <div className='sec-3'>
                            Your score suggests that your company clearly values mental health, and efforts are made to establish a healthy work environment. People feel supported and empowered to accomplish their best work.
                            </div>
                            <div className='sec-4' onClick={()=>(Navigate("/dashboard"))} style={{cursor:"pointer"}}> 
                            Start with my onboarding <img className='Arrow' src={content.images.Arrow} alt = ''/>
                          </div>
                        </div>:(score>=4 && score<=8)?<div className="finalPage">
                          <div className='sec-1'>
                            Score
                          </div>
                          <div className='sec-2'>
                            {score} out of 12
                          </div>
                            <div className='sec-3'>
                            Your score suggests that in your company, there are some clear signs of work-related stress, which will inevitably affect creativity, productivity, and outcomes. Pay close attention to the specific areas of work-design that you agreed on, as this will aid you in prioritising adjustments in the workplace to build a healthy working environment.
                            </div>
                            <div className='sec-4' onClick={()=>(Navigate("/dashboard"))} style={{cursor:"pointer"}}> 
                            Start with my onboarding <img className='Arrow' src={content.images.Arrow} alt = ''/>
                          </div>
                        </div>:<div className="finalPage">
                          <div className='sec-1'>
                            Score
                          </div>
                          <div className='sec-2'>
                            {score} out of 12
                          </div>
                            <div className='sec-3'>
                            Your score suggests that your company might be finding it difficult to safeguard its employees from the most common sources of workplace stress, resulting in high absenteeism and presenteeism, reduced creativity, productivity, and outcomes, and a high legal risk. Make sure to call attention to the specific work-design issues that need to be addressed, and make mental wellbeing a top priority for everyone's benefit.
                            </div>
                            <div className='sec-4' onClick={()=>(Navigate("/dashboard"))} style={{cursor:"pointer"}}>
                              <div className="wrap">Start with my onboarding <img className='Arrow' src={content.images.Arrow} alt = ''/></div> 
                            </div>
                        </div>
                    )
                }
                <div className="bottom-flower">
                 <img src={content.images.illustration2} alt = ''/>
                </div>
                
  </div>

    );
  }
  export default Onboarding;
  
  
