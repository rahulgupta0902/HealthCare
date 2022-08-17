import React , {useEffect, useState} from 'react';
import './Align.css'
import content from '../../Assets/Content'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Sentiment from 'sentiment'
import {FaMicrophoneSlash}  from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const sentiment = new Sentiment()

export const  Align = () => {
    
    const Navigate = useNavigate();

    const [step,setStep]=useState<number>(1);
    console.log(step);
    const [generalSentiment,setGeneralSentiment] = React.useState<string>('')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [vis1,setVis1]=useState<number>(2)
    const [vis2,setVis2]=useState<number>(2)
    const [vis3,setVis3]=useState<number>(2)
    const [vis4,setVis4]=useState<number>(2)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [vis5,setVis5]=useState<number>(2)

    //Demo textarea values
    const [text1,setText1]=useState<string>('Going to office to work daily or not. Unable to make the decision.');
    const [text2,setText2]=useState<string>('I can work from home. I am too lazy to go');
    const [text3,setText3]=useState<string>('Making excuses for not going  to office');
    const [text4,setText4]=useState<string>('It is my responsibility to do as the company asks from me.');

    const [answer, setAnswer] = useState('');
    const [currentSpeech, setCurrentSpeech] = useState('');
    const [text,setText]=useState('');

    const { transcript, listening, resetTranscript} = useSpeechRecognition({
        transcribing: true,
       
      });
      useEffect(() => {
        if (listening && transcript) {
            
          setCurrentSpeech(transcript.toLowerCase());
        }
      }, [transcript, listening]);

      useEffect(() => {
        if (!listening && currentSpeech.length > 0) {
          setAnswer(answer ? answer + " " + currentSpeech : currentSpeech);
          setCurrentSpeech("");
          resetTranscript();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [listening]);

      const handleMicClick = () => {
        if (listening) SpeechRecognition.stopListening();
        else 
        {resetTranscript();
        SpeechRecognition.startListening({ continuous: true });}
      };

      let x=(document.getElementById('thought1') as HTMLTextAreaElement)?.value;

      useEffect(()=>{
        const result = sentiment.analyze(x)
        // console.log(result.score)
         if(result.score>0)
         setGeneralSentiment('Positive')
         else if(result.score<0)
         setGeneralSentiment('Negative')
         else
         setGeneralSentiment('Neutral')
        // console.log(generalSentiment)
      },[x]);


      const handleAnswerChange = (event: any) => {
        setAnswer(event.target.value);
      };
   
    const func = (e:number) => {
    
            setStep(e)
            e===1?(
                setVis1(1)
            ):e===2?(
                setVis2(1)                  
            ):e===3?(
                setVis3(1)
            ):e===4?(
                setVis4(1)
            ):(
                setVis5(1)
            )

    }

    const prev = (e:number) => {
            e!==1?
            (
                setStep(e-1)   
            ):
            
            (
                Navigate("/healyourself")
            )
        }
        
        const nexti = (e:number) => {
            e+1===2?(
                setVis2(1)
            ):e+1===3?(
                setVis3(1)
            ):e+1===4?(
                setVis4(1)
            ):(
               Navigate("/healyourself")
            )
        }

        const next = (e:number) => {
            e!==4?
            (
                setStep(e+1)          
            ): 
            (
                Navigate("/healyourself")
            )
            if(e!==4)
            nexti(e)
        }

    return(
        <>
          <div className='align-section'>
            
            <div className='align-title'>
            <div className="row1">
                <div className="col1">
                    <img src={content.images.lredarrow} alt='' onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <div className="text" onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}>Back to Heal Yourself</div>
                    
                </div>
                <div className="col2">
                    Align Yourself
                </div>
            </div>
            <div className="row2">
             Aligning yourself helps you cope with difficult situations
            </div>
            </div>
           

            <div className='align-areas'>

               <div className='area'>
                {step===1?
                (<button className='area-btn1'  onClick={()=>func(1)}>
                 <div className='area-text1'>
                    SITUATION
                 </div>
                 <div className='capsule1'></div>
                </button>):(
                    <button className='area-btn' onClick={()=>func(1)}>
                    <div className='area-text'>
                    SITUATION
                    </div>
                    <div className='capsule'></div>
                   </button>
                   )}
                
               </div>

               <div className='area'>
               {step===2?
                (<button className='area-btn1'  onClick={()=>func(2)}>
                 <div className='area-text1'>
                 THE 3’s
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==2 && vis2===1?(
                    <button className='area-btn' onClick={()=>func(2)}>
                    <div className='area-text'>
                    THE 3’s
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==2 && vis2===2?(
                    <button className='area-btn0' onClick={()=>func(2)}>
                    <div className='area-text0'>
                    THE 3’s
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

               <div className='area'>
               {step===3?
                (<button className='area-btn1'  onClick={()=>func(3)}>
                 <div className='area-text1'>
                    IDENTIFY
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==3 && vis3===1?(
                    <button className='area-btn' onClick={()=>func(3)}>
                    <div className='area-text'>
                    IDENTIFY
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==3 && vis3===2?(
                    <button className='area-btn0' onClick={()=>func(3)}>
                    <div className='area-text0'>
                    IDENTIFY
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

               <div className='area'>
               {step===4?
                (<button className='area-btn1'  onClick={()=>func(4)}>
                 <div className='area-text1'>
                    ALIGN
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==4 && vis4===1?(
                    <button className='area-btn' onClick={()=>func(4)}>
                    <div className='area-text'>
                     ALIGN
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==4 && vis4===2?(
                    <button className='area-btn0' onClick={()=>func(4)}>
                    <div className='area-text0'>
                       ALIGN
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

               

            </div>
            <div className='align-question-area'>
                <div className='align-questions'>
              {step===1?
            <div className='step1'>
                <div className='step1row1'>
                Here is a simple exercise to align your thoughts, beliefs and actions in any situation. Try this when you are facing conflicts in any situation.
                    </div>
                

                <div className='step1row2'>
                1. Type a situation that you are facing conflicts in.
                </div>

                <div className='step1row3'>
                    <div className="block">
                        <div className="col1">
                            <div className="row1">
                             <textarea 
                             placeholder='Type your situation here...' 
                             id='thought1'
                             value={
                                         listening && answer
                                         ? answer + " " + currentSpeech
                                         : listening
                                         ? currentSpeech
                                         : answer
                                     }
                                     onChange={handleAnswerChange}
                                     disabled = {listening}/>
                            </div>
                            
                                {generalSentiment==='Positive'?(
                                 <div className="row2" style={{color:'green'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.happy} alt=''/></div>):
                                  generalSentiment==='Negative'?(
                                  <div className="row2" style={{color:'red'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.sadness} alt=''/></div>):
                                  generalSentiment==='Neutral'?(
                                    <div className="row2" style={{color:'black'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.neutral} alt=''/></div>):('')}
                            
                        </div>
                        <div className="col2" onClick={handleMicClick}>
                        {listening ?(<FaMicrophoneSlash />):
                                 (<img src={content.images.mic}  alt = 'mic'/>)}
                        </div>
                    </div>
                   
                </div>

                <div className='step1row4'>
                Tool developed by Tobias Lundgren.
                    </div>

                  
            </div>:
            step===2?
            (<div className='step2'>
                <div className='step22row1'>
                Here is a simple exercise to align your thoughts, beliefs and actions in any situation. Try this when you are facing conflicts in any situation.
                    </div>
                

                <div className='step22row2'>
                2. Now mention the thoughts you think , the beliefs you have of that situation and the actions you take during it.
                </div>

                <div className='step22row3'>

                    <div className='s22r3col1'>
                        <div className='s22r3col1r1'>
                            <textarea placeholder='Type your thoughts here...'/>
                        </div>
                        <div className='s22r3col1r2'>
                        <textarea placeholder='Type your beliefs here...'/>
                        </div>
                    </div>

                    <div className='s22r3col2'>
                        <textarea placeholder='Type your actions here...'/>
                    </div>

                </div>

                <div className='step22row4'>
                 Tool developed by Tobias Lundgren.
                </div>

            </div>):step===3?(
                <div className='step3'>
                <div className='step33row1'>
                It is alright to know about our miss alignment. This gives us the opportunity to learn and change our thoughts or beliefs or actions. Identify what out of  your thoughts, beliefs and actions can be changed to align with each other.<br/> Move over to align yourself.     
                <br/>
                <br/>
                The Situation
                </div>

                

                <div className='step33row2'>

                    <div className='s33r2c1'>
                        <textarea  value={text1} onChange={event => setText1(event.target.value)} />
                    </div>
                    <div className='s33r2c2'>
                    <textarea  value={text2} onChange={event => setText2(event.target.value)}/>
                    </div>
                    <div className='s33r2c3'>
                        <div className='s33r2c3r1'>
                        <img src={content.images.notaligned} alt =''/>
                        </div>
                        <div className='s33r2c3r2'>
                        <textarea  value={text3} onChange={event => setText3(event.target.value)} />
                        </div>
                    </div>
                    <div className='s33r2c4'>
                    <textarea  value={text4} onChange={event => setText4(event.target.value)} />
                    </div>

                </div>

                <div className='step33row3'>
                 Tool developed by Tobias Lundgren.
                </div>

            </div>

            ):step===4?(
                <div className='step4'>
                <div className='step44row1'>
                Check if you feel balanced! Now you may take the right action as that would align with the situation!. All the best and it is okay if you still feel misaligned. You can reflect and take your time. 
                <br/>
                <br/>
                
                The Situation
                <br/>
                </div>

                

                <div className='step44row2'>

                    <div className='s44r2c1'>
                        {text1}
                    </div>
                    <div className='s44r2c2'>
                      {text2}
                    </div>
                    <div className='s44r2c3'>
                        <div className='s44r2c3r1'>
                        <img src={content.images.aligned} alt=''/>
                        </div>
                        <div className='s44r2c3r2'>
                         {text3}
                        </div>
                    </div>
                    <div className='s44r2c4'>
                      {text4}
                    </div>

                </div>

                <div className='step44row3'>
                 Tool developed by Tobias Lundgren.
                </div>

            </div>


            ):('')}
            </div>

             <div className='align-btns'>
                <button className='btn1' onClick={()=>prev(step)}>
                <img src={content.images.redleftarrow} alt =''/>
                &nbsp; &nbsp; Back
                </button>
                
                <button className='btn2'onClick={()=>next(step)}>
                    Next &nbsp; &nbsp; 
                <img src={content.images.redrightarrow} alt = ''/>
                </button>               
             </div>

            </div>
         </div>
        </>
    )
}

