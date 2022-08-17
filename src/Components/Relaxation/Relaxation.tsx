
import React,{useState} from 'react';
import content from '../../Assets/Content'
import {_5step} from '../5step/_5step'
import {_3step} from '..//3step/_3step'

import './Relaxation.css'
import { Meditation } from '../Meditation/Meditation';
import { Manifestation } from '../Manifestation/Manifestation';
import { Take5 } from '../Take5/Take5'
import { useNavigate } from 'react-router';
export const Relaxation = () => {
   const Navigate =useNavigate();
    
    const [part,setPart]=useState(1);

    const [notactive,setNotActive] = useState<number[]>([1,1,1,1,1,1,1,1,1,1])
   
    const [songTitle] = useState<string[]>([
        'Weightless',
        'Electra ',
        'Mellomaniac (Chill Out Mix)',
        'Watermark ',
        'Strawberry Swing ',
        'Please Don’t Go ',
        'Pure Shores ',
        'Someone Like You ',
        'Canzonetta Sull’aria ',
        'We Can Fly '        
    ])
    
    const [songSinger] = useState<string[]>([
             ' by Marconi Union',
              'by Airstream',
               'by DJ Shah',
               'by Enya',
               'by Coldplay',
               'by Barcelona',
               'by All Saints',
               'by Adele',
               'by Mozart',
               'by Rue du Soleil (Cafe Del Mar)'
    ])

   const activate = (index : number) => {
        let x = [...notactive]
        for(let i=0;i<x.length;i++)
        {
                if(i===index)
                x[i]=0
                else
                x[i]=1
        }
        setNotActive(x);
        for(let i=0;i<x.length;i++)
        {
            if(i!==index)
            {
                
                if((document.getElementById('song' + String(i+1)) as HTMLAudioElement | null)!=null)
                {(document.getElementById('song' + String(i+1)) as HTMLAudioElement).pause() ;
                (document.getElementById('song' + String(i+1)) as HTMLAudioElement).currentTime = 0;}
            }
           
            
        }
        const t = document.getElementById('song' + String(index+1)) as HTMLAudioElement | null ;
        if(t!=null)
        t.play()
        
   }

   const deactivate = (index:number) => {
    let x = [...notactive]
    for(let i=0;i<x.length;i++)
    {
            if(i===index)
            x[i]=2
          
    }
    setNotActive(x);
    (document.getElementById('song' + String(index+1)) as HTMLAudioElement | null)?.pause() 
   }


  
   
    return (
        <>
        
      
        <div className='relaxcontent'>
          <div className='relax-text1'>
          <div className="row1">
                <div className="col1">
                    <img src={content.images.lredarrow} alt='' onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}/>
                    &nbsp;&nbsp;&nbsp;
                    <div className="text" onClick={()=>Navigate('/healyourself')} style={{cursor:'pointer'}}>Back to Heal Yourself</div>
                    
                </div>
                <div className="col2">
                    Relaxation Exercises
                </div>
            </div>
            <div className="row2">
              Find instant relaxation options here.
            </div>
          </div>
          <div className='relaxcontainer'>
              <div className='col1'>
                     
                     <div className='row2'>
                         <div className='relax-row2col1'>

                               {part===1?(
                                <div className='relax-sec2-top' onClick={() => setPart(1)}>
                                 &nbsp;&nbsp;&nbsp; 5 step exercise &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src={content.images.whitearrow} alt=''/>
                                </div>):(
                                <div className='relax-sec' onClick={() => setPart(1)}>
                                 &nbsp;&nbsp;&nbsp; 5 step exercise
                                </div>)}

                               {part===2?(
                                <div className='relax-sec2'  onClick={() => setPart(2)}>
                                 &nbsp;&nbsp;&nbsp; 3 step exercise &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src={content.images.whitearrow} alt=''/>
                                </div>):(
                                <div className='relax-sec'  onClick={() => setPart(2)}>
                                 &nbsp;&nbsp;&nbsp; 3 step exercise
                                </div>)}

                               {part===3?(
                                <div className='relax-sec2'  onClick={() => setPart(3)}>
                                &nbsp;&nbsp;&nbsp; Manifestation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src={content.images.whitearrow} alt=''/>
                                </div>):(
                                <div className='relax-sec'  onClick={() => setPart(3)}>
                                &nbsp;&nbsp;&nbsp; Manifestation
                                </div>
                               )}

                               {part===4?(
                               <div className='relax-sec2'  onClick={() => setPart(4)}>
                               &nbsp;&nbsp;&nbsp; Meditation &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src={content.images.whitearrow} alt=''/>
                               </div>):(
                                <div className='relax-sec'  onClick={() => setPart(4)}>
                               &nbsp;&nbsp;&nbsp; Meditation
                               </div>
                               )}

                               {part===5?(
                               <div className='relax-sec2'  onClick={() => setPart(5)}>
                                &nbsp;&nbsp;&nbsp; Take 5 exercise &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <img src={content.images.whitearrow} alt=''/>
                               </div>):(
                               <div className='relax-sec'  onClick={() => setPart(5)}>
                                &nbsp;&nbsp;&nbsp; Take 5 exercise
                               </div>
                               )}
                               
                         </div>
                         <div className='row2col2'>
                             <div className="row0">
                                <div className="start">
                                    {
                                        part===1?('5 step exercise'):
                                        part===2?('3 step exercise'):
                                        part===3?('Manifestation'):
                                        part===4?('Meditation'):
                                        ('Take 5 exercise')
                                        
                                    }
                                </div>
                                <div className="end">
                                    <img src={content.images.dailyReminder} alt =''/>
                                </div>
                             </div>
                             {
                             part===1?(
                                // eslint-disable-next-line react/jsx-pascal-case
                                <_5step/>
                             ):
                             part===2?(
                                // eslint-disable-next-line react/jsx-pascal-case
                                <_3step/>
                             ):
                             part===3?(
                                <Manifestation/>
                             ):
                             part===4?(
                                <Meditation/>
                             ):(
                                <Take5/>
                             )
                             }
                          </div>
                     </div>
              </div>
              <div className='col2'>
                  <div className='col2col1'>
                             {/*vertical line */}
                  </div>
                  <div className='col2col2'>
                  <div className='col2col2row1'>
                  Scientifically proven music that helps with relaxation
                   </div>
                   <div className='col2col2row2'>

                            <audio id="song1" src={content.audio.song1} ></audio>
                            <audio id="song2" src={content.audio.song2} ></audio>
                            <audio id="song3" src={content.audio.song3} ></audio>
                            <audio id="song4" src={content.audio.song4} ></audio>
                            <audio id="song5" src={content.audio.song5} ></audio>
                            <audio id="song6" src={content.audio.song6} ></audio>
                            <audio id="song7" src={content.audio.song7} ></audio>
                            <audio id="song8" src={content.audio.song8} ></audio>
                            <audio id="song9" src={content.audio.song9} ></audio>
                            <audio id="song10" src={content.audio.song10} ></audio>


                              {
                                notactive.map((value,index) => {
                                    return(
                                    notactive[index]===1?(
                                        <li className='Song' onClick={()=>activate(index)}>
                                        <img  src={content.images.play22} alt = ' ' /><div className='song1text'><span className='boldtext'>{songTitle[index]}</span>{songSinger[index]}</div></li>)
                                            :notactive[index]===2?(
                                               <li className='Songpause' onClick={()=>activate(index)}>
                                        <img  src={content.images.play33} alt = ' ' /><div className='song1text'><span className='boldtext'>{songTitle[index]}</span>{songSinger[index]}</div></li>
                                            ):
                                        (<li className='Songpause' onClick={()=>deactivate(index)}>
                                        <img  src={content.images.pause1} alt = ' ' /><div className='song1text'><span className='boldtext'>{songTitle[index]}</span>{songSinger[index]}</div></li>) 
                                    )
                                }
                                )
                                }
                   </div>
                   </div>
              </div> 
          </div>
         <div className='relax-bottom-images-left'>
            <img src={content.images.flowerleft2} alt = ' ' />
         </div>
         <div className='relax-bottom-images-right'>
            <img src={content.images.flowerright} alt = ' ' />
         </div>
        </div>
        </>
    )
}