import React,{useState} from 'react';
import Modal from 'react-modal';
import content from '../../Assets/Content';
import Healingicon from "../../Assets/emotionspike/Healingicon.png";
import "./Healpop.css"




const Healpopup = () => {
    //State Variable for Opening the heal exercise modal
    const [modalIsOpen,setModalIsOpen] = React.useState<boolean>(true);

    //state variable to show video or not
    const [video,setVideo] = React.useState<boolean>(false);

    //state variable to control the video end modal
    const [isVideoEnded,setIsVideoEnded] = React.useState<boolean>(false);

    const handleVideo =()=>{        
        setVideo(true)
    }
  //Function called when video is ended
    const handleVideoEnded = ()=>{
        console.log("Video Ended");
        setIsVideoEnded(true)
    }

    //Function after called when the more exercise button is clicked
    const handleExercises = ()=>{
        setIsVideoEnded(false);
        setVideo(false)
        setModalIsOpen(false);
        
    }
  return (
    <>
                                                {/* Modal to show the healing exercise */}
       <Modal isOpen={modalIsOpen} style={content.customStylesOne} onRequestClose={()=> setModalIsOpen(false)} ariaHideApp={false}>
       {video ?
       <div className='healpopupcontainer'>
            <video controls style={{width:"100%",height:"100%"}} onEnded={handleVideoEnded}>
                <source src="./healpopup.mp4" type="video/mp4"/>
            </video>
       </div>
        :<>
        <div className='healpopupcontainer'>
                <div><img src={Healingicon}/></div>
                <div className='subcaption'>Hey! your analysis suggest that you might be experiencing emotional imbalance.</div>
                <div className='subheader' style={{textAlign:"center"}}>Please consider taking this one minute breathing exercies to recenter your emotions.</div>
                <div className='btns'>                    
                    <div className='primary-btn primaryalign' onClick={handleVideo} ><div className='primary-btn-text'>Start</div></div>
                </div>
            </div></>} 
    </Modal>

                                                {/* Modal to show when video is ended */}
    <Modal isOpen={isVideoEnded} style={content.customStylesOne} onRequestClose={()=> setIsVideoEnded(false)} ariaHideApp={false}>
        <div className='healpopupcontainer'>
            <div className='healVideoEndHeader'>Firstly, let us do the take 5 breathing exercise to center ourself.</div>
            <div className='videoEndSecondRow'>
                <div className='videoEndHandImage'><img src={content.HealPopUpVideoEndImages.openhandvideoend}/></div>
                <div className='videoEndNextContent'>
                    <div className='videoendsubpara'>Use this method to center yourself anytime while feeling instability</div>
                    <div className='btnsVideoEnd'>
                        <div><img src={content.HealPopUpVideoEndImages.arrowupvideoend}/>Breathe in</div>
                        <div><img src={content.HealPopUpVideoEndImages.arrowdownvideoend}/>Breathe out</div>
                    </div>
                    <div className='videoEndBtn primaryalign' onClick={handleExercises}><div>Move Forward When You Feel Centered <span><img src={content.HealPopUpVideoEndImages.sidearrowvideoend}/></span></div></div>
                </div>
            </div>

        </div>

    </Modal>

    
    </>
    
  )
}

export default Healpopup;