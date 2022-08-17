import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import content from '../../Assets/Content';
import "./EmotionSpikeFourProcess.css";
import Healingicon from "../../Assets/emotionspike/Healingicon.png"
import { Form } from 'reactstrap';
import { useNavigate } from 'react-router';
import workfromhome from "../../Assets/EmotionSpikeWork/workfromhome.png";
import workfromoffice from "../../Assets/EmotionSpikeWork/workfromoffice.png";
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import Sentiment from 'sentiment'

import {FaMicrophoneSlash}  from "react-icons/fa";

const appId = 'e4efd8ec-949a-4986-aaa0-8675fc6e91bd';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
const sentiment = new Sentiment()
 
interface Props{
    feelingObject:any,
    handleClickedFeeling:any,
    feelings:any
}
interface Props2{
    workObject:any,
    handleClickedWork:any,
    works:any
}

type handleVoidFunction = ()=>void;

//Functions to create work cluster

const RowFiveWork =({workObject,handleClickedWork,works}:Props2)=>{   
    return (     
        <div className='rowfive'>
               {
                    workObject.map((work:string)=>(
                        console.log("testing",`content.workClusterImages.${work}`),
                        <div className={works[work as keyof typeof works]?"activeClusterButton feelingButtonText primaryalign":"unactiveClusterWorkButton feelingButtonText primaryalign"} onClick={()=>handleClickedWork(work)}><img src={require(`../../Assets/EmotionSpikeWork/${work}.png`)} />{work}</div>
                    ))
                }

        </div>
    )
}
const RowSixWork =({workObject,handleClickedWork,works}:Props2)=>{   
    return (     
        <div className='rowsix'>
               {
                    workObject.map((work:string)=>(
                        console.log("testing",`content.workClusterImages.${work}`),
                        <div className={works[work as keyof typeof works]?"activeClusterButton feelingButtonText primaryalign":"unactiveClusteWorkrButton feelingButtonText primaryalign"} onClick={()=>handleClickedWork(work)}><img src={require(`../../Assets/EmotionSpikeWork/${work}.png`)} />{work}</div>
                    ))
                }

        </div>
    )
}

//Functions to create rows of feelings cluster

const RowFive =({feelingObject,handleClickedFeeling,feelings}:Props)=>{   
    return (     
        <div className='rowsix'>
               {
                    feelingObject.map((feeling:string)=>(
                        <div className={feelings[feeling as keyof typeof feelings]?"activeClusterButton feelingButtonText":"unactiveClusterButton feelingButtonText"} onClick={()=>handleClickedFeeling(feeling)}>{feeling}</div>
                    ))
                }

        </div>
    )
}

const RowSix =({feelingObject,handleClickedFeeling,feelings}:Props)=>{   
    return (  
        <div className='rowsix'>
               {
                    feelingObject.map((feeling:string)=>(
                        <div className={feelings[feeling as keyof typeof feelings]?"activeClusterButton feelingButtonText":"unactiveClusterButton feelingButtonText"} onClick={()=>handleClickedFeeling(feeling)}>{feeling}</div>
                    ))
                }
        </div>   
    )
}




