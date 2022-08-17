import React from 'react';
import Modal from 'react-modal';
import content from '../../Assets/Content';

const WelcomeModal = () => {
    const [welcome,setWelcome]=React.useState<boolean>(true);
  
    const customStylesWelcome:any  ={
      
        content : {
          top                   : '50%',
          left                  : '50%',
          right                 : 'auto',
          bottom                : 'auto',
          marginRight           : '-50%',
          transform             : 'translate(-50%, -50%)',
          background      : 'radial-gradient(100% 100% at 0% 0%, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          width                  : '33vw',
          height                 : "27vh",
          boxShadow              :  "inset -5px -5px 250px rgba(255, 255, 255, 0.2)" ,
          
        }
    };
  return (
    <>
        <Modal isOpen={welcome} style={customStylesWelcome} onRequestClose={()=> setWelcome(false)} ariaHideApp={false}>
           <div className='welcomeContainer'>
                <div className='welcomeLogo'><img src={content.images.IBY} style={{display:"flex",alignItems:"center",margin:"auto"}}/></div>
                <div className='welcomeContent'>
                    <div className='welcomeHeader'>Welcome to IBY</div>
                    <div className='welcomepara'>Our AI-assisted communication will make it easier for you to keep check on your emotions and regulate your mood on a regular basis.</div>
                    <div className='letsGetStarted primaryalign' onClick={()=>(setWelcome(false))}><div className='letsGetStartedText'>Let's get started</div></div>
                </div>
           </div>
        </Modal>
    </>
  )
}

export default WelcomeModal