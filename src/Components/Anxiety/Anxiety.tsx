import React , {useState}  from 'react';
import './Anxiety.css'
import content from '../../Assets/Content'
import LineChart from "../DetailedAnalysis/lineChart";

import { useNavigate } from 'react-router-dom';
import lineChart from '../DetailedAnalysis/lineChart';

interface Props  {
    isSad : boolean
}


export const  Anxiety = ({isSad}:Props) => {

    const Navigate = useNavigate();
    const [step,setStep]=useState<number>(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [vis1,setVis1]=useState<number>(2)
    const [vis2,setVis2]=useState<number>(2)
    const [vis3,setVis3]=useState<number>(2)
    const [vis4,setVis4]=useState<number>(2)
    const [vis5,setVis5]=useState<number>(2)
    const [Q,setQ]=useState<number>(1);
    const [text1,setText1]=useState<string>(
`  1. I can’t make a good presentation. 
  2. I always fail at my work                                               
  3. There is no hope for me `)
    const [text2,setText2]=useState<string>(
`  1. No one likes me
  2. I am always left out `)
    const [text3,setText3]=useState<string>(
 `   1. I work on my skills and make impressive         
       presentations
   2. I learn from my failures and succeed
   3. There is always hope for me`)
    const [text4,setText4]=useState<string>(
`    1. My family and friends love me always
    2. People are always interested in talking to me`)
 
    
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
        e!==2?
        (e!==1?
        (
            setStep(e-1)
        ):
        
        (
            Navigate("/healyourself")
        )):(
            Q!==1?(
                setQ(
                    Q-1
                )
            ):(
                setStep(e-1)
            )
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
            e!==2?
            (e!==5?
            (
                setStep(e+1)
            ):
            
            (
                Navigate("/healyourself")
            )):(
                Q!==4?(
                    setQ(
                        Q+1
                    )
                ):(
                    setStep(
                        e+1
                    )
                )
            )
            if(e!==2 && e!==5)
            nexti(e)
            if(e===2 && Q===4)
            nexti(2)
        
        
            }

    return(
        <>
        
       
        <div className='anxiety-section'>

            <div className='anxiety-title'>
            <div className="row1">
                <div className="col1">
                    <img src={content.images.lredarrow} alt='' onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <div className="text" onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}} >Back to Heal Yourself</div>
                    
                </div>
                <div className="col2">
                   {isSad===false? 
                  'Work on Anxiousness or Fear':
                  'Work on Sadness or Loneliness'}

                </div>
            </div>
            <div className="row2">
                {step===1?(
                    <>
                    We know this is tough but we got your back!
                    Let us begin this healing journey of yours.
                    </>
                ):step===2?(
                    <>
                    In this step you get to explore what leads to these feelings and how it affects you.
                    </>
                ):step===3?(
                    <>
                    Check your thoughts again!
                    </>
                ):step===4?(
                    <>
                    You are amazing!
                    </>
                ):(
                    <>
                    Track your emotions and see your growth!
                    </>
                )}
              
            </div>
            </div>

            <div className='anxiety-areas'>

            <div className='area'>
                {step===1?
                (<button className='area-btn1'  onClick={()=>func(1)}>
                 <div className='area-text1'>
                    RECOGNIZE
                 </div>
                 <div className='capsule1'></div>
                </button>):(
                    <button className='area-btn' onClick={()=>func(1)}>
                    <div className='area-text'>
                    RECOGNIZE
                    </div>
                    <div className='capsule'></div>
                   </button>
                   )}
                
               </div>

               <div className='area'>
               {step===2?
                (<button className='area-btn1'  onClick={()=>func(2)}>
                 <div className='area-text1'>
                 EXPLORE
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==2 && vis2===1?(
                    <button className='area-btn' onClick={()=>func(2)}>
                    <div className='area-text'>
                    EXPLORE
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==2 && vis2===2?(
                    <button className='area-btn0' onClick={()=>func(2)}>
                    <div className='area-text0'>
                    EXPLORE
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

               <div className='area'>
               {step===3?
                (<button className='area-btn1'  onClick={()=>func(3)}>
                 <div className='area-text1'>
                    REPLACE
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==3 && vis3===1?(
                    <button className='area-btn' onClick={()=>func(3)}>
                    <div className='area-text'>
                    REPLACE
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==3 && vis3===2?(
                    <button className='area-btn0' onClick={()=>func(3)}>
                    <div className='area-text0'>
                    REPLACE
                    </div>
                    <div className='capsule0'></div>
                   </button>
                ):('')}
               </div>

               

               <div className='area'>
               {step===4?
                (<button className='area-btn1'  onClick={()=>func(4)}>
                 <div className='area-text1'>
                    PRACTICE
                 </div>
                 <div className='capsule1'></div>
                </button>):step!==4 && vis4===1?(
                    <button className='area-btn' onClick={()=>func(4)}>
                    <div className='area-text'>
                    PRACTICE
                    </div>
                    <div className='capsule'></div>
                   </button>
                ):step!==4 && vis4===2?(
                    <button className='area-btn0' onClick={()=>func(4)}>
                    <div className='area-text0'>
                    PRACTICE
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
            <div className='anxiety-question-area'>
                <div className='anxiety-questions'>
              {step===1?
            (<div className='anxiety-step1'>
                <div className='anxiety-step1row1'>
                    <img src={content.images.tick} alt=''/>
                    <div className='anxiety-step1row1text'>
                    You have completed this step by recognizing what you feel!
                    </div>
                </div>

                <div className='anxiety-step1row2'>
                    {isSad===false?
                (<>Feeling fear / worry / anxiousness occasionally is normal.
                Infact these feelings warn us of possible dangers and help us get our work done on time. 
                However experiencing then too often causes a downfall of mental wellbeing. 
                It is a concern when we carry these feelings the whole day that hinders with our daily activities, relationships and work.</>):
                (<>All of us feel lonely at some time or the other. Feeling of sad or lonely are natural and are a part of our emotional health.
                 However when the feeling of sadness or loneliness is increasing and occuring without any reason then it might be caused due to 
                 some other underlying issue. It is better to deal with this emotional distress at early stages to recover soon.</>)}
                </div>

                  
            </div>):
            step===2?
            (<>
                <div className='anxiety-step2'>
                <div className='anxiety-step2row1'>
                Please answer a few questions. If you are not comfortable in typing you can use a paper and pen.
                </div>

                <div className='anxiety-step2row2'>
                   
                    
                    {Q===1?(<>
                   <div className='anxiety-step2row2col1'>
                       
                       <div className='q'>
                        {isSad===false?(<>What triggers your fears or anxiety?</>):(<>What causes you to feel sad or lonely?</>)}</div>
                       <div className='q-mark'>
                        <img src={content.images.circle1} alt =''/>
                    </div>
                    </div>
                   <div className='anxiety-step2row2col2'>
                 <textarea  
                 placeholder=' 1. Add your triggers here...
                               2.                         
                               3.                         '></textarea>
                    </div>
                    </>  ):Q===2?(<>
                   <div className='anxiety-step2row2col1'>
                       
                       <div className='q'>What are the physical symptoms you experience?</div>
                       <div className='q-mark'>
                        <img src={content.images.circle2} alt=''/>
                    </div>
                    </div>
                   <div className='anxiety-step2row2col2'>
                    <textarea  
                    placeholder=' 1. Add your symptoms here...
                                  2.
                                  3.                         '></textarea>
                    </div>
                    </>  ):Q===3?(<>
                   <div className='anxiety-step2row2col1'>
                       
                       <div className='q'>What are your thoughts while going through this?</div>
                       <div className='q-mark'>
                        <img src={content.images.circle3} alt=''/>
                    </div>
                    </div>
                   <div className='anxiety-step2row2col2'>
                    <textarea  placeholder=' 1. Add your thoughts here...
                                             2.
                                             3.                        '></textarea>
                    </div>
                    </>  ):Q===4?(<>
                   <div className='anxiety-step2row2col1'>
                       
                       <div className='q'>{isSad===false?(<>How do you cope with fear or anxiety?</>):(<>How do you cope with sadness or loneliness?</>)}</div>
                       <div className='q-mark'>
                        <img src={content.images.circle4} alt=''/>
                    </div>
                    </div>
                   <div className='anxiety-step2row2col2'>
                    <textarea  placeholder=' 1. Add your coping techniques here...
                                             2.
                                             3.                                  '></textarea>
                    </div>
                    </>  ):('')}
               
                

                 </div> 
            </div>
            </>
            ):step===3?(
                <div className='anxiety-step3'>
                    <div className='anxiety-step3row1'>
                     Read out your thoughts.
                     Ask yourself is their any proof that they are true? Are they rational thoughts? 
                     Can you replace them with better affirmations?
                    </div>

                    <div className='anxiety-step3row2'>
                        <div className='anxiety-s3r2col1'>
                            <div className='Row1'>
                            Your current thoughts
                            </div>
                            <div className='Row2'>
                                {isSad===false?(
                                <textarea 
                                       value={text1}
                                       onChange={(event) => (setText1(event.target.value))}></textarea>):(
                                <textarea 
                                      value={text2}
                                      onChange={(event) => (setText2(event.target.value))}></textarea>)}                
                                               
                            </div>
                        </div>

                        <div className='anxiety-s3r2col2'>
                            <img src={content.images.circle5} alt=''/>
                        </div>

                        <div className='anxiety-s3r2col3'>
                        <div className='Row1'>
                            Positive Affirmations
                            </div>
                            <div className='Row2'>
                            {isSad===false?(
                                <textarea 
                                       value={text3}
                                       onChange={(event) => (setText3(event.target.value))}></textarea>):(
                                <textarea 
                                      value={text4}
                                      onChange={(event) => (setText4(event.target.value))}></textarea>)}  
                            </div>
                        </div>
                    </div>
                </div>

            ):step===4?(
                <div className='anxiety-step4'>
                    <div className='anxiety-step4row1'>
                    {isSad===false?(<>It is time to apply it in life! From now you check your thoughts and use the method below that will help you.</>)
                    :(<>It is time to apply it in life! From now you try applying it your life. Use the method below that will help you.</>)}
                    </div>

                    <div className='anxiety-step4row2'>
                        <img src={content.images.method} alt=''/>
                     </div>
                     </div>

            ):(<LineChart/>)}
            </div>
            
           
            
            <div className='anxiety-btns'>
                           <button className='btn1' onClick={()=>prev(step)}>
                           <img src={content.images.redleftarrow} alt=''/>
                           &nbsp; &nbsp; Back
                           </button>
                           
                           <button className='btn2' onClick={()=>next(step)}>
                             Next &nbsp; &nbsp; 
                            <img src={content.images.redrightarrow} alt=''/>
                           </button>
                               
            </div>
            </div>
        </div>
        </>
    )
}

