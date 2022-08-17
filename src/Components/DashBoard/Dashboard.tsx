import React, { useState,useEffect } from 'react'
import "./Dashboard.css";
import EmotionalAnalysis from './EmotionalAnalysis';
import MoodHistory from './MoodHistory';
import PromodroFocus from './PromodroFocus';
import DailyActivities from './DailyActivities';
import ActivityTracker from './ActivityTracker';
import content from '../../Assets/Content';
import Emotionspike from '../EmotionSpike/Emotionspike';
import Healpopup from '../Healpopup/Healpop';
import EmotionSpikeFourProcess from '../EmotionSpikeFourProccess/EmotionSpikeFourProcess';
import WelcomeModal from './WelcomeModal';

interface Props{
  handleFunction:any,
  isOpen:any,
  textHeader:string,
  textPara:string,
  step:number
}
type  PropMood={
  icon: number,
  Feeling: string,
  Date: string,
  Mood: string,
  background: string,
}
interface Props2{
  plan:string,
  handleChangePlan : any
}




//A Function that will Generate Each About Section for DashboardBox
const AboutDiv=({handleFunction,isOpen,textHeader,textPara,step}:Props)=>{
  return (
  <div onMouseOver={()=>handleFunction(true)} onMouseOut={()=>handleFunction(false)}>
    <img src={content.DashboardImages.abouticon}/>
    {isOpen ?
      <div className='aboutDashboardContainer'>
        <div className='aboutcontent'>
          <div className='aboutheader'>{textHeader}</div>
          <div className='aboutpara'><div style={{height:"100%"}}>{textPara}</div></div>
          <div className='aboutfooter'>
            <div className='stepsabout'>Step {step} of 6</div>
          </div>
        </div>
      </div>:<></>}
  </div>
)}



