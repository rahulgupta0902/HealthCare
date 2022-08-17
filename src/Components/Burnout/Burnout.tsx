import React, { useState , useEffect, useRef } from 'react';
import './Burnout.css'
import content from '../../Assets/Content'
import { useNavigate } from 'react-router';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Webcam from 'react-webcam';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Chart, Line } from "react-chartjs-2";

import {
  loadModels,
  detectFaces,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  drawResults,
  getEmojiForEmotion
} from "../PhQ9/utils"

export const  Burnout = () => {

    const Navigate = useNavigate();
    const [burnoutAns,setBurnoutAns] = useState<number[]>([-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [array,setArray] = useState<number[]>([0,0,0,0,0])
    const [scorePersonal,setScorePersonal] = useState<number>(0)
    const [scoreWork,setScoreWork] = useState<number>(0)
    const [scoreWorkPeople,setScoreWorkPeople] = useState<number>(0)
    const [labelPersonal,setLabelPersonal] = useState<string>('')
    const [labelWork,setLabelWork] = useState<string>('')
    const [labelWorkPeople,setLabelWorkPeople] = useState<string>('')
    const [vis2,setVis2]=useState<number>(2)
    const [vis3,setVis3]=useState<number>(2)
    const [step,setStep]=useState<number>(1)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const videoElement = React.useRef<any>(null)
    const [burnoutQs] = useState<string[]>([
    'A1. How often do you feel tired?','A2. How often are you physically exhausted?','A3. How often are you emotionally exhausted?	',
    'A4. How often do you think: "I can\'t take it anymore"?','A5. How often do you feel worn out?','A6. How often do you feel weak and susceptible to illness?',
    'B1. Is your work emotionally exhausting?','B2. Do you feel burnt out because of your work?','B3. Does your work frustrate you?',
    'B4. Do you feel worn out at the end of the working day?','B5. Are you exhausted in the morning at the thought of another day at work?',
    'B6. Do you feel that every working hour is tiring for you?','B7. Do you have enough energy for family and friends during leisure time?',
    'C1. Do you find it hard to work with clients or your superiors at work?','C2. Do you find it frustrating to work with clients or your superiors at work?',
    'C3. Does it drain your energy to work with clients or your superiors at work?','C4. Do you feel that you give more than you get back when you work with clients or your superiors at work?',
    'C5. Are you tired of working with clients?','C6. Do you sometimes wonder how long you will be able to continue working with clients?' 
    ]);


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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const stopCam = () => {
    // let stream = videoElement?.current?.stream;
    // const tracks = stream.getTracks();
    // tracks.forEach((track: { stop: () => any; }) => track.stop());
    processInterval && clearInterval(processInterval);
    setIsShowVideo(false);
  }
  //camera portion ends
    
    /*const stopCam = () => {
      let stream = videoElement?.current?.stream;
      const tracks = stream.getTracks();
      tracks.forEach((track: { stop: () => any; }) => track.stop());
      setIsShowVideo(false);
    }*/

    const calcpoint = (index: number , idx :number,check : boolean) => {
            
        const checkboxes = document.querySelectorAll("input[name=" + CSS.escape(String(index)) + "]") as NodeListOf<HTMLInputElement>
        let x = [...burnoutAns]

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
                x[index]=idx
                f=1
            }})
    
            if(f===0)
            x[index] = -1
    
            setBurnoutAns(x)
    }

    useEffect(() => {
      
        let x1=0,x2=0,x3=0
        for(let i=0;i<=5;i++)
        x1+=5-burnoutAns[i]
        for(let i=6;i<=12;i++)
        x2+=5-burnoutAns[i]
        for(let i=13;i<=18;i++)
        x3+=5-burnoutAns[i]

        setScorePersonal(x1)
        setScoreWork(x2)
        setScoreWorkPeople(x3)

        if(scorePersonal/30<=0.2)
        setLabelPersonal('low')
        else if(scorePersonal/30>0.2 && scorePersonal/30<=0.4)
        setLabelPersonal('moderately low')
        else if(scorePersonal/30>0.4 && scorePersonal/30<=0.6)
        setLabelPersonal('medium')
        else if(scorePersonal/30>0.6 && scorePersonal/30<=0.8)
        setLabelPersonal('moderately high')
        else if(scorePersonal/30>0.8 && scorePersonal/30<=1)
        setLabelPersonal('high')

        if(scoreWork/35<=0.2)
        setLabelWork('low')
        else if(scoreWork/35>0.2 && scoreWork/35<=0.4)
        setLabelWork('moderately low')
        else if(scoreWork/35>0.4 && scoreWork/35<=0.6)
        setLabelWork('medium')
        else if(scoreWork/35>0.6 && scoreWork/35<=0.8)
        setLabelWork('moderately high')
        else if(scoreWork/35>0.8 && scoreWork/35<=1)
        setLabelWork('high')

        if(scoreWorkPeople/30<=0.2)
        setLabelWorkPeople('low')
        else if(scoreWorkPeople/30>0.2 && scoreWorkPeople/30<=0.4)
        setLabelWorkPeople('moderately low')
        else if(scoreWorkPeople/30>0.4 && scoreWorkPeople/30<=0.6)
        setLabelWorkPeople('medium')
        else if(scoreWorkPeople/30>0.6 && scoreWorkPeople/30<=0.8)
        setLabelWorkPeople('moderately high')
        else if(scoreWorkPeople/30>0.8 && scoreWorkPeople/30<=1)
        setLabelWorkPeople('high')


        
      },[burnoutAns, scorePersonal, scoreWork, scoreWorkPeople])
      
     
    const go_to_nextpage_or_not = (i:number,j:number) => {
      let f=0,g=0
      burnoutAns.slice(i,j).map((value,index) => {
    
        return (
        (value===-1)?(
          
          (g===0)?
          (g++,
          alert('Please answer all the questions')):
          ('')
        
        
        ):(f++ )
    
        )})
        
          if(step===3)
          {
           
            console.log(labelPersonal,labelWork,labelWorkPeople);}
            if(f===j-i)
          (
            next(step)
          )
            //next(step)
    }



    const func = (e: number) => {
        
        setStep(e)
        
        e===2?(
            setVis2(
                1
            )
        ):(
            setVis3(
                1
            )
        )


    }
    const nexti = (e:number) => {
        e+1===2?(
            setVis2(1)
        ):e+1===3?(
            setVis3(1)
        ):(
          Navigate("/healyourself")
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
    
    const next = (e:number) => {
        e!==4?
        (
            setStep(e+1)
            
            
        ):
        
        (
            Navigate("/healyourself")
        )
        if(e!==3)
        nexti(e)
    }

    const defaultGraphData = {
      labels: ['','11 July','12 July','','','','',''],
      datasets:[  
        {label: 'high', // Name the series
         // eslint-disable-next-line no-sparse-arrays
         data: [,,2,,,,,],
         // Specify the data values array
         pointRadius: 7.5,
              
        backgroundColor: '#AA333C',// Add custom color background (Points and Fill)
        showLine: false 
      },
    
        {label:'moderately high', // Name the series
        data: [], // Specify the data values array
        pointRadius: 7.5,
          
        backgroundColor: '#DF444A',// Add custom color background (Points and Fill)
        showLine: false 
      },
        {label:'medium', // Name the series
        // eslint-disable-next-line no-sparse-arrays
        data: [,1,,,,,,], // Specify the data values array
        pointRadius: 7.5,
            
        backgroundColor: '#E6878A',// Add custom color background (Points and Fill)
        showLine: false 
      },
        {label: 'moderately low', // Name the series
        // eslint-disable-next-line no-sparse-arrays
        data: [,,1,,,,,], // Specify the data values array
        pointRadius: 7.5,
            
        backgroundColor: '#FCC9C5',// Add custom color background (Points and Fill)
        showLine: false 
      },
       {label:'low', // Name the series
       // eslint-disable-next-line no-sparse-arrays
       data: [,2,3,,,,,], // Specify the data values array
       pointRadius: 7.5,
          
      backgroundColor: '#FFE0DD', // Add custom color background (Points and Fill)
      showLine: false 
       }]
}

  const options :any = {
   plugins :{
    legend:{
      labels:{
      usePointStyle:true,
      pointStyle:'circle',
      padding:20},
      position:'top',
      align: "end",
    },
  },
  scales: {
    x:  {
   
      display: true,
      
      grid: {
        display: false
      }
    } ,
    y:  {
      display: true,
      lines: false,
      ticks : {
        type :'string',
        callback : function vari(value:any,index:any){
          if(value===1){
            return 'PERSONAL'
          }   
          else if(value === 2){
            return 'WORK'
          }     
          else if(value === 3){
            return 'WORK PEOPLE'
          }           
        }
      },
    } 
}}





    return(
        <>
    
        <div className='burn-section'>

            <div className='burn-title'>
            <div className="row1">
                <div className="col1">
                    <img src={content.images.lredarrow} alt='' onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <div className="text" onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}>Back to Heal Yourself</div>
                    
                </div>
                <div className="col2">
                    Discover Myself
                </div>
            </div>
            <div className="row2">
             Burnout Tool allows you to assess how you feel about your personal life, work,
             and cliental work in order to determine whether you are at risk of burnout.
            </div>
            </div>

            <div className='burn-areas'>
             {step<=3?(<>
            <div className='burn-area'>
                {step===1?
                (<button className='burn-area-btn1'  onClick={()=>func(1)}>
                 <div className='burn-area-text1'>
                    PERSONAL
                 </div>
                 <div className='burn-capsule1'></div>
                </button>):(
                    <button className='burn-area-btn' onClick={()=>func(1)}>
                    <div className='burn-area-text'>
                    PERSONAL
                    </div>
                    <div className='burn-capsule'></div>
                   </button>
                   )}
                
               </div>

               <div className='burn-area'>
               {step===2?
                (<button className='burn-area-btn1'  onClick={()=>func(2)}>
                 <div className='burn-area-text1'>
                 WORK
                 </div>
                 <div className='burn-capsule1'></div>
                </button>):step!==2 && vis2===1?(
                    <button className='burn-area-btn' onClick={()=>func(2)}>
                    <div className='burn-area-text'>
                    WORK
                    </div>
                    <div className='burn-capsule'></div>
                   </button>
                ):step!==2 && vis2===2?(
                    <button className='burn-area-btn0' onClick={()=>func(2)}>
                    <div className='burn-area-text0'>
                    WORK
                    </div>
                    <div className='burn-capsule0'></div>
                   </button>
                ):('')}
               </div>

               <div className='burn-area'>
               {step===3?
                (<button className='burn-area-btn1'  onClick={()=>func(3)}>
                 <div className='burn-area-text1'>
                    WORK PEOPLE
                 </div>
                 <div className='burn-capsule1'></div>
                </button>):step!==3 && vis3===1?(
                    <button className='burn-area-btn' onClick={()=>func(3)}>
                    <div className='burn-area-text'>
                    WORK PEOPLE
                    </div>
                    <div className='burn-capsule'></div>
                   </button>
                ):step!==3 && vis3===2?(
                    <button className='burn-area-btn0' onClick={()=>func(3)}>
                    <div className='burn-area-text0'>
                    WORK PEOPLE
                    </div>
                    <div className='burn-capsule0'></div>
                   </button>
                ):('')}
               </div>
               </>):(
                <div className="result-area">Results</div>
                )}
            </div>
            <div className='burn-question-area'>
            <img src={content.images.leftflower} alt=''/>
            {!isShowVideo?(
            <div className='burn-questions'>
                {step <= 3 ? (<>
                  <div className="burn-question-heading">
                    <div className="burn-question-title">
                      <div className='burn-question-title1'>
                        Please, rate the frequency of each situation with further statement.
                      </div>
                      <div className='burn-question-title2'>
                        Refer to the last 3 to 6 months.
                      </div>
                    </div>
                    <div className='camera' style={{ cursor: 'pointer' }} onClick={startCam}><img src={content.images.cameraOn} alt=''/>Try with camera</div>

                  </div>

                  <div className='scroll'>
                    {step === 1 ? (

                      <div className='burn-q2'>
                        {burnoutQs.slice(0, 6).map((value, index) => {
                          return (<>
                            <div className='burn-q-text' key={index}>{value}</div>
                            <div className='options'>
                              <div className='options-row1'>
                                 {
                                  array.map((value,i) => {
                                        return(<>
                                          {burnoutAns[index] === i ? (
                                            <input type='checkbox' name={String(index)} id={String(index) + '-' + String(i)} checked={true} onChange={() => calcpoint(index, i, false)}></input>) : (
                                            <input type='checkbox' name={String(index)} id={String(index) + '-' + String(i)} checked={false} onChange={() => calcpoint(index, i, true)}></input>
                                          )}
                                          {i!==4?
                                          <hr />:
                                          ('')}
                                          </>
                                        )
                                  })
                                 }
                              </div>

                              <div className='options-row2'>
                                <div className='always'>Always</div>
                                <div className='often'>Often</div>
                                <div className='seldom'>Seldom</div>
                                <div className='sometimes'>Sometimes</div>
                                <div className='never'>Never</div>
                              </div>
                            </div>
                          </>
                          );
                        })}
                      </div>

                    ) : step === 2 ? (

                      <div className='burn-q2'>
                        {burnoutQs.slice(6, 13).map((value, index) => {
                          return (<>
                            <div className='burn-q-text' key={index + 6}>{value}</div>
                            <div className='options'>
                              <div className='options1-row1'>

                              {
                                  array.map((value,i) => {
                                        return(<>
                                          {burnoutAns[index+6] === i ? (
                                            <input type='checkbox' name={String(index+6)} id={String(index+6) + '-' + String(i)} checked={true} onChange={() => calcpoint(index+6, i, false)}></input>) : (
                                            <input type='checkbox' name={String(index+6)} id={String(index+6) + '-' + String(i)} checked={false} onChange={() => calcpoint(index+6, i, true)}></input>
                                          )}
                                          {i!==4?
                                          <hr />:
                                          ('')}
                                          </>
                                        )
                                  })
                                 }
                              </div>

                              <div className='options-row2'>
                                <div className='always'>Always</div>
                                <div className='often'>Often</div>
                                <div className='seldom'>Seldom</div>
                                <div className='sometimes'>Sometimes</div>
                                <div className='never'>Never</div>
                              </div>
                            </div>
                          </>
                          );
                        })}
                      </div>
                    ) : (
                      <div className='burn-q2'>
                        {burnoutQs.slice(13, 19).map((value, index) => {
                          return (<>
                            <div className='burn-q-text' key={index + 13}>{value}</div>
                            <div className='options'>
                              <div className='options-row1'>
                              {
                                  array.map((value,i) => {
                                        return(<>
                                          {burnoutAns[index+13] === i ? (
                                            <input type='checkbox' name={String(index+13)} id={String(index+13) + '-' + String(i)} checked={true} onChange={() => calcpoint(index+13, i, false)}></input>) : (
                                            <input type='checkbox' name={String(index+13)} id={String(index+13) + '-' + String(i)} checked={false} onChange={() => calcpoint(index+13, i, true)}></input>
                                          )}
                                          {i!==4?
                                          <hr />:
                                          ('')}
                                          </>
                                        )
                                  })
                                 }
                              </div>

                              <div className='options-row2'>
                                <div className='always'>Always</div>
                                <div className='often'>Often</div>
                                <div className='seldom'>Seldom</div>
                                <div className='sometimes'>Sometimes</div>
                                <div className='never'>Never</div>
                              </div>
                            </div>
                          </>
                          );
                        })}
                      </div>
                    )}
                  </div>

                </>) : (
                  <div className="result-wrapper">
                    <div className="result-row1">
                      <div className="text">Your Burnout - Brain fog analysis</div>
                      <div className="image">
                        <img src={content.images.notice} alt="" />
                      </div>

                    </div>
                    <div className="result-row2">
                      <div className="result-row2-col1">
                        <div className="text1">
                       Your analysis today shows that you are most burned out with your work. Please go to our healing for anxiousness to help you with this.
                       </div>
                       <div className="text2">
                       Take small breaks in between and also try out our psycology safety analysis tool to help you know where and when you need to take care during your work. 
                       </div>
                       <button >Retake in 7 days</button>
                      </div>
                      <div className="result-row2-col2">
                      <Line                
                        data= {defaultGraphData}
                        style={{width:"100%" ,height:'95%',maxHeight:"400px",overflow:"hidden"}}
                        options = {options}
                      />
                      </div>
                    </div>
                  </div>
                )}
                </div>):(

                <div className='burn-questions-2'>
                  <div className="burn-questions-2-col1">
                    <div className="burn-question-2-heading">
                      <div className="burn-question-2-title">
                        <div className='burn-question-title1'>
                          Please, rate the frequency of each situation with further statement.
                          Refer to the last 3 to 6 months.
                        </div>
                      </div>


                    </div>

                    <div className='scroll'>
                      {step === 1 ? (

                        <div className='burn-q2'>
                          {burnoutQs.slice(0, 6).map((value, index) => {
                            return (<>
                              <div className='burn-q-text' key={index}>{value}</div>
                              <div className='options'>
                                <div className='options-row1'>
                                  {
                                  array.map((value,i) => {
                                        return(<>
                                          {burnoutAns[index] === i ? (
                                            <input type='checkbox' name={String(index)} id={String(index) + '-' + String(i)} checked={true} onChange={() => calcpoint(index, i, false)}></input>) : (
                                            <input type='checkbox' name={String(index)} id={String(index) + '-' + String(i)} checked={false} onChange={() => calcpoint(index, i, true)}></input>
                                          )}
                                          {i!==4?
                                          <hr />:
                                          ('')}
                                          </>
                                        )
                                  })
                                 }
                                </div>

                                <div className='options-row2'>
                                  <div className='always'>Always</div>
                                  <div className='often'>Often</div>
                                  <div className='seldom'>Seldom</div>
                                  <div className='sometimes'>Sometimes</div>
                                  <div className='never'>Never</div>
                                </div>
                              </div>
                            </>
                            );
                          })}
                        </div>

                      ) : step === 2 ? (

                        <div className='burn-q2'>
                          {burnoutQs.slice(6, 13).map((value, index) => {
                            return (<>
                              <div className='burn-q-text' key={index + 6}>{value}</div>
                              <div className='options'>
                                <div className='options1-row1'>
                                {
                                  array.map((value,i) => {
                                        return(<>
                                          {burnoutAns[index+6] === i ? (
                                            <input type='checkbox' name={String(index+6)} id={String(index+6) + '-' + String(i)} checked={true} onChange={() => calcpoint(index+6, i, false)}></input>) : (
                                            <input type='checkbox' name={String(index+6)} id={String(index+6) + '-' + String(i)} checked={false} onChange={() => calcpoint(index+6, i, true)}></input>
                                          )}
                                          {i!==4?
                                          <hr />:
                                          ('')}
                                          </>
                                        )
                                  })
                                 }
                                </div>

                                <div className='options-row2'>
                                  <div className='always'>Always</div>
                                  <div className='often'>Often</div>
                                  <div className='seldom'>Seldom</div>
                                  <div className='sometimes'>Sometimes</div>
                                  <div className='never'>Never</div>
                                </div>
                              </div>
                            </>
                            );
                          })}
                        </div>
                      ) : (
                        <div className='burn-q2'>
                          {burnoutQs.slice(13, 19).map((value, index) => {
                            return (<>
                              <div className='burn-q-text' key={index + 13}>{value}</div>
                              <div className='options'>
                                <div className='options-row1'>
                                {
                                  array.map((value,i) => {
                                        return(<>
                                          {burnoutAns[index+13] === i ? (
                                            <input type='checkbox' name={String(index+13)} id={String(index+13) + '-' + String(i)} checked={true} onChange={() => calcpoint(index+13, i, false)}></input>) : (
                                            <input type='checkbox' name={String(index+13)} id={String(index+13) + '-' + String(i)} checked={false} onChange={() => calcpoint(index+13, i, true)}></input>
                                          )}
                                          {i!==4?
                                          <hr />:
                                          ('')}
                                          </>
                                        )
                                  })
                                 }
                                </div>

                                <div className='options-row2'>
                                  <div className='always'>Always</div>
                                  <div className='often'>Often</div>
                                  <div className='seldom'>Seldom</div>
                                  <div className='sometimes'>Sometimes</div>
                                  <div className='never'>Never</div>
                                </div>


                              </div>
                            </>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='burn-questions-2-col2'>
                    <div className='camera2' style={{ cursor: 'pointer' }} onClick={() => (setIsShowVideo(false))}><img src={content.images.cameraOff} alt=''/>&nbsp;&nbsp;&nbsp;&nbsp;Switch off Camera</div>

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

                )

                }

                <img src={content.images.rightflower} alt=''/>
              </div><div className='burn-btns'>
                  <button className='btn1' onClick={() => prev(step)}>
                    <img src={content.images.redleftarrow} alt=''/>
                    &nbsp; &nbsp; Back
                  </button>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  <button className='btn2'
                    onClick={() => {
                      step === 1 ? (
                        (go_to_nextpage_or_not(0, 6))
                      ) :
                        step === 2 ? (
                          (go_to_nextpage_or_not(6, 13))
                        ) :
                          step === 3 ? (
                            (go_to_nextpage_or_not(13, 19))
                          ) : (
                            Navigate('/phq9')
                          );
                    } }

                  >
                    Next &nbsp; &nbsp;
                    <img src={content.images.redrightarrow} onClick={() => { Navigate('/phq9'); } } alt=''/>
                  </button>

                </div><div className='burn-ending'>
                  This tool uses an informal approach to assessing burnout. While it may be intuitively useful,
                  it has not been validated through controlled scientific tests and must therefore not be used
                  as a diagnostic technique. P
                </div>
        </div>
        </>
    )
}

