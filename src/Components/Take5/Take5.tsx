import React from 'react';
import content from '../../Assets/Content'

import '../../Components/Relaxation/Relaxation.css'

export const Take5 = () => {
  
    return (
        <>
                          <div className='take5-row22col2'>
                               <video width='512px' height='350px' controls>
                                 <source src={content.video.take5} type="video/mp4"/>
                               </video>
                          </div>
        </>

    )
}