export const Dashboard = ({plan,handleChangePlan}:Props2) => {     
    // Variables That Store Raw Data For Now  
    const defaultMoodHistoryData:PropMood[] = content.defaultMoodHistoryData;   
 
    // {States that store emotional balance data,mood History Data,}

    const [moodHistoryData,setMoodHistoryData] = React.useState<PropMood[]>(defaultMoodHistoryData);  
    const [nosb,setnosb] = React.useState<number>(0);

    //State Variable for About Section in Each DashboardBox

    const [isGraphAbout, setIsGraphAbout] = React.useState<boolean>(false);
    const [isMoodAbout, setIsMoodAbout] = React.useState<boolean>(false);
    const [isPromodoro, setIsPromodoro] = React.useState<boolean>(false);
    const [isDailyOn, setIsDailyOn] = React.useState<boolean>(false);
    const [isActivityOn, setIsActivityOn] = React.useState<boolean>(false);

    const aboutInfo:any ={
      Emotional_Analysis : {
        title:"Check overall emotions",
        para:"You can keep a track of all your emotions and check your emotional balance. The graph will calculate HAPPY, NEUTRAL, SAD, SURPRISE, FEAR AND ANGER. Compare your daily emotionals with last week’s analysis and get detailed emotional analysis."
      },
      Mood_History : {
        title:"Mood history",
        para:"Keep a track of your recent moods and feelings.Understanding your moods will help you in better managing them as well as your lifestyle choices in order to improve your quality of life."
      },
      Promodoro_Focus:{
        title:"Focus timer",
        para:"It is a time management technique that will motivate you to work. You divide your workday into 25-minute chunks with 5-minute or 15-minute breaks in between."
      },
      Daily_Activity:{
        title:"Daily wellbeing journey",
        para:"We will walk you through a daily wellbeing routine! This will be divided into four sections that you will complete throughout the day. These will help you become a more balanced and mindful version of yourself."
      },
      Activity_Tracker:{
        title:"Workload and activity tracker",
        para:"You'll be able to keep track of your productivity and break hours while using the promodoro focus. This will assist in the detection of work burnout."
      }

    }


    // Functions that will can an api to fetch data from back

    const handleActivities = ()=>{
        // const response = await getActivitiesStatus();
        //if(!response)
            // setActivities(response.data);
        
        console.log("Getting Status of Each Daily Activity");
    }
    const handleGraphData = ()=>{
        // const response= await getGraphData();
        // if(!response){
        //   setMoodHistoryData(response);
        // }
        // else{
        //   console.log("No Data Available");
        // }
        console.log("A Api to get Emotional Balance Data");

     };

    const handleMoodHistoryData = () =>{
        // const response= await getMoodHistoryData();
        // if(!response){
        //   setMoodHistoryData(response.data);
        // }
        // else{
        //   console.log("No Data Available");
        // }
        console.log("Fetching Mood History Data");
      }


    const handleNosb = ()=>{setnosb(nosb+1);}

    useEffect(()=>{
        console.log("Getting All the Dashboard Data");
        handleGraphData();
        handleMoodHistoryData();
        handleActivities();
      },)





return (<>

  <Emotionspike/>       
  <Healpopup/>  
  <EmotionSpikeFourProcess/>
  <WelcomeModal/>
    <div className='DashboardContainer'>
        <div className='quotes secondaryalign'><div className='quotesText'>There is Always a Reason to Smile.</div></div>            
        <div className='dataContainer'> 
          <div className='graphContainer'>
            <div className='dashboardHeaders dashboardFont' style={{padding:"2.5rem"}}>
              <div>Emotional Balance</div>     
              <AboutDiv handleFunction={setIsGraphAbout} isOpen={isGraphAbout} textHeader={aboutInfo.Emotional_Analysis.title} textPara={aboutInfo.Emotional_Analysis.para} step={1}/>              
            </div>
            <div className='graphContentBox'><EmotionalAnalysis plan={plan} handleChangePlan={handleChangePlan}/></div>                
          </div>
          <div className='middleContainers'>
            <div className='dashboardbox primaryalign'>
              <div className='boxContentDashboard'>
                <div className='dashboardHeaders dashboardFont'>
                  <div>Mood History</div>
                  <AboutDiv handleFunction={setIsMoodAbout} isOpen={isMoodAbout} textHeader={aboutInfo.Mood_History.title} textPara={aboutInfo.Mood_History.para} step={2}/>
                </div>                    
                <div className='dashboardBoxContent'>                      
                  <MoodHistory moodHistoryData={moodHistoryData}/>                                                      
                </div>
              </div>
            </div>
            <div className='dashboardbox primaryalign'>
              <div className='boxContentDashboard'>
                <div className='dashboardHeaders dashboardFont'>
                  <div>Promodoro Focus</div>
                  <AboutDiv handleFunction={setIsPromodoro} isOpen={isPromodoro} textHeader={aboutInfo.Promodoro_Focus.title} textPara={aboutInfo.Promodoro_Focus.para} step={3}/> 
                </div>
                <div className='dashboardBoxContent'><PromodroFocus nosb={nosb} handleNosb={handleNosb}/>
                </div>
              </div>
            </div>
          </div>
          <div className='thirdContainer'>
            <div className='dashboardbox primaryalign'>
              <div className='boxContentDashboard'>
                <div className='dashboardHeaders dashboardFont'>
                  <div>Daily wellbeing activities</div>
                  <AboutDiv handleFunction={setIsDailyOn}  isOpen={isDailyOn} textHeader={aboutInfo.Daily_Activity.title} textPara={aboutInfo.Daily_Activity.para} step={4}/>
                </div>
                <div className='dashboardBoxContent' style={{paddingTop:"1em"}}> <DailyActivities handleActivities={handleActivities}/></div>
              </div>
            </div>
            <div className='dashboardbox primaryalign'>
              <div className='boxContentDashboard'>  
                <div className='dashboardHeaders dashboardFont'>
                  <div>Activity tracker</div>
                  <AboutDiv handleFunction={setIsActivityOn} isOpen={isActivityOn} textHeader={aboutInfo.Activity_Tracker.title} textPara={aboutInfo.Activity_Tracker.para} step={5}/> 
                </div>
                <div className='dashboardBoxContent'><ActivityTracker/> </div>         
              </div>        
            </div>
          </div>
        </div>        
    </div>
    </>
  )
}
