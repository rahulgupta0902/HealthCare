import Arrow from "../../Assets/onboardingimages/Arrow.png"
import { useNavigate } from 'react-router';
import Chart from 'react-apexcharts';
import React from "react"



interface Props2{
  plan:string,
  handleChangePlan : any
}

const EmotionalAnalysis = ({plan,handleChangePlan}:Props2) => {  
    const Navigate = useNavigate();      
    //Create a State Variable and set the graphdata 

   const freeSeries=[
    {
      name: 'Today Analysis',
      data: [80, 50, 30],
    }, {
      name: 'Last Week Analysis',
      data: [20, 30, 40],
    }, 

   ]

   const freeOptions:any = {
    dataLabels:{enabled : false},
    chart: {
      height: 350,
      background: 'none',
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      },
      legend :{
        show : false
      },
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 3
    },
    xaxis: {
      categories: ['😄', '😡', '😑'],
      labels : {
        show :true,
        style: {     
          height :'4em',     
        },
      }       
    }
  }



 
    const series = [{
      name: 'Today Analysis',
      data: [80, 50, 30, 40, 100, 20],
    }, {
      name: 'Last Week Analysis',
      data: [20, 30, 40, 80, 20, 80],
    }, ];
    const options:any= {
      dataLabels:{enabled : false},
      chart: {
        height: 350,
        background: 'none',
        type: 'radar',
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1
        },
        legend :{
          show : false
        },
      },
      stroke: {
        width: 2
      },
      fill: {
        opacity: 0.1
      },
      markers: {
        size: 3
      },

      xaxis: {
        categories: ['😄', '😡', '😑', '☹️', '😰', '😮'],
        labels : {
          show :true,
          style: {     
            height :'4em',     
          },
        }       
      }
    }
  
  





  
  return (
    <>  
        {/* <Radar id="chart" data={defaultGraphData}  style={{width:"90%" ,maxHeight:"95%",overflow:"hidden"}} options={{maintainAspectRatio:false}}/>         */}
        <Chart options={plan=="Free"?freeOptions:options} series={plan=="Free"?freeSeries:series} type="radar" height={"100%"} />

        <div className='detailsAnalysisButton' onClick={()=>(Navigate("/detailanalysis"))}>Get Detailed Analysis<img style={{marginLeft:"1rem"}} src={Arrow}/></div>
    </>

  )
}

export default EmotionalAnalysis