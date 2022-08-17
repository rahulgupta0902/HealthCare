import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';


// NOTE -- FOR NOW WE HAVE TAKEN A DUMMY DATA FOR TIME

const ActivityTracker = () => {
  //This Time Data will come from an api which returns the duration of each work/shortbreak/longbreak time 
    const worktime:number = 40;
    const shortbeaktime:number = 10;
    const longbreaktime:number = 10;

  //State Variables to control the text and caption in activity tracker
    const [titlePromdoro,setTitlePromdoro] = React.useState<string>("You have no data recored yet");
    const [captionPromdoro,setCaptionPromdoro] = React.useState<string>("Please use the promodoro focus to get the data");
  
  //A Constant to store the title and caption for a particular work to break percentage
    const promdoroTitleAndCaption={
      fiftyfifty : {
        title : "Excellent",
        caption: "You have a excellent work-to-break balance"
      },
      sixtyforty : {
        title : "Great",
        caption: "You have a great work-to-break balance"
      },
      seventythirty : {
        title: "Good",
        caption: "You have a good work-to-break balance "
      },
      eightytwenty : {
        title:"ok",
        caption:"You have a ok work-to-break balance"
      },
      nintyten  :{
        title : "Bad",
        caption : `You can try taking small breaks {click} for some relaxation`
      },
      hundredten : {
        title : "Terrible",
        caption: `You can try taking small breaks {click} for some relaxation`
      }
    }

    //Graph Data for Semi Doughnut Graph
    const dataSets:any ={
        options: { 
            labels :[],
            dataLabels:{enabled : false},
            fill :{
                colors: ['#E6878A', '#FCC9C5', '#D5ECD4']
                },
            legend :{
              show : false
            },
            plotOptions: {
                pie: {
                  startAngle: -90,
                  endAngle: 90,
                  offsetY: 10,
                  customScale :1,
                  donut: {
                    size: '90%',
                  },
                }
              },
              grid: {
                padding: {
                  bottom: -120
                },
              },
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 500
                  },
                  legend: {
                    position: 'bottom'
                  }
                }
              }]
            },
          series: [worktime,shortbeaktime,longbreaktime]
        }
useEffect(()=>{

  //Calculating the Workpercentage and BreakPercentage
  const totalTime:number = worktime+shortbeaktime+longbreaktime;
  const workpercent:number = (worktime/totalTime)*100;
  
  //Checking with the suitable conditions
  if(workpercent === 50){
    setTitlePromdoro(promdoroTitleAndCaption.fiftyfifty.title);
    setCaptionPromdoro(promdoroTitleAndCaption.fiftyfifty.caption);
    }
  else if( workpercent >=51 && workpercent <=60){
    setTitlePromdoro(promdoroTitleAndCaption.sixtyforty.title);
    setCaptionPromdoro(promdoroTitleAndCaption.sixtyforty.caption);
    }
  else if( workpercent >=61 && workpercent <=70){
    setTitlePromdoro(promdoroTitleAndCaption.seventythirty.title);
    setCaptionPromdoro(promdoroTitleAndCaption.seventythirty.caption);
  }
  else if(workpercent >= 71 && workpercent <= 80){
    setTitlePromdoro(promdoroTitleAndCaption.eightytwenty.title);
    setCaptionPromdoro(promdoroTitleAndCaption.eightytwenty.caption);
  }
  else if(workpercent >=81 && workpercent <=90){
    setTitlePromdoro(promdoroTitleAndCaption.nintyten.title);
    setCaptionPromdoro(promdoroTitleAndCaption.nintyten.caption);
  }
  else {
    setTitlePromdoro(promdoroTitleAndCaption.hundredten.title);
    setCaptionPromdoro(promdoroTitleAndCaption.hundredten.caption)
  }
},[worktime,shortbeaktime,longbreaktime])
    
    
  return (

      <>
        <div className='promodroActivityTracker'>
          <Chart options={dataSets.options} series={dataSets.series}  type="donut"/>       
          <div className='radialtext'>
            <div className='radialhour'>{worktime}<span style={{fontSize:"16px"}}>s</span></div>
            <div style={{fontWeight:"500"}}>Total work focus time</div>
          </div>     
        </div>
        <div className='pomodroMiddleText'>
            <div className='pomodroData'>{titlePromdoro}</div>
            <div className='pomodroDataCaption'>{captionPromdoro}</div>
        </div>
        <div className='pomodroFocusBottom'>
            <div>
                <div className='workingBar'></div>
                <div className='pomodroBottomText'>Working</div>
            </div>
            <div>
                <div className='shortBreakBar'></div>
                <div className='pomodroBottomText'>Short-break</div>
            </div>
            <div>
                <div className='longBreakBar'></div>
                <div className='pomodroBottomText'>Long-Break</div>
            </div>
        </div>
      </>
    
  )
}

export default ActivityTracker