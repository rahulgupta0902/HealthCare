import React from 'react';
import content from '../../Assets/Content'
import './Heal1.css'


export const Heal1 = () => {

    return( 
      <div className='heal1-content'>

     
          
          <div className='heal1-body'>
              <div className='text-1'>
              Hello Sam!
              </div>
              <div className='text-2'>
              Self healing is a gradual process and let us help you with it! Congratulations for taking the first step!
              </div>
              <div className='image1'>
              <img className='heart' src={content.images.heart} alt = ''/>
              </div>
              <div className='text-3'>
              What do you wish to work on?
              </div>
              <div className='heal1-options'>
                  <div className='heal1-col1'>
                  <img className='flowerleft' src={content.images.flowerleft} alt = '' />
                   
                  </div>

                  <div className='heal1-col2'>
                  <div className='anxious'>
                    <div className='anxious-img-div'>
                    <img className='anxious-img' src={content.images.anxious} alt = '' />
                    </div>
                    <div className='anxious-text'>
                    Anxiousness / Fear
                    </div>
                  </div>

                  <div className='sad'>
                    <div className='sad-img-div'>
                    <img className='sad-img' src={content.images.sad} alt = ''/>
                    </div>
                    <div className='sad-text'>
                    Sadness / Loneliness
                    </div>
                  </div>
                

                  
                   </div>
                  <div className='heal1-col3'>
                  <div className='relax'>
                    <div className='relax-img-div'>
                    <img className='relax-img' src={content.images.relax} alt = ''/>
                    </div>
                    <div className='relax-text'>
                    Relaxation
                    </div>
                  </div>

                  <div className='discover'>
                    <div className='discover-img-div'>
                    <img className='discover-img' src={content.images.discover} alt = ''/>
                    </div>
                    <div className='discover-text'>
                    Discovering Myself
                    </div>
                  </div>

                  <div className='calm'>
                    <img className='calm-img' src={content.images.calmness} alt = ''/>
                  </div>

                  </div>

                  <div className='heal1-col4'>
                  <div className='set-goal'>
                    <div className='set-goal-img-div'>
                    <img className='set-goal-img' src={content.images.setgoal} alt = ''/>
                    </div>
                    <div className='set-goal-text'>
                    Setting Goals
                    </div>
                  </div>

                  <div className='align'>
                    <div className='align-img-div'>
                    <img className='align-img' src={content.images.align} alt = ''/>
                    </div>
                    <div className='align-text'>
                    Aligning Myself
                    </div>
                  </div>
                  </div>

                  <div className='heal1-col5'>
                  <img className='Flowerright' src={content.images.Flowerright} alt = '' />
                  </div>

              </div>
    </div>

    </div>
      )}