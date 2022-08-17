

import Happyicon from "../../Assets/EmotionsIcons/Happyicon.png"
import neutralicon from "../../Assets/EmotionsIcons/neutralicon.png"
import sadicon from "../../Assets/EmotionsIcons/sadicon.png"

type  PropMood={
    icon: number,
    Feeling: string,
    Date: string,
    Mood: string,
    background: string,
  }

const MoodHistory = ({moodHistoryData}:any) => {
    const Emotions:any =[Happyicon,neutralicon,sadicon];    
  return (
      <>
      {moodHistoryData.map((bar:any)=>(
          <div className='moodBar secondaryalign'  style={{background : bar.background}}>                       
            <div className='emotionIcon'><img src ={Emotions[bar.icon]}/></div>
            <div className='moodBarData'>
               <div className='primaryalign'>
                  <div className='feelingText'>Feeling</div>
                  <div className='feelingDataText'>{bar.Feeling}</div>
               </div>
               <div className='dateAndMood'>
                   <div className='dateText'>{bar.Date}</div>
                   <div className='moodText'>{bar.Mood}</div>
               </div>
           </div>
          </div>
      ))
      }
  
   </>
  )
}

export default MoodHistory;