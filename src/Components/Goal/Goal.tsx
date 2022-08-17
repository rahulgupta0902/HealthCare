import React, { useState } from 'react';
import ImageMarker, { Marker } from 'react-image-marker';
import Draggable from "react-draggable";
import './Goal.css'
import content from '../../Assets/Content'


import { useNavigate } from 'react-router-dom';


export const  Goal = () => {

    const Navigate = useNavigate();
    const [step,setStep]=useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [vis1,setVis1]=useState(2)
    const [vis2,setVis2]=useState(2)
    const [vis3,setVis3]=useState(2)
    const [vis4,setVis4]=useState(2)
    const [vis5,setVis5]=useState(2)

    
    const [markers, setMarkers] = useState<Array<Marker>>([
        { top: 45.5, left: 47.5 },
    ]);

    const CustomMarker = () => {
        
        return (
            
            <Draggable>
            <img  src={content.images.mark1} alt=''/>
            </Draggable>
        )
    };
    
   const func = (e: number) => {
    setStep(e)

    e===1?(
        setVis1(
            1
        )
    ):e===2?(
        setVis2(
            1
        )
    ):e===3?(
        setVis3(
            1
        )
    ):e===4?(
        setVis4(
            1
        )
    ):(
        setVis5(
            1
        )
    )

    }

    const prev = (e: number) => {
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
            ):e+1===5?(
               setVis5(1)
            ):(
                Navigate("/healyourself")
            )
        }
    
        const next = (e: number) => {
            e!==5?
            (
                setStep(e+1)
            ):
            
            (
                Navigate("/healyourself")
            )
            if(e!==5 )
            nexti(e)
            
                    }
        
    return(
        <>
           
        <div className='goal-section'>

            <div className='goal-title'>
            <div className="row1">
                <div className="col1">
                    <img src={content.images.lredarrow} alt='' onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <div className="text" onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}>Back to Heal Yourself</div>
                    
                </div>
                <div className="col2">
                 Goal Setting
                </div>
            </div>
            <div className="row2">
             Try this Bull’s-Eye Values Survey for recognizing your goals
            </div>
            </div>

            <div className='goal-areas'>

            <div className='area'>
                {step===1?
                (<button className='area-btn1'  onClick={()=>func(1)}>
                 <div className='area-text1'>
                    VALUES
                 </div>
                 <div className='capsule1'></div>
                </button>):(
                    <button className='area-btn' onClick={()=>func(1)}>
                    <div className='area-text'>
                    VALUES
                    </div>
                    <div className='capsule'></div>
                   </button>
                   )}
                
               </div>

               <div className='area'>
               {step===2?
                (<button className='area-btn1'  onClick={()=>func(2)}>
                 <div className='area-text1'>
                 MARK
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==2 && vis2===1?(
                    <button className='area-btn' onClick={()=>func(2)}>
                    <div className='area-text'>
                    MARK
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==2 && vis2===2?(
                    <button className='area-btn0' onClick={()=>func(2)}>
                    <div className='area-text0'>
                    MARK
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

               <div className='area'>
               {step===3?
                (<button className='area-btn1'  onClick={()=>func(3)}>
                 <div className='area-text1'>
                    OBSTACLES
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==3 && vis3===1?(
                    <button className='area-btn' onClick={()=>func(3)}>
                    <div className='area-text'>
                    OBSTACLES
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==3 && vis3===2?(
                    <button className='area-btn0' onClick={()=>func(3)}>
                    <div className='area-text0'>
                    OBSTACLES
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

               

               <div className='area'>
               {step===4?
                (<button className='area-btn1'  onClick={()=>func(4)}>
                 <div className='area-text1'>
                    PLAN
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==4 && vis4===1?(
                    <button className='area-btn' onClick={()=>func(4)}>
                    <div className='area-text'>
                    PLAN
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==4 && vis4===2?(
                    <button className='area-btn0' onClick={()=>func(4)}>
                    <div className='area-text0'>
                    PLAN
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

               <div className='area'>
               {step===5?
                (<button className='area-btn1'  onClick={()=>func(5)}>
                 <div className='area-text1'>
                    TRACK
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==5 && vis5===1?(
                    <button className='area-btn' onClick={()=>func(5)}>
                    <div className='area-text'>
                    TRACK
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==5 && vis5===2?(
                    <button className='area-btn0' onClick={()=>func(5)}>
                    <div className='area-text0'>
                    TRACK
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

            </div>
            <div className='goal-question-area'>
                <div className='goal-questions'>
              {step===1?
            (<div className='goal-step1'>
                <div className='goal-step1row1'>
                    Here we use the Bull‘s-Eye Values Survey to help you recognize your goals with your values and advance you towards them 
                </div>

                <div className='goal-step1row2'>
                   <div className='goal-step1row2col1'>
                     <div className='goal-step1row2col1row1'>
                      <img src={content.images.pic1} alt=''/>
                      <textarea  placeholder='Add your health related values here...'/>
                     </div>
                     <div className='goal-step1row2col1row2'>
                      <img src={content.images.pic2} alt=''/>
                      <textarea  placeholder='Add your work or education related values here...'/>
                     </div>
                   </div>
                   <div className='goal-step1row2col2'>
                    <div className='goal-step1row2col2row1'>
                     <img src={content.images.pic3} alt=''/>
                     <textarea  placeholder='Add your relationship related values here...'/>
                    </div>
                    <div className='goal-step1row2col2row2'>
                     <img src={content.images.pic4} alt=''/>
                     <textarea  placeholder='Add your leisure related values here...'/>
                    </div>
                   </div>
                </div>

                <div className='goal-step1row3'>Tool developed by Tobias Lundgren.</div>

                  
            </div>):
            step===2?
            (<>
                <div className='goal-step2'>
                 <div className='goal-step2row1'>
                 Now according to the values mark how far you are from your goal
                 </div>
                 <div className='goal-step2row2'>
                 <ImageMarker
                    src={content.images.target}
                    markers={markers}
                    onAddMarker={(marker: Marker) =>
                        setMarkers([...markers, marker])
                    }
                    markerComponent={CustomMarker}
                />
                 
                 </div>
                 <div className='goal-step2row3'>
                  Tool developed by Tobias Lundgren.
                 </div>

                

                 
                </div>
            </>
            ):step===3?(<div className='goal-step3'>
            <div className='goal-step3row1'>
            Specify the obstacles standing in your way to acheive your goal
            </div>

            <div className='goal-step3row2'>
               <div className='goal-step3row2col1'>
                 <div className='goal-step3row2col1row1'>
                  
                  <textarea  placeholder='Obstacle 1...'/>
                 </div>
                 <div className='goal-step3row2col1row2'>
                  
                  <textarea  placeholder='Obstacle 2...'/>
                 </div>
               </div>
               <div className='goal-step3row2col2'>
                <div className='goal-step1row2col2row1'>
                 
                 <textarea  placeholder='Obstacle 3...'/>
                </div>
                <div className='goal-step3row2col2row2'>
                 
                 <textarea  placeholder='Obstacle 4...'/>
                </div>
               </div>
            </div>

            <div className='goal-step3row3'>Tool developed by Tobias Lundgren.</div>

              
        </div>):step===4?(<div className='goal-step1'>
            <div className='goal-step1row1'>
            Now plan how you will overcome these to reach your target life
            </div>

            <div className='goal-step1row2'>
               <div className='goal-step1row2col1'>
                 <div className='goal-step1row2col1row1'>
                  <img src={content.images.pic5} alt=''/>
                  <textarea  placeholder='Add your health related values here...'/>
                 </div>
                 <div className='goal-step1row2col1row2'>
                  <img src={content.images.pic6} alt=''/>
                  <textarea  placeholder='Add your work or education related values here...'/>
                 </div>
               </div>
               <div className='goal-step1row2col2'>
                <div className='goal-step1row2col2row1'>
                 <img src={content.images.pic7} alt=''/>
                 <textarea  placeholder='Add your relationship related values here...'/>
                </div>
                <div className='goal-step1row2col2row2'>
                 <img src={content.images.pic8} alt=''/>
                 <textarea  placeholder='Add your leisure related values here...'/>
                </div>
               </div>
            </div>

            <div className='goal-step1row3'>Tool developed by Tobias Lundgren.</div>

              
        </div>):(<div className='goal-step2'>
            <div className='goal-step2row1'>
            Track your goals here
            </div>
            <div className='goal-step2row2'>
            <ImageMarker
               src={content.images.target}
               markers={markers}
               onAddMarker={(marker: Marker) =>
                   setMarkers([...markers, marker])
               }
               markerComponent={CustomMarker}
           />
            
            </div>
            <div className='goal-step2row3'>
             Tool developed by Tobias Lundgren.
            </div>
           </div>)}
            </div>
            
           
            
            <div className='goal-btns'>
                           <button className='btn1' onClick={()=>prev(step)}>
                           <img src={content.images.redleftarrow} alt=''/>
                           &nbsp; &nbsp; Back
                           </button>
                           
                           <button className='btn2'onClick={()=>next(step)}>
                             Next &nbsp; &nbsp; 
                            <img src={content.images.redrightarrow} alt=''/>
                           </button>
                               
            </div>
            </div>
        </div>
        </>
    )
}

