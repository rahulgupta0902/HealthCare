import React from 'react'
import content from '../../Assets/Content'
import { useNavigate } from 'react-router'
import './Home.css'



export const Home = () => {
   
  const Navigate = useNavigate();

  return (
   <>   
    <div className='home-conatiner'>
      <div className='selfCare'><img src={content.images.homeselfcaregif} className="selfcare-image"/></div>
      <div className='home-content'>
        <div className='textupper'>
          <div ><span className='bold-text'>Care</span> instead of critisize.</div>
          <div ><span className='bold-text'>Understand</span> instead of stigmatize.</div>
        </div>
        <div className='middletext'>
          <div className='middle-one' >Your Skin glows, your hair shines, your mind is more positive, you think more clearly and your sel-esteem is boosted when you havea healthy mind.</div>
          <div >You are choosing self-love above self-judgement by prioritising your mental wellness.You are choosing yourself, your mental & physical health, and your self-assurance over world's expectations.</div>
          <div className='choose-you'>Choose you!</div>
       </div>   
        <div className='btns'>
            <div className='primary-btn primaryalign' onClick={()=>Navigate('/dashboard')}><div className='primary-btn-text'>Mood Compass</div></div>
            <div className='primary-btn primaryalign' onClick={()=>Navigate('/healyourself')}><div className='primary-btn-text'>Heal Journey</div></div>
        </div>   
    </div>
   </div>
  </>
  )
}
