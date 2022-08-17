import React , {useState} from 'react';
import Carousel, { CarouselItem } from './Carousel'
import content from '../../Assets/Content'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import './Heal2.css'


export const Heal2 = () => {

  const Navigate = useNavigate();   
  const [array] = useState<number[]>([0,0,0,0,0,0])
  const [reminder1removeoption,setReminder1RemoveOption] = useState<number>(0);
  const [reminder2removeoption,setReminder2RemoveOption] = useState<number>(0);
  const [step,setStep]=useState<number>(1);
  const [edit,setEdit] = useState<boolean>(false);
  const [choosefeeling1,setChooseFeeling1] = useState<boolean>(false)
  const [choosefeeling2,setChooseFeeling2] = useState<boolean>(false)
  const [removeReminder1popup1,setRemoveReminder1popup1]=useState<boolean>(false);
  const [removeReminder1popup2,setRemoveReminder1popup2]=useState<boolean>(false);
  const [removeReminder2popup1,setRemoveReminder2popup1]=useState<boolean>(false);
  const [removeReminder2popup2,setRemoveReminder2popup2]=useState<boolean>(false);
  const [thought1,setThought1] = useState<string>('I work on my skills and make impressive presentations');
  const [thought2,setThought2] = useState<string>('I learn from my failures and succeed.');
  const [thought3,setThought3] = useState<string>(' There is always hope for me.');
  const [thought4,setThought4] = useState<string>('I will need sometime to adjust my routine to get back to office. Till then I can continue working as a responsible employee from home.');
  const input1 = document.getElementById('message') as HTMLInputElement | null;

  const func = () => {
    (step%26)!==0 ?
    setStep(
        step+1
    )
    :(
        setStep(
            1
        )
    )  
        if(input1!= null)
        input1.value = '';
  }

  const handleReminder1popup1 = () =>{
      
    if(reminder1removeoption===0)
     alert('Please choose one option before going ahead!')
    else{
     setRemoveReminder1popup1(false)
     setRemoveReminder1popup2(true)
     reminder1removeoption===1?
     console.log('I meditate on my own!'):
     reminder1removeoption===2?
     console.log('I can\'t find time today'):
     console.log('This does not help me')
    }

  }

  const handleReminder2popup1 = () =>{
    if(reminder2removeoption===0)
    alert('Please choose one option before going ahead!')
    else
    {
    setRemoveReminder2popup1(false)
    setRemoveReminder2popup2(true)
    reminder2removeoption===1?
    console.log('I meditate on my own!'):
    reminder2removeoption===2?
    console.log('I can\'t find time today'):
    console.log('This does not help me')}
  }

    const handleReminder1popup2 = () =>{
      if((document.getElementById('emotion1') as HTMLTextAreaElement).value === null || choosefeeling1===false) 
      alert('Please choose an emotion and give some feedback.')
      else
      { 
        setRemoveReminder1popup2(false);
        console.log('Your feedback has been submitted successfully!');
        (document.getElementById('exrem1') as HTMLDivElement).style.display='none'
    }}

    const handleReminder2popup2 = () =>{
      if((document.getElementById('emotion2') as HTMLTextAreaElement).value === null || choosefeeling2===false) 
      alert('Please choose an emotion and give some feedback.')
      else
      {
        
        setRemoveReminder2popup2(false)
        console.log('Your feedback has been submitted successfully!');
        (document.getElementById('exrem2') as HTMLDivElement).style.display='none'
    }}
    //Feel Review Function
    const handleFeelReview1 = () => {
      // const response = await postFeeling();
      console.log("Feeling Has been sent");
      setChooseFeeling1(true)
  }

  //Feel Review Function
  const handleFeelReview2 = () => {
    // const response = await postFeeling();
    console.log("Feeling Has been sent");
    setChooseFeeling2(true)
}
    
    return( 
        <> 
       <div className='heal2-content'>
   
            <div className='card1'>
         <div className='thoughts'>
            <div className='thoughts-text1'>
            Hello Sam!
            </div>
            <div className='thoughts-text2'>
            Here are your thoughts and exercise reminders. Continue healing with us.
            </div>

          <Carousel>

            <CarouselItem >
              <>
              <div className="carousel-item" >
              <div className = 'slide' onMouseLeave = {()=>setEdit(false)}>
               <img className='heart' src={content.images.heart} alt=''/>
               <div className='thoughtstext'>
                <textarea disabled={!edit} value={thought1} onChange={(event)=>setThought1(event.target.value)} />
                <div className='edit'>
                  <img src={content.images.edit} onClick={()=>setEdit(true)} alt=''/>
                </div>
               </div>
               </div>
               </div>
               </>
              
            </CarouselItem>
            
            <CarouselItem>
               <>
               <div className="carousel-item" >
               <div className = 'slide'  onMouseLeave = {()=>setEdit(false)}>
               <img className='heart' src={content.images.heart} alt=''/>
               <div className='thoughtstext'>
               <textarea disabled={!edit} value={thought2} onChange={(event)=>setThought2(event.target.value)}/>
               <div className='edit'>
                  <img src={content.images.edit} onClick={()=>setEdit(true)} alt=''/>
                </div>
               </div>
               </div>
               </div>
               </>
            </CarouselItem>
            
            <CarouselItem>
               <>
               <div className="carousel-item" >
               <div className = 'slide'  onMouseLeave = {()=>setEdit(false)}>
               <img className='heart' src={content.images.heart} alt=''/>
               <div className='thoughtstext'>
               <textarea disabled={!edit} value={thought3} onChange={(event)=>setThought3(event.target.value)}/>
               <div className='edit'>
                  <img src={content.images.edit} onClick={()=>setEdit(true)} alt=''/>
                </div>
               </div>
               </div>
               </div>
               </>
            </CarouselItem>

            <CarouselItem>
               <>
               <div className="carousel-item" >
               <div className = 'slide'  onMouseLeave = {()=>setEdit(false)}>
               <img className='heart' src={content.images.heart} alt=''/>
               <div className='thoughtstext'>
               <textarea disabled={!edit} value={thought4} onChange={(event)=>setThought4(event.target.value)}/>
               <div className='edit'>
                  <img src={content.images.edit} onClick={()=>setEdit(true)} alt=''/>
                </div>
                   </div>
               </div>
               </div>
               </>
            </CarouselItem>

          </Carousel>
  </div>

  <div className='line'></div>

  <div className="exercise-reminder1" id='exrem1'>
    <div className="text">5 step relaxation</div>
    <div className="not-today" style={{cursor:'pointer'}} onClick = {()=>setRemoveReminder1popup1(true)}>
      <img src={content.images.notToday} alt=''/>
      <div className="not-today-text">Not Today</div>
    </div>
    <div className="start" style={{cursor:'pointer'}}  onClick = {()=>Navigate('/relaxation')}>
      <img src={content.images.start} alt=''/>
      <div className="start-text">Start</div>
    </div>
  </div>

  <div className="exercise-reminder2" id='exrem2'>
    <div className="text">Meditation Reminder</div>
    <div className="not-today" style={{cursor:'pointer'}} onClick = {()=>setRemoveReminder2popup1(true)}>
      <img src={content.images.notToday} alt=''/>
      <div className="not-today-text">Not Today</div>
    </div>
    <div className="start" style={{cursor:'pointer'}} onClick = {()=>Navigate('/relaxation')}>
      <img src={content.images.start} alt=''/>
      <div className="start-text">Start</div>
    </div>
  </div>
            {/*Modal1*/}
        <Modal isOpen={removeReminder1popup1} style={content.customStylesModal} onRequestClose={()=> setRemoveReminder1popup1(false)} ariaHideApp={false}>
            <div className='modal-reminder1'>
                <div className="row1">
                  <img src={content.images.cross} style ={{cursor:'pointer'}} onClick={ () => setRemoveReminder1popup1(false) } alt=''/>
                </div>
                <div className="row2">
                  <div className="r1">Hey sure we will remove the 5 step exercise reminder for today!</div>
                  <div className="r2"><img src={content.images.heart} alt=''/></div>
                  <div className="r3">Please share why you want to remove it?</div>
                  <div className="r4">
                    <button 
                    onClick={()=>setReminder1RemoveOption(1)}
                    style = {
                      reminder1removeoption===1?(
                        {background:'#6F9792',color:'white'}
                      ):(
                        {background:'white',color:'black'}
                      )
                    }
                    >
                      I meditated on my own!
                    </button>
                    <button 
                    onClick={()=>setReminder1RemoveOption(2)}
                    style = {
                      reminder1removeoption===2?(
                        {background:'#6F9792',color:'white'}
                      ):(
                        {background:'white',color:'black'}
                      )

                    }
                    >
                      I can’t find time today!
                    </button>
                    <button 
                    onClick={()=>setReminder1RemoveOption(3)}
                    style = {
                      reminder1removeoption===3?(
                        {background:'#6F9792',color:'white'}
                        ):(
                          {background:'white',color:'black'}
                      )

                    }
                    >
                      This does not help me.
                    </button>
                  </div>
                  <div className="r5" style={{cursor:'pointer'}} onClick={()=>{handleReminder1popup1()}}>
                    Next<img src={content.images.start} alt=''/>
                  </div>
                </div>
            </div>
        </Modal>

           {/*Modal2*/}

        <Modal isOpen={removeReminder1popup2} style={content.customStylesModal} onRequestClose={()=> setRemoveReminder1popup2(false)} ariaHideApp={false}>
            <div className='modal-reminder1'>
                <div className="row1">
                  <img src={content.images.cross} style ={{cursor:'pointer'}} onClick={()=>setRemoveReminder1popup2(false)} alt=''/>
                </div>
                <div className="row2">
                  <div className="r1">Hey sure we will remove the Meditation reminder for today!</div>
                  <div className="r2">Please let us know how you felt. How we can help you better</div>
                  <div className="r3">{content.smallIcons.map((icon)=>(<div onClick={()=>handleFeelReview1()} ><img src={icon} style={{cursor:'pointer'}} className="selectFeelingBoxBreathing" alt=''/></div>))}</div>
                  <div className="r4">
                    <textarea id='emotion1' placeholder='Write your experience here...'/>
                
                  </div>
                  <div className="r5" >
                    <button onClick={()=>handleReminder1popup2()}>Submit</button>
                  </div>
                </div>
            </div>
        </Modal>
              
              {/*Modal3*/}


        <Modal isOpen={removeReminder2popup1} style={content.customStylesModal} onRequestClose={()=> setRemoveReminder2popup1(false)} ariaHideApp={false}>
            <div className='modal-reminder2'>
                <div className="row1">
                  <img src={content.images.cross} style ={{cursor:'pointer'}} onClick={()=>setRemoveReminder2popup1(false)} alt=''/>
                </div>
                <div className="row2">
                  <div className="r1">Hey sure we will remove the Meditation reminder for today!</div>
                  <div className="r2"><img src={content.images.heart} alt=''/></div>
                  <div className="r3">Please share why you want to remove it?</div>
                  <div className="r4">
                    <button 
                    onClick={()=>setReminder2RemoveOption(1)}
                    style = {
                      reminder2removeoption===1?(
                        {background:'#6F9792',color:'white'}
                      ):(
                        {background:'white',color:'black'}
                      )
                    }
                    >
                      I meditated on my own!
                    </button>
                    <button 
                    onClick={()=>setReminder2RemoveOption(2)}
                    style = {
                      reminder2removeoption===2?(
                        {background:'#6F9792',color:'white'}
                      ):(
                        {background:'white',color:'black'}
                      )

                    }
                    >
                      I can’t find time today!
                    </button>
                    <button 
                    onClick={()=>setReminder2RemoveOption(3)}
                    style = {
                      reminder2removeoption===3?(
                        {background:'#6F9792',color:'white'}
                        ):(
                          {background:'white',color:'black'}
                      )

                    }
                    >
                      This does not help me.
                    </button>
                  </div>
                  <div className="r5" style={{cursor:'pointer'}} onClick={()=>{handleReminder2popup1()}}>
                    Next<img src={content.images.start} alt=''/>
                  </div>
                </div>
            </div>
        </Modal>
                    {/*Modal4*/}
        <Modal isOpen={removeReminder2popup2} style={content.customStylesModal} onRequestClose={()=> setRemoveReminder2popup2(false)} ariaHideApp={false}>
            <div className='modal-reminder1'>
                <div className="row1">
                  <img src={content.images.cross} style ={{cursor:'pointer'}} onClick={()=>setRemoveReminder2popup2(false)} alt=''/>
                </div>
                <div className="row2">
                  <div className="r1">Hey sure we will remove the Meditation reminder for today!</div>
                  <div className="r2">Please let us know how you felt. How we can help you better</div>
                  <div className="r3">{content.smallIcons.map((icon)=>(<div onClick={()=>handleFeelReview2()} ><img src={icon} style={{cursor:'pointer'}} className="selectFeelingBoxBreathing" alt=''/></div>))}</div>
                  <div className="r4">
                    <textarea id='emotion2' placeholder='Write your experience here...'/>
                  </div>
                  <div className="r5" >
                    <button onClick={()=>handleReminder2popup2()}>Submit</button>
                  </div>
                </div>
            </div>
        </Modal>

        </div>
      
        
            <div className='card2'>
            <div className='gratitudetext1'>
             Daily Gratitude
            </div>
            <div className='gratitudetext2'>
            Saying thanks for the good in your life helps you focus on what you have. 
            Select or type on what you want to give thanks to and help your gratitude tree flourish daily. 
            </div>
            <div className='tree'>
                 {  
                    
                 
                    step===1?(<img src={content.images.tree} alt = ''/>):
                    step===2?(<img src={content.images.tree1} alt = ''/>):
                    step===3?(<img src={content.images.tree2} alt = ''/>):
                    step===4?(<img src={content.images.tree3} alt = ''/>):
                    step===5?(<img src={content.images.tree4} alt = ''/>):
                    step===6?(<img src={content.images.tree5} alt = ''/>):
                    step===7?(<img src={content.images.tree6} alt = ''/>):
                    step===8?(<img src={content.images.tree7} alt = ''/>):
                    step===9?(<img src={content.images.tree8} alt = ''/>):
                    step===10?(<img src={content.images.tree9} alt = ''/>):
                    step===11?(<img src={content.images.tree10} alt = ''/>):
                    step===12?(<img src={content.images.tree11} alt = ''/>):
                    step===13?(<img src={content.images.tree12} alt = ''/>):
                    step===14?(<img src={content.images.tree13} alt = ''/>):
                    step===15?(<img src={content.images.tree14} alt = ''/>):
                    step===16?(<img src={content.images.tree15} alt = ''/>):
                    step===17?(<img src={content.images.tree16} alt = ''/>):
                    step===18?(<img src={content.images.tree17} alt = ''/>):
                    step===19?(<img src={content.images.tree18} alt = ''/>):
                    step===20?(<img src={content.images.tree19} alt = ''/>):
                    step===21?(<img src={content.images.tree20} alt = ''/>):
                    step===22?(<img src={content.images.tree21} alt = ''/>):
                    step===23?(<img src={content.images.tree22} alt = ''/>):
                    step===24?(<img src={content.images.tree23} alt = ''/>):
                    step===25?(<img src={content.images.tree24} alt = ''/>):
                    step===26?(<img src={content.images.tree25} alt = ''/>):
                    step===27?(<img src={content.images.tree26} alt = ''/>):''
                  }
                 
            </div>
            <div className='givethankstext'>
                {step === 1?
            (<textarea className='givethanks' id="message"  name="text"  placeholder='e.g. I have a beautiful home. or My family is so supportive etc' ></textarea>)
            :
            (<textarea className='givethanks' id="message"  name="text" ></textarea>)}
            </div>
            <div className='clickgivethanks'>
               <button id="btn" className='givethanksbtn' onClick={()=>func()}>Give Thanks!</button>
            </div>
        </div>
     
       
            <div className='card3'>
              <div className='uppertext'>
              What do you wish to work on?
              </div>
              {array.map((value,index)=>{
                return(
                <div 
                  className='anxious' 
                  style={{cursor: 'pointer'}} 
                  onClick={()=>{
                    index===0?(Navigate('/anxiety')):
                    index===1?(Navigate('/sad')):
                    index===2?(Navigate("/relaxation")):
                    index===3?(Navigate("/phq9")):
                    index===4?(Navigate("/goal")):(
                    Navigate("/align"))}}>

                <div className='anxious-img-div'>
                <img className='anxious-img' 
                 src={
                      index===0?(content.images.anxious):
                      index===1?(content.images.sad):
                      index===2?(content.images.relax):
                      index===3?(content.images.discover):
                      index===4?(content.images.setgoal):(
                      content.images.align)
                 }
                 alt=''/>
                </div>
                <div className='anxious-text'>
                 {
                      index===0?('Anxiousness or Fear'):
                      index===1?('Sadness / Loneliness'):
                      index===2?('Relaxation'):
                      index===3?('Discovering Myself'):
                      index===4?('Setting Goals'):(
                        'Aligning Myself')
                 }
                </div>
              </div>)
              })}
              
                  <div className='lastimages'>

                  <div className='fleft'>
                  <img className='fleftimg' src={content.images.flowerleft} alt='' />
                  </div>

                  <div className='calm'>
                    <img className='calmimg' src={content.images.calmness} alt=''/>
                  </div>

                  <div className='fright'>
                  <img className='frightimg' src={content.images.Flowerright} alt='' />
                  </div>
                  
                  </div>
         
        </div>
      
    </div>
      </>
      )}