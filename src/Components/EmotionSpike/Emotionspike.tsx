import React,{useState} from 'react';
import "./Emotionspike.css"
import Modal from 'react-modal';
import content from '../../Assets/Content';
import Healingicon from "../../Assets/emotionspike/Healingicon.png"
import { useNavigate } from 'react-router';
import { PhQ9 } from '../PhQ9/PhQ9';

interface Props{
    name : string
}

type handleVoidFunction=() => void;

const Emotionspike = () => {
    const Navigate = useNavigate();

    //State Varibale for Showing Pop up of Emotion Add
    const [emotionAdd,setEmotionAdd] = React.useState<boolean>(false);
    
    //State Variable for Showing Phq9 pop up Modal
    const [emotionSpikePhq9,setEmotionSpikePhq9] = React.useState<boolean>(false);

   //Store the feeling added by the user
    const [feeling,setFeeling] = React.useState<string>("........");
    


   //Function to redirect to phq9 section
    const handleEmotionSpikePhq9:handleVoidFunction =()=>{
        setEmotionAdd(false);
        Navigate('/phq9')
    }

    //Function to select the emotion add
    const handleEmotionSelect = (name :string) =>{
        console.log(name)       
        setFeeling(name)
      
    }

    //Function to save the answer 
    const handleSave:handleVoidFunction = ()=>{
        console.log(`Your Emotion has been Saved ${feeling}`)
        setEmotionAdd(false)
        Navigate("/dashboard")
    }
    
    
  return (
    <>
                                                        {/* Emotion Add Modal */}
    <Modal isOpen={emotionAdd} style={content.customStylesOne} onRequestClose={()=> setEmotionAdd(false)} ariaHideApp={false}>
      <div className='escontent'>
             <div className='subheader' style={{color : "black",marginBottom:"2rem"}}>How would you like to describe your mood?</div>
             <div className='esemotions'> 
                 {                    
                    content.EmotionSpikeIcons.map((emotion)=>(
                        <div className={emotion.name==feeling?emotion.background:""} onClick={()=>handleEmotionSelect(emotion.name)}><img src={emotion.emotion} defaultValue={emotion.emotion}/></div>
                    ))
                    
                }
            </div>
            <div className='secondaryalign btns'>
                <div className='subcaption' style={{color : "black"}}>
                I am feeling <span style={{fontWeight:800}}>{feeling}</span>
                </div>
                <div className='primary-btn primaryalign'onClick={handleSave}><div className='primary-btn-text'>Save</div></div>
            </div>
        </div> 
    </Modal>

                                                    {/* PHQ9 Emotion Spike Modal        */}
       <Modal isOpen={emotionSpikePhq9} style={content.customStylesModal} onRequestClose={()=> setEmotionSpikePhq9(false)} ariaHideApp={false}>
       <div className='emotionSpikeContainer'>
           <div className='modalicon'><img src={Healingicon}/></div>
           <div className='modalheader modalFonts'>Hey! We noticed a spike in your emotions.</div>
           <div className='modalrequest modalFonts'>Can you please share what are you feeling?</div>
           <div className='btns'>
               <div className='secondary-btn primaryalign' onClick={()=>(setEmotionSpikePhq9(false))}><div className='secondary-btn-text'>No</div></div>
               <div className='primary-btn primaryalign' onClick={handleEmotionSpikePhq9}><div className='primary-btn-text'>Yes</div></div>
           </div> 
       </div>
   </Modal>
   </>
  )
}

export default Emotionspike