import React,{useState} from 'react';

import content from '../../Assets/Content'


import './Meditation.css'
import Timer from '../Timer/Timer';

export const Meditation = () => {
    
    const [step,setStep]=useState<number>(1);
  
    const previous = (step: number) => {
        setStep(
         step - 1,
        )
      }
    const next = (step: number) => {
        setStep(
         step + 1,
        )
      };
    
    return (
        <>
                           <div className='Meditation-row2col2'>
                             <>
                             <div className='Meditation-row2col2row1'>
                             Meditation can give you a sense of calm, peace and balance that can benefit both your emotional well-being and your overall health. Here is a simple way to practice a quick meditation. </div>
                             <div className='Meditation-row2col2row2'>
                              {step===1? (<>
                              <div className='top'>
                                  Relax and let’s start:
                             </div>
                              <div className='bottom'>
                                 <img className='playimage' src={content.images.play} onClick={() => next(step)} alt = ''/>
                             </div>
                             </>):step===2?
                             (
                                 <>

                             <div className='wrap1'>
                             <div className='Meditation-meditate'>
                                 <img className='Meditation-meditateimg' src={content.images.meditateimg} alt = ''/>
                             </div>

                             <div className='wrap2'>
                             <div className='Meditation-meditate-text'>
                             Sit comfortably on the floor with legs crossed, or on a chair with a straight back.
                             </div>
                             <div className='arrow'>
                                 <img className='farrowimg' src={content.images.barrow} onClick={() => previous(step)} alt = ''/>
                                 <img className='barrowimg' src={content.images.farrow} onClick={() => next(step)} alt = ''/>
                             </div>
                             </div>

                             </div>
                            
                             </>
                             ):step===3?(
                                 <>
                                  

                             <div className='wrap1'>
                             <div className='Meditation-meditate'>
                                 <img className='Meditation-meditateimg' src={content.images.meditateimg} alt = ''/>
                             </div>

                             <div className='wrap2'>
                             <div className='Meditation-meditate-text'>
                             Focus on your breathing, such as the rising and falling of the belly, or the flow of air in and out of your nose.
                             </div>
                             <div className='arrow'>
                                 <img className='farrowimg' src={content.images.barrow} onClick={() => previous(step)} alt = ''/>
                                 <img className='barrowimg' src={content.images.farrow} onClick={() => next(step)} alt = ''/>
                             </div>
                             </div>

                             </div>
                             
                                 </>

                             ):step===4?(
                                <>
                                <div className='wrap1'>
                             <div className='Meditation-meditate'>
                                 <img className='Meditation-meditateimg' src={content.images.meditateimg} alt = ''/>
                             </div>

                             <div className='wrap2'>
                             <div className='Meditation-meditate-text'>
                             Once you’ve managed to concentrate on your breathing, expand your awareness to the other sounds and sensations around you.</div>
                             <div className='arrow'>
                                 <img className='farrowimg' src={content.images.barrow} onClick={() => previous(step)} alt = ''/>
                                 <img className='barrowimg' src={content.images.farrow} onClick={() => next(step)} alt = ''/>
                             </div>
                             </div>

                             </div>
                            
                                </>

                             ):step===5?(
                                <>
                                <div className='wrap1'>
                             <div className='Meditation-meditate'>
                                 <img className='Meditation-meditateimg' src={content.images.meditateimg} alt = ''/>
                             </div>

                             <div className='wrap2'>
                             <div className='Meditation-meditate-text'>
                             If thoughts enter your mind, let them go and re-focus on the breath.</div>
                             <div className='arrow'>
                                 <img className='farrowimg' src={content.images.barrow} onClick={() => previous(step)} alt = ''/>
                                 <img className='barrowimg' src={content.images.farrow} onClick={() => next(step)} alt = ''/>
                             </div>
                             </div>

                             </div>
                            
                                </>
                             ):step===6?(
                                <>
                                <div className='wrap1'>
                             <div className='Meditation-meditate'>
                                 <img className='Meditation-meditateimg' src={content.images.meditateimg} alt = ''/>
                             </div>

                             <div className='wrap2'>
                             <div className='Meditation-meditate-text1'>
                             As soon as this is mastered, begin to expand your awareness once again.</div>
                             <Timer/>
                             <div className='arrow1'>
                                 <img className='farrowimg' src={content.images.barrow} onClick={() => previous(step)} alt = ''/>
                                 <img className='barrowimg' src={content.images.farrow} onClick={() => next(step)} alt = ''/>
                             </div>
                             </div>

                             </div>
                            
                                </>
                             ):(
                                <>
                                <div className='wrap11'>
                             <div className='Play'>
                                 <img className='Meditation-meditateimg' src={content.images.play} onClick={()=>setStep(1)} alt = ''/>
                             </div>

                             <div className='wrap2'>
                             <div className='emotions-text'>
                             Great you have finished a session. Let us know how you feel or try again.</div>
                             <div className='emotions-select'>
                                 <img className='happy' src={content.images.happy2} alt = ''></img>
                                 <img className='sad' src={content.images.sadness2} alt = ''></img>
                                 <img className='neutral' src={content.images.neutral2} alt = ''></img>
                                 <img className='surprise' src={content.images.surprise2} alt = ''></img>
                                 <img className='irritated' src={content.images.irritated} alt = ''></img>
                                 <img className='anger' src={content.images.anger2} alt = ''></img>
                                 <img className='confusion' src={content.images.confusion} alt = ''></img>
                             </div>
                             <div className='write'>
                                 <textarea  placeholder='Write your experience here...' className='write-exp'></textarea>
                             </div>
                             </div>

                             </div>
                                
                                
                               </>
                             )
                            }
                             </div>
                             </>
                          </div>
                     </>
                   
    )
}