const EmotionSpikeFourProcess = () => {
    const [generalSentiment,setGeneralSentiment] = React.useState<string>('')
    const [step,setStep]=useState(1);
    const [answer, setAnswer] = useState('');
    const [currentSpeech, setCurrentSpeech] = useState('');
    const [text,setText]=useState('');
    const [negative,setNegative]= React.useState<string[]>([]);
    const [positive,setPositive] =React.useState<string[]>([]);

    const findSentiment = (event:any) => {
      const result = sentiment.analyze(event.target.value)
      console.log(result)    
      let uniqueNegative:string[] = [];
        result.negative.forEach((c:string) => {
            if (!uniqueNegative.includes(c)) {
                uniqueNegative.push(c);
            }
        });
    let uniquePositive:string[] = [];
        result.positive.forEach((c:string) => {
            if (!uniquePositive.includes(c)) {
                uniquePositive.push(c);
            }
        });  
      console.log(uniqueNegative);
      setNegative(uniqueNegative);
      console.log(uniqueNegative,"negative");
      setPositive(uniquePositive);
      console.log(positive,"positive")

      
      
      console.log(result.score)
      if(result.score>0)
      setGeneralSentiment('Positive')
      else if(result.score<0)
      setGeneralSentiment('Negative')
      else
      setGeneralSentiment('Neutral')
      console.log(generalSentiment)
    }

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

      const handleAnswerChange = (event: any) => {
        setAnswer(event.target.value)
        findSentiment(event)
      };
      

   
   
   
  
   
   const thought = document.getElementById('thought1') as HTMLTextAreaElement | null;

    //State Variables to control the display of modals 
    const [emotionSpikePopUp,setEmotionSpikePopUp] = React.useState<boolean>(false);
    const [emotionSpikeOne,setEmotionSpikeOne] = React.useState<boolean>(false);
    const [emotionSpikeTwo,setEmotionSpikeTwo]= React.useState<boolean>(false);
    const [emotionSpikeThree,setEmotionSpikeThree]= React.useState<boolean>(false);
    const [emotionSpikeFour,setEmotionSpikeFour]= React.useState<boolean>(false);
    const [fourthStepAnswer,setFourthStepAnswer]= React.useState<string>("");
    const [thirdStepResult,setThirdStepResult]= React.useState<string>("");
    const [showAddYourFeeling,setShowAddYourFeeling]= React.useState<boolean>(false)
    const [addYourFeelingAnswer,setAddYourFeelingAnswer]= React.useState<string>("");
    const [addWhatAreYouDoingAnswer,setWhatAreYouDoingAnswer] = React.useState<string>("");
    const [showWhatAreYouDoing,setShowWhatAreYouDoing] = React.useState<boolean>(false);

   
    const handleEmotionSpikeFirst:handleVoidFunction=()=>{
        setEmotionSpikeOne(false);
        setEmotionSpikeTwo(true);
    }
    const handleEmotionSpikeTwo:handleVoidFunction=()=>{
        setEmotionSpikeTwo(false);
        setEmotionSpikeThree(true);
    }
    const handleEmotionSpikeThree:handleVoidFunction=()=>{
        setEmotionSpikeThree(false);
        setEmotionSpikeFour(true)
    }

    const handleEmotionSpikePopUp:handleVoidFunction = ()=>{
        setEmotionSpikePopUp(false);
        setEmotionSpikeOne(true);
    }

    const handleClickedFeeling=(feeling : string)=>{
        setFeelings({...feelings,[feeling]:!feelings[feeling as keyof typeof feelings]})
    }   

    const handleShowAddYourFeelingModal:handleVoidFunction=()=>{
        setEmotionSpikeOne(false);
        setShowAddYourFeeling(true)
    }

    const handleBackAddYourFeeling:handleVoidFunction=()=>{
        setShowAddYourFeeling(false);
        setEmotionSpikeOne(true);
    }

    const handleChangeAddYourFeeling =(e:any)=>{  
        setAddYourFeelingAnswer(e.target.value)
        findSentiment(e)
    }

    const handleSubmitAddYourFeeling =(e:any)=>{

        console.log("submitted")
        console.log(answer)
        setAddYourFeelingAnswer(prev=>answer);
     
        setShowAddYourFeeling(false);
        setEmotionSpikeOne(false)
        setEmotionSpikeTwo(true); 
        setAnswer("")
        e.preventDefault();
 
    }
    const handleClickedWork=(work : string)=>{
        setWorks({...works,[work]:!works[work as keyof typeof works]})
    }
    const handleShowWhatAreYouDoing:handleVoidFunction=()=>{
        setShowWhatAreYouDoing(true);
        setEmotionSpikeTwo(false);
      
    }
    const handleBackWhatAreYouDoing:handleVoidFunction=()=>{
        setShowWhatAreYouDoing(false);
        setEmotionSpikeTwo(true);
    }
    const handleChangeWhatAreYouDoing =(e:any)=>{  
        setWhatAreYouDoingAnswer(e.target.value)
    }
    const handleSubmitWhatAreYouDoing =(e:any)=>{
        console.log("submitted")
        e.preventDefault();
        setWhatAreYouDoingAnswer(answer)
        setShowWhatAreYouDoing(false);    
        setEmotionSpikeTwo(false);
        setEmotionSpikeThree(true)  
        setAnswer("");
    }

    
const handleThirdStep=(result:string)=>{
    setThirdStepResult(result);
    console.log("Result",result)
}


const handleSubmitStepFour=(e:any)=>{
    e.preventDefault();
    const answer = fourthStepAnswer;
    console.log(answer);
    setEmotionSpikeFour(false);
    setFourthStepAnswer(answer)
    Navigate("/dashboard")
}
const handleChangeFourthStep=(e:any)=>{  
    setFourthStepAnswer(e.target.value)
   
}

  

    const [feelings,setFeelings] = useState({
        Focused:false,
        Cheerful:false,
        Confident:false,
        Energetic:false,
        Enthusiastic:false,
        Calm:false,
        Tired:false,
        Confidents:false,
        Nervous:false,
        Meh:false,
        Numb:false,
        lonely:false,
        Anxious:false,
        Guilty:false,
        Tense:false,
        Iritated:false,
        Uncertain:false,
        Satisfied:false,
        Concerned:false,
        Insecure:false,
        Comfortable:false,
        Grateful:false,
        Worried:false,
        Secure:false,
        Encouraged:false,
        Distrust:false,
        Heavy:false,
        Healthy:false,
        Pleased:false,
        Dejected:false,
        Delighted:false,
        Desparate:false,
        Brave:false
})

const feelingRow1:string[]= ["Focused","Cheerful","Confident","Energetic","Enthusiastic"];
const FeelingsRow2:string[]=["Calm","Tired","Confident","Nervous","Meh","Numb"];
const FeelingsRow3:string[]=["lonely","Anxious","Guilty","Tense","Iritated"];
const FeelingsRow4:string[]=["Uncertain","Satisfied","Concerned","Insecure","Comfortable","Grateful"];
const FeelingsRow5:string[]=["Worried","Secure","Encouraged","Distrust","Heavy"];
const FeelingsRow6:string[]=["Healthy","Pleased","Dejected","Delighted","Desparate","Brave"];

const feelingList = Object.keys(feelings);

const [works,setWorks]= useState({
    acheivement:false,
    brainstroming:false,
    breaktime:false,
    chatting:false,
    doingtask:false,
    drinkingcoffee:false,
    eating:false,
    finance:false,
    gaming:false,
    justsitting:false,
    meeting:false,
    movie:false,
    music:false,
    pettime:false,
    reading:false,
    relaxing:false,
    researching:false,
    selflove:false,
    shopping:false,
    videocall:false,
    working:false,
    youtube:false
});
const workingList:string[] =Object.keys(works);

const WorkRow1=["acheivement","brainstroming","breaktime","chatting","doingtask","drinkingcoffee"];
const WorkRow2=["eating","finance","gaming","justsitting","meeting"];
const WorkRow3=["movie","music","pettime","reading","relaxing","researching"];
const WorkRow4=["selflove","shopping","videocall","working","youtube"];





const Navigate = useNavigate();

  return (
    <>
                                                        {/*Modal of Emotion Spike Pop Up */}
    <Modal isOpen={emotionSpikePopUp} style={content.customStylesModal} onRequestClose={()=> setEmotionSpikePopUp(false)} ariaHideApp={false}>
        <div className='emotionSpikeContainer'>
            <div className='modalicon'><img src={Healingicon}/></div>
            <div className='modalheader modalFonts'>Hey! We noticed a spike in your emotions.</div>
            <div className='modalrequest modalFonts'>Can you please share what are you feeling?</div>
            <div className='modalsubcaption'>(4 steps  process)</div>
            <div className='btns'>
                <div className='secondary-btn primaryalign' onClick={()=>(setEmotionSpikePopUp(false))}><div className='secondary-btn-text'>No</div></div>
                <div className='primary-btn primaryalign' onClick={handleEmotionSpikePopUp}><div className='primary-btn-text'>Yes</div></div>
            </div> 
        </div>
    </Modal>

                                                            {/* Modal for first process  */}
    <Modal isOpen={emotionSpikeOne} style={content.customStylesTwo} onRequestClose={()=> setEmotionSpikeOne(false)} ariaHideApp={false}>
        <div className='emotionSpikeContainer'>
            <div className='stepOneHeader'>How are you feeling? </div>
            <div className='stepsCaption'>(1/4)</div>
            <div className='feelingClusterContainer primaryalign'>                
                    <RowFive handleClickedFeeling={handleClickedFeeling} feelings={feelings} feelingObject={feelingRow1}/>
                    <RowSix handleClickedFeeling={handleClickedFeeling} feelings={feelings} feelingObject={FeelingsRow2}/>
                    <RowFive handleClickedFeeling={handleClickedFeeling} feelings={feelings} feelingObject={FeelingsRow3}/>
                    <RowSix handleClickedFeeling={handleClickedFeeling} feelings={feelings} feelingObject={FeelingsRow4}/>
                    <RowFive handleClickedFeeling={handleClickedFeeling} feelings={feelings} feelingObject={FeelingsRow5}/>
                    <RowSix handleClickedFeeling={handleClickedFeeling} feelings={feelings} feelingObject={FeelingsRow6}/>                   
            </div>
            <div className='footerEmotionSpike'>
                <div className='addSignButton primaryalign' onClick={handleShowAddYourFeelingModal}><div style={{fontSize:"3rem"}}>+</div></div>
                <div className='primary-btn primaryalign'onClick={handleEmotionSpikeFirst}><div className='primary-btn-text'>Next</div></div>
            </div>
        </div>
    </Modal>

                                                    {/* Modal for adding any other feeling by user  */}
    <Modal isOpen={showAddYourFeeling} style={content.customStylesOne} onRequestClose={()=> setShowAddYourFeeling(false)} ariaHideApp={false}>
    <div className='primaryalign' style={{width:"100%",height:"100%"}}>
            <div className='stepFourContainer'>
                <div className='primaryalign'>
                    <div className='stepFourHeader'>Add your feeling</div>                    
                </div> 
                <div style={{alignContent:"left",width:"100%",cursor:"pointer",fontWeight:"800"}} onClick={handleBackAddYourFeeling}>Back</div>       
            
            <div className='fourthStepForm '>
            <div className='textAnalysis'>
                 <div className='negativeWords'><div style={{textDecoration:"underline",fontWeight:"800"}}>Negative Words</div>   <div >{negative.map((neg)=>(<div>{neg}</div>))}</div></div>
                 <div className='positiveWords'><div style={{textDecoration:"underline",fontWeight:"800"}}>Positive Words</div>   <div >{positive.map((pos)=>(<div>{pos}</div>))}</div></div>
            </div>
                <div>
            
            <Form onSubmit={(e)=>{handleSubmitAddYourFeeling(e)}} className="secondaryalign">
                 {<>
                    <div className='textAreaEmotion'>
                        <div className="textAreaContent">
                            <textarea 
                                  className='voiceEmotionText' 
                                  id='thought1'
                                    value={
                                        listening && answer
                                                ? answer + " " + currentSpeech
                                                : listening
                                                ? currentSpeech
                                                : answer
                                            }
                                            onChange={handleAnswerChange}
                                            
                                            placeholder="Add Your Feeling"
                                            disabled = {listening}
                                           />
                                 {generalSentiment==='Positive'?(
                                 <div className="sentiment-detection" style={{color:'green'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.happy}/></div>):
                                  generalSentiment==='Negative'?(
                                  <div className="sentiment-detection" style={{color:'red'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.sadness}/></div>):
                                  generalSentiment==='Neutral'?(
                                    <div className="sentiment-detection" style={{color:'black'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.neutral}/></div>):('')}
                                 </div>
                                 <div className='micEmotion'  onClick={handleMicClick}>
                                 {listening ?(<FaMicrophoneSlash />):
                                 (<img src={content.images.mic}  alt = 'mic'/>)}
                                 </div>
                                 </div>
                                 <button style={{margin:"2rem"}} className="saveFourStep" type='submit'>Save</button>
                                 </>
                }

                
            </Form>
            </div>

            </div>
        </div>
        </div>
    </Modal>
                                                                {/* Modal for the second step */}
    <Modal isOpen={emotionSpikeTwo} style={content.customStylesTwo} onRequestClose={()=> setEmotionSpikeTwo(false)} ariaHideApp={false}>    
    <div className='emotionSpikeContainer'>
            <div className='stepOneHeader'>What are you doing?</div>
            <div className='stepsCaption'>(2/4)</div>
            <div className='feelingClusterContainer primaryalign'>    
                <RowSixWork handleClickedWork={handleClickedWork} works={works} workObject={WorkRow1}/>
                <RowFiveWork handleClickedWork={handleClickedWork} works={works} workObject={WorkRow2}/>    
                <RowSixWork handleClickedWork={handleClickedWork} works={works} workObject={WorkRow3}/> 
                <RowFiveWork handleClickedWork={handleClickedWork} works={works} workObject={WorkRow4}/> 
            </div>
            <div className='footerEmotionSpike'>
                <div className='addSignButton primaryalign' onClick={handleShowWhatAreYouDoing}><div style={{fontSize:"3rem"}}>+</div></div>
                <div className='primary-btn primaryalign' onClick={handleEmotionSpikeTwo}><div className='primary-btn-text'>Next</div></div>
            </div>
        </div>
    </Modal>
                                                            {/* Modal for adding other work for user */}
    <Modal isOpen={showWhatAreYouDoing} style={content.customStylesOne} onRequestClose={()=> setShowWhatAreYouDoing(false)} ariaHideApp={false}>
    <div className='primaryalign' style={{width:"100%",height:"100%"}}>
            <div className='stepFourContainer'>
                <div className='primaryalign'>
                    <div className='stepFourHeader'>What are you doing?</div>                    
                </div> 
                <div style={{alignContent:"left",width:"100%",cursor:"pointer",fontWeight:"800"}} onClick={handleBackWhatAreYouDoing}>Back</div>       
       
             <div className='fourthStepForm '>
            <div className='textAnalysis'>
                 <div className='negativeWords'><div style={{textDecoration:"underline",fontWeight:"800"}}>Negative Words</div>   <div >{negative.map((neg)=>(<div>{neg}</div>))}</div></div>
                 <div className='positiveWords'><div style={{textDecoration:"underline",fontWeight:"800"}}>Positive Words</div>   <div >{positive.map((pos)=>(<div>{pos}</div>))}</div></div>
            </div>
                <div>
            
            <Form onSubmit={(e)=>{handleSubmitWhatAreYouDoing(e)}} className="secondaryalign">

                 {<>
                    <div className='textAreaEmotion'>
                        <div className="textAreaContent">
                            <textarea 
                                  className='voiceEmotionText' 
                                  id='thought1'
                                    value={
                                                listening && answer
                                                ? answer + " " + currentSpeech
                                                : listening
                                                ? currentSpeech
                                                : answer
                                            }
                                            onChange={handleAnswerChange}
                                            
                                            placeholder="Add What are you doing"
                                            disabled = {listening}
                                           />
                                 {generalSentiment==='Positive'?(
                                 <div className="sentiment-detection" style={{color:'green'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.happy}/></div>):
                                  generalSentiment==='Negative'?(
                                  <div className="sentiment-detection" style={{color:'red'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.sadness}/></div>):
                                  generalSentiment==='Neutral'?(
                                    <div className="sentiment-detection" style={{color:'black'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.neutral}/></div>):('')}
                                 </div>
                                 <div className='micEmotion'  onClick={handleMicClick}>
                                 {listening ?(<FaMicrophoneSlash />):
                                 (<img src={content.images.mic}  alt = 'mic'/>)}
                                 </div>
                                 </div>
                                 <button style={{margin:"2rem"}} className="saveFourStep" type='submit'>Save</button>
                                 </>
                }

                
            </Form>
            </div>

            </div> 
        </div>
        </div>
    </Modal>

                                                                {/* Step Three Modal */}
    <Modal isOpen={emotionSpikeThree} style={content.customStylesThree} onRequestClose={()=> setEmotionSpikeThree(false)} ariaHideApp={false}>
    <div className='emotionSpikeContainer'>
            <div className='stepOneHeader'>Where are you?</div>
            <div className='stepsCaption'>(3/4)</div>
            <div className='feelingClusterContainer primaryalign'>
                <div className='thirdalign thirdStepImageContainer'>
                    <div className={thirdStepResult=="workfromhome"?"activeimage primaryalign":"unactiveimage primaryalign"} onClick={()=>handleThirdStep("workfromhome")}><img src={workfromhome}/><div className='feelingButtonText'>Work from home</div></div>
                    <div className={thirdStepResult=="workfromoffice"?"activeimage primaryalign":"unactiveimage primaryalign"} onClick={()=>handleThirdStep("workfromoffice")}><img src={workfromoffice}/><div className='feelingButtonText'>Work from office</div></div>
                </div>               
            </div>
            <div className='footerEmotionSpike'>
                <div className='primary-btn primaryalign'onClick={handleEmotionSpikeThree}><div className='primary-btn-text'>Next</div></div>
            </div>
        </div>
    </Modal>

                                                                {/* Step Four Modal */}
    <Modal isOpen={emotionSpikeFour} style={content.customStylesOne} onRequestClose={()=> setEmotionSpikeFour(false)} ariaHideApp={false}>
        <div className='primaryalign' style={{width:"100%",height:"100%"}}>
            <div className='stepFourContainer'>
                <div className='primaryalign'>
                    <div className='stepFourHeader'>Would you like to share more details?</div>
                     <div className='fourStepCaption'>(4/4)</div>
                </div>            
            <div className='fourthStepForm '>

                        <div className='textAnalysis'>
                 <div className='negativeWords'><div style={{textDecoration:"underline",fontWeight:"800"}}>Negative Words</div>   <div >{negative.map((neg)=>(<div>{neg}</div>))}</div></div>
                 <div className='positiveWords'><div style={{textDecoration:"underline",fontWeight:"800"}}>Positive Words</div>   <div >{positive.map((pos)=>(<div>{pos}</div>))}</div></div>
            </div>
                <div>
            
            <Form onSubmit={(e)=>{handleSubmitStepFour(e)}} className="secondaryalign">

                 {<>
                    <div className='textAreaEmotion'>
                        <div className="textAreaContent">
                            <textarea 
                                  className='voiceEmotionText' 
                                  id='thought1'
                                    value={
                                                listening && answer
                                                ? answer + " " + currentSpeech
                                                : listening
                                                ? currentSpeech
                                                : answer
                                            }
                                            onChange={handleAnswerChange}
                                            
                                            placeholder="Share Your Details"
                                            disabled = {listening}
                                           />
                                 {generalSentiment==='Positive'?(
                                 <div className="sentiment-detection" style={{color:'green'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.happy}/></div>):
                                  generalSentiment==='Negative'?(
                                  <div className="sentiment-detection" style={{color:'red'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.sadness}/></div>):
                                  generalSentiment==='Neutral'?(
                                    <div className="sentiment-detection" style={{color:'black'}}>{generalSentiment}&nbsp;&nbsp;<img src={content.images.neutral}/></div>):('')}
                                 </div>
                                 <div className='micEmotion'  onClick={handleMicClick}>
                                 {listening ?(<FaMicrophoneSlash />):
                                 (<img src={content.images.mic}  alt = 'mic'/>)}
                                 </div>
                                 </div>
                                 <button style={{margin:"2rem"}} className="saveFourStep" type='submit'>Save</button>
                                 </>
                }

                
            </Form>
            </div>
            </div>
        </div>
        </div>
    </Modal>
   




    

    
       
    </>
  )
}

export default EmotionSpikeFourProcess;