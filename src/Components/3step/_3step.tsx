import React , {useState} from 'react';
import content from '../../Assets/Content'
import '../../Components/Relaxation/Relaxation.css'

export const _3step = () => {
                           
        const [step,setStep]=useState<number>(1);
        const next = (step: number) => {
            setStep(
                step + 1,
            )
            };
        const zero = (step: number) => {
            setStep(
                1,
            )
        }
    
        return(
            <>
            <div className='relax-row2col2row1'>
                Connect with the present moment by studying, engaging with and naming, in the place you actually are in,
                right now, where it is safe: 3 things you can See.3 things you can Hear. 3 things you can Feel.
            </div>
            <div className='relax-row2col2row2'>
                {step===1? (
                    
                    <>
                    <div className='top'>
                        Relax and let’s start:</div>
                    <div className='play'>
                        <img className='playimage' src={content.images.play44} onClick={() => next(step)} alt=''/>
                    </div>
                    </>

                ): step===2?(
                
                    <>
                    <div className='wrap'>
                      <div className='eye1'>
                        <img src={content.images.eye1} alt=''/>
                      </div>
                      <div className='eye1text'>
                        <div className='eye1text1'>
                          Look around and name 3 things that you can see
                        </div>
                        <div className='eye1text2'>
                          Example patterns in tiles, leaves of plants or anything that you find interesting
                        </div>
                      </div>
                    </div>
                    <div className='farrow'>
                       <img className='farrowimg' src={content.images.farrow} onClick={() => next(step)} alt=''/>
                    </div>
                    </>

                ):step===3?(
                   
                   <>
                    <div className='wrap'>
                    <div className='eye1'>
                    <img src={content.images.girl} alt=''/>
                    </div>
                    <div className='eye1text'>
                    <div className='eye1text1'>
                    Focus on 3 things that you can feel
                    </div>
                    <div className='eye1text2'>
                    Example the wind in your hair, the texture of the clothes you are wearing, the sunlight on your skin
                    </div>
                    <div className='farrow'>
                    <img className='farrowimg' src={content.images.farrow} onClick={() => next(step)} alt=''/>
                    </div>
                    </div>
                    </div>
                    </>

                ):step===4?(

                    <>
                    <div className='wrap'>
                    <div className='eye1'>
                    <img src={content.images.ear} alt=''/>
                    </div>
                    <div className='eye1text'>
                    <div className='eye1text1'>
                    Listen to any 3 sounds
                    </div>
                    <div className='eye1text2'>
                    Example ticking of the clock, tree leaves moving, distant traffic or any other sound that interests you
                    </div>
                    <div className='farrow'>
                    <img className='farrowimg' src={content.images.farrow} onClick={() => next(step)} alt=''/>
                    </div>
                    </div>
                    </div>
                    </>

                ):(
                   
                    <>
                    <div className='bottom'>
                    <div className='wheart'>
                    <img className='wheartimg' src={content.images.wheart} alt=''/>
                    <div className='bottom1text'>
                    Hey you did well do you want to try again?
                    </div>
                    <img className='wheartimg' src={content.images.wheart} alt=''/>
                    </div>
                    <div className='bplay'>
                    <img className='playimage' src={content.images.play44} onClick={() => zero(step)} alt=''/>
                    </div>
                    </div>
                    </>

                )
                }
            </div>
            </>
)}