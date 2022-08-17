import React,{useState,useEffect} from 'react';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Sentiment from 'sentiment'
import {FaMicrophoneSlash}  from "react-icons/fa";
import content from '../../Assets/Content'
import {Dropdown} from '../Dropdown/Dropdown'
import './Manifestation.css'
const appId = 'e4efd8ec-949a-4986-aaa0-8675fc6e91bd';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
const sentiment = new Sentiment()

export const Manifestation = () => {
    
    const [generalSentiment,setGeneralSentiment] = React.useState<string>('')
    const [step,setStep]=useState(1);
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
      
      

   
   
   
  
   
   const thought = document.getElementById('thought1') as HTMLTextAreaElement | null;
    
    const next = (step: number) => {
        if(thought!=null)
        setText(thought.value)
        setAnswer('')
        setCurrentSpeech('')
        resetTranscript();
        setStep(
         step + 1,
        )
        
      };
    const zero = (step: number) => {
        setStep(
            1,
        )
        if(thought!=null)
        thought.value = "";
    }
  
      
       
        
    
    return (
        
         <div className='row22col2'>
                            {step<=3?(<>
                             <div className='r2c2r1'>
                             Manifest in your life and also be grateful by 369 method. <br/>
                             Good Morning! Pick the thought or use a new positve thought that you want to work on or manifest.
                             </div>
                             <Dropdown/>

                          
                             <div className='r2c2r3'>
                             Say it out loud while typing 3 times in the boxes below. You may also use the mic to record your voice.
                             </div>
                             <div className='r2c2r4'>
                                <div className='part111'>{step}/3</div>
                                 {<>
                                 <div className='write'>
                                 <div className="wrap">
                                 <textarea 
                                  className='manifest' 
                                  id='thought1'
                                    value={
                                                listening && answer
                                                ? answer + " " + currentSpeech
                                                : listening
                                                ? currentSpeech
                                                : answer
                                            }
                                            onChange={handleAnswerChange}
                                            
                                            placeholder="Write and say the thougt out loud..."
                                            disabled = {listening}
                                           />
                                  {generalSentiment==='Positive'?(
                                 <div className="sentiment-detection" style={{color:'green'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.happy} alt=''/></div>):
                                  generalSentiment==='Negative'?(
                                  <div className="sentiment-detection" style={{color:'red'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.sadness} alt=''/></div>):
                                  generalSentiment==='Neutral'?(
                                    <div className="sentiment-detection" style={{color:'black'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.neutral} alt=''/></div>):('')}
                                 </div>

                                 <div className='mic'  onClick={handleMicClick}>
                                 {listening ?(<FaMicrophoneSlash />):
                                 (<img src={content.images.mic}  alt = 'mic'/>)}
                                 </div>
                                 </div>
                                 </>
                                 }
                                       
                                
                                 <img 
                                  src={content.images.bluearrow} 

                                  onClick={
                                  ()=>{
                                    (
                                    
                                             
                                              next(step)
                                    
                                    )}}

                                  alt =' ' />

                             </div>
                             </>):(<>
                             <div className='r2c2r11'>
                             Manifest in your life and also be grateful by 369 method.
                             </div>
                             <div className='r2c2r22'>
                                <div className='part2'>Congratulations! You have completed the morning exercise for the below thought.</div>
                                 <div className='Thought'>{text}</div>
                                 <img src={content.images.bluearrow} onClick={()=>zero(step)} alt = ''/>

                             </div>
                             </>
                             )}
                          </div>
                    
              
        

    )
}
