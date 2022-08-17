import React, { useEffect, useRef, useState } from 'react';
import './Phq9.css'
import content from '../../Assets/Content'
import { useNavigate } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Webcam from "react-webcam";
import {
  loadModels,
  detectFaces,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drawResults,
  getEmojiForEmotion
} from "./utils"

export const  PhQ9 = () => {
  const Navigate = useNavigate(); 
  const [step,setStep] = useState<number>(1);
  const [score,setScore] = useState<number>(0);
  const [phq9Qs] = useState([
    '1. Little interest or pleasure in doing things?',
    '2. Feeling down, depressed, or hopeless?',
    '3. Trouble falling or staying asleep, or sleeping too much?',
    '4. Feeling tired or having little energy?',
    '5. Poor appetite or overeating?',
    '6. Feeling bad about yourself-or that you are a failure or have let yourself or your family down?',
    '7. Trouble concentrating on things, such as reading the newspaper or watching television?',
    '8. Moving or speaking so slowly that other people could have noticed? Or so fidgety or restless that you have been moving a lot more than usual?',
    '9. Thoughts that you would be better off dead, or thoughts of hurting yourself in some way?'
  ])
  const [phq9Ans,setPhq9Ans] = useState<number[]>([-1,-1,-1,-1,-1,-1,-1,-1,-1])
  const [array] = useState<number[]>([0,0,0,0])

  useEffect(()=>{
    let x=0;
    // eslint-disable-next-line array-callback-return
    phq9Ans.map((value) => {
      x+=value;
    }
    )
    setScore(x)
    },[phq9Ans]);


  /**
   * Emotion Recognition
   */
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [processInterval, setProcessInterval] = useState<NodeJS.Timer | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState<boolean>(false);
  const [emotion, setEmotion] = useState<string>("neutral");
  const [emoji, setEmoji] = useState<string>(getEmojiForEmotion("neutral"));
  const [isShowVideo, setIsShowVideo] = useState(false);

  // loading faceapi models when component is mounted
  useEffect(() => {
    loadFaceapiModels();
  }, [modelsLoaded]);

  // adding event listener to resize event
  // as the canvas overlay should be having exactly the same dimensions as video element
  useEffect(() => {
    const handleResize = () => {
      if (videoRef && videoRef.current && canvasRef && canvasRef.current) {
        canvasRef.current.width = videoRef.current.getBoundingClientRect().width;
        canvasRef.current.height = videoRef.current.getBoundingClientRect().height;
      }
    };
    window.addEventListener("resize", handleResize);

    // removing event listener when component is unmounted
    return () => {window.removeEventListener("resize", handleResize)};
  }, []);

  const loadVideo = () => {
    navigator.mediaDevices.getUserMedia({audio: false, video: true})
    .then((videoStream) => {
      if (videoRef!==null && videoRef.current!==null && videoRef.current!==undefined) {
        videoRef.current.srcObject = videoStream;
        console.log("Log: Loaded VideoStream.");
      }
    })
    .catch((err) => {console.log("Log: Error while getting video stream: ", err)});
  };

  const loadFaceapiModels = () => {
    loadModels()
    .then(() => {
      setModelsLoaded(true);
      console.log("Log: Loaded Faceapi models.")
    })
    .catch((err) => {console.log("Log: Error while loading faceapi models: ", err)});
  };

  const processVideoStream = () => {
    if (!modelsLoaded || videoRef===null || videoRef.current===null || videoRef.current===undefined) {
      return;
    }
    detectFaces(videoRef.current)
    .then(async (info) => {
      if (info === null) {
        return;
      }
      else if (info.length > 0) {
        console.log("Log: Info: ", info)
        // drawing results to canvas
        // canvasRef && canvasRef.current && await drawResults(videoElement.current, canvasRef.current, info, "boxLandmarks");
        if (canvasRef && canvasRef.current) {
          const context = canvasRef.current.getContext("2d");
          if (context) {
            context?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            context.strokeStyle="aqua";
            context.strokeRect(
              info[0].detection.box.x,
              info[0].detection.box.y,
              info[0].detection.box.width,
              info[0].detection.box.height
            );
          }
        }
        // updating emotion and emoji
        let maxEmotion = "neutral", maxValue = Number.NEGATIVE_INFINITY;
        Object.entries(info[0].expressions).forEach(([emotionName, emotionValue]) => {
          if (emotionValue > maxValue) {
            maxEmotion = emotionName;
            maxValue = emotionValue;
          }
        });
        setEmotion(maxEmotion);
        setEmoji(getEmojiForEmotion(maxEmotion));
      }
    })
    .catch((err) => {console.error(new Error("Log: Error while detecting faces: ", err))})
  };




  /**
   * Camera
   */
  // const [isShowVideo, setIsShowVideo] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const videoElement = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    }
  const startCam = () => {
    loadVideo();
    setIsShowVideo(true);
    const interval = setInterval(() => {processVideoStream()}, 200);
    setProcessInterval(interval);
  }
  const stopCam = () => {
    // let stream = videoElement?.current?.stream;
    // const tracks = stream.getTracks();
    // tracks.forEach((track: { stop: () => any; }) => track.stop());
    processInterval && clearInterval(processInterval);
    setIsShowVideo(false);
  }
  //camera portion ends




  const calcpoint = (index: number , idx :number,check : boolean) => {
    const checkboxes = document.querySelectorAll("input[name=" + CSS.escape(String(index)) + "]") as NodeListOf<HTMLInputElement>
    let x = [...phq9Ans]
    checkboxes.forEach((checkbox,item) => {
        if(item!==idx)
        checkbox.checked = false;
        else
        checkbox.checked = check;
    })
    let f=0
    checkboxes.forEach((checkbox,idx) => {
        if(checkbox.checked)
        {
            idx===0?
            (x[index] = 0):
            idx===1?
            (x[index] = 1):
            idx===2?
            (x[index] = 2):
            (x[index] = 3)
            f=1
        }})
        if(f===0)
        x[index] = -1
        setPhq9Ans(x)
  }
  const gotnextpage_or_not = () => {
  let f=0,g=0
  phq9Ans.map((value,index) => {
    return (
    (value===-1)?(
      
      (g===0)?
      (g++,
      alert('Please answer all the questions')):
      ('')
    ):(f++ )
    )})
    if(f===9)
      (
        setStep(2)
      )
  }



    
    return(
        <>
        <div className='phq9-section'>
            <div className='phq9-title'>
            PHQ-9 (Patient Health Questionnaire-9) Objectifies degree of depression severity.
            </div>
            <div className='phq9-areas'>
              Advice: Final diagnosis should be made with clinical interview and mental status
              examination including assessment of patient’s level of distress and functional impairment.
            </div>
            <div className='phq9-question-area'>
            <img src={content.images.leftflower} alt=''/>
            {step===1 && !isShowVideo?(
            <div className='phq9-questions'>
                <div className='phq9-question-title'>
                <div className='question-title1' >
                How often have you been bothered by the following over the past 2 weeks?
                </div>
                <div className='camera' style = {{cursor:'pointer'}} onClick={startCam}><img src={content.images.cameraOn} alt = ''/>Try with camera</div>
                </div>
                  <div className='scroll'>
                         {phq9Qs.map((value, index) => {
                          return (
                                      <>
                                      <div className='q1'>
                                      <div className='q1-text' key={index}>{value}</div>
                                      <div className='Options'>
                                      <div className='Options-row1'>
                                      {
                                  array.map((value,i) => {
                                        return(<>
                                          {phq9Ans[index] === i ? (
                                            <input type='checkbox' name={String(index)} id={String(index) + '-' + String(i)} checked={true} onChange={() => calcpoint(index, i, false)}></input>) : (
                                            <input type='checkbox' name={String(index)} id={String(index) + '-' + String(i)} checked={false} onChange={() => calcpoint(index, i, true)}></input>
                                          )}
                                          {i!==3?
                                          <hr />:
                                          ('')}
                                          </>
                                        )
                                  })
                                 }
                                      </div>

                                      <div className='Options-row2'>
                                          <div>Not at all</div>
                                          <div className='several-days'>Several Days</div>
                                          <div>More than Half the days</div>
                                          <div>Nearly every day</div>
                                      </div>
                                      </div>
                                      </div>
                                      </>
                                 )})}
                  </div>
            </div>):step===1 && isShowVideo?(
                <div className='phq9-questions-2'>  
                  <div className='phq9-questions-2-col1'>
                <div className='question2-title1'>
                How often have you been bothered by the following over the past 2 weeks?
                </div>   
                  <div className='scroll-2'>    
                         {phq9Qs.map((value, index) => {
                          return (<>
                            <div className='q1'>
                            <div className='q1-text' key={index}>{value}</div>
                            <div className='Options2'>
                            <div className='Options2-row1'>
                                      {
                                  array.map((value,i) => {
                                        return(<>
                                          {phq9Ans[index] === i ? (
                                            <input type='checkbox' name={String(index)} id={String(index) + '-' + String(i)} checked={true} onChange={() => calcpoint(index, i, false)}></input>) : (
                                            <input type='checkbox' name={String(index)} id={String(index) + '-' + String(i)} checked={false} onChange={() => calcpoint(index, i, true)}></input>
                                          )}
                                          {i!==3?
                                          <hr />:
                                          ('')}
                                          </>
                                        )
                                  })
                                 }
                            </div>
                            <div className='Options2-row2'>
                                <div>Not at all</div>
                                <div className='several-days'>Several Days</div>
                                <div>More than Half the days</div>
                                <div>Nearly every day</div>
                            </div>
                            </div>
                            </div>
                            </>)})}
                  </div>
                  </div>
                  <div className='phq9-questions-2-col2'>
                  <div className='camera2' style = {{cursor:'pointer'}} onClick={stopCam}><img src={content.images.cameraOff} alt = ''/>&nbsp;&nbsp;&nbsp;&nbsp;Switch off Camera</div> 

                    <div className="camView">

                      {isShowVideo &&
                        // <Webcam audio={false} ref={videoElement} videoConstraints={videoConstraints}  />
                        <>
                          <video
                            ref={videoRef}
                            // width={640}
                            // height={480}
                            autoPlay
                            muted
                            playsInline
                          />
                          {videoRef && videoRef.current && <canvas
                            ref={canvasRef}
                            width={videoRef.current.getBoundingClientRect().width}
                            height={videoRef.current.getBoundingClientRect().height}
                          />}
                        </>
                      }
                      {/*********Camera emotion analysis starts********/}
                        <div className="emotion-analysis">
                          {emotion}&nbsp;&nbsp;<img src={emoji} alt="" />
                        </div>
                      {/*********Camera emotion analysis ends********/}

                    </div>
                  
                  </div>
                  </div>

                  
            ):(
              <div className='phq9-questions3'>
                <div className='phq9-question3-title'>
                Remember that this is not the final diagnosis and you will need to consult a profesional doctor for the diagnosis and assesment. </div>
                
                  <div className='result'>
                  
                         
                           <div className='result-col1'>
                             <div className='result-col1-row1'>
                               You have scored a 
                             </div>
                             <div className='result-col1-row2' >
                                   {score}&nbsp;&nbsp;&nbsp;&nbsp;
                                   <div className='bar'></div>
                                   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{3*phq9Ans.length}                                                                                                                                                                                                                                                  
                             </div>
                           </div>
                           <div className='result-col2'>
                             {score<=4?(
                              'Your score suggests minimal depression which may not require treatment. You may go through our relaxation exercises.')
                              :score>=5 && score<=9?(
                                'Your score suggests mild depression which may require only watchful waiting and repeated PHQ-9 at followup. You may go through our relaxation exercises.')
                                :score>=10 && score<=14?(
                                 'Your score suggests moderate depression severity, patients should have a treatment plan ranging form counseling, followup, and/or pharmacotherapy. You may go through our relaxation exercises.')
                                    :score>=15 && score<=19?(
                                       'Your score suggests moderately severe depression, patients typically should have immediate initiation of pharmacotherapy and/or psychotherapy. You may go through our relaxation exercises.'):
                                          'Your score suggests severe depression, patients typically should have immediate initiation of pharmacotherapy and expedited referral to mental health specialist. You may go through our relaxation exercises.'
                             }
                           </div>
                        
                  </div>
            </div>
            )}
            <img src={content.images.rightflower} alt = '' />
            </div>
            <div className='phq9-btns'>
                           <button className='btn1'
                           onClick = {
                            step===1?(
                              () => (Navigate('/burnout'))
                            ):(
                             () => (setStep(1))
                            )
                          } >
                           <img src={content.images.redleftarrow}
                            alt ='' />
                           &nbsp; &nbsp; Back
                           </button>
                          
                           <button className='btn2'
                           onClick = {
                            step===1?(
                             () => (gotnextpage_or_not())):(
                              () => (Navigate('/dashboard'))
                             )}
                          >
                             Next &nbsp; &nbsp; 
                            <img src={content.images.redrightarrow}
                            alt ='' />
                           </button>
                               
            </div>
            <div className='phq9-ending' >
              This tool uses an informal approach to assessing burnout. While it may be intuitively useful,
              it has not been validated through controlled scientific tests and must therefore not be used
              as a diagnostic technique. P 
            </div>
        </div>
        </>
    )
}
