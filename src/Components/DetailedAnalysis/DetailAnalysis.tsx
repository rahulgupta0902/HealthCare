import React, { useEffect, useRef, useState } from "react";
import "./DetailAnalysis.css";
import { MdDownload } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { useNavigate } from "react-router";
import moment from "moment";
import content from "../../Assets/Content";
import { FormControl,MenuItem,Select,InputLabel} from "@mui/material";
import { Line } from "react-chartjs-2";
import "chartjs-plugin-streaming";
import LineChart from "./lineChart";






 type dailyRoutineDataType = {
  title : string,
  value : string,
  image : string
 }

 type DummyPromdoroData ={
  title : string,
  caption:string,
  value : string
 }

 type AverageEmotionData = {
  emotion : string,
  percent :string,
  icon : string
 }

 interface Props2{
  plan:string,
  handleChangePlan : any
}



const DetailAnalysis = ({plan,handleChangePlan}:Props2) => {

  
  
  
  const data = {
 
    datasets: [
      {
        label: "Happy",
        data: [],
        fill: true,
        borderColor: "rgb(255, 99, 132)",
      },
      {
        label: "Sad",
        data: [],
        fill: false,
        borderColor: "rgb(255, 159, 64)",
      },
      {
        label: "Neutral",
        data: [],
        fill: false,
        borderColor: "rgb(255, 205, 86)",
      },
      {
        label: "Fear",
        data: [],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
      },
      {
        label: "Surprise",
        data: [],
        fill: false,
        borderColor: "rgb(54, 162, 235)",
      },
      {
        label: "Angry",
        data: [],
        fill: false,
        borderColor: "rgb(153, 102, 255)",
      },
    ],
  
  };
  const optionsData:any = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales : {
            x: 
        {
          //  type: "realtime",
          distribution: "linear",
          realtime: {
            onRefresh: function (chart: any) {
              chart.data.datasets[0].data.push({
                x: moment(),
                y: Math.random(),
              });
              chart.data.datasets[1].data.push({
                x: moment(),
                y: Math.random(),
              });
              chart.data.datasets[2].data.push({
                x: moment(),
                y: Math.random(),
              });
              chart.data.datasets[3].data.push({
                x: moment(),
                y: Math.random(),
              });
              chart.data.datasets[4].data.push({
                x: moment(),
                y: Math.random(),
              });
              chart.data.datasets[5].data.push({
                x: moment(),
                y: Math.random(),
              });
            },
            delay: 3000,
            time: {
              displayFormat: "h:mm",
            },
          },
          ticks: {
            displayFormats: 1,
            maxRotation: 0,
            minRotation: 0,
            stepSize: 1,
            maxTicksLimit: 30,
            minUnit: "second",
            source: "auto",
            autoSkip: true,
            callback: function (value: any) {
              return moment(value, "HH:mm:ss").format("mm:ss");
            },
          },
        },
      
      y: 
        {
         
            beginAtZero: true,
            max: 1,
          
        },
      
    },
         
     }


 const [dataGraph,setGraphData] = useState(data);
const handleChangeData =()=>{
  setGraphData(data)
}


  const timer =setTimeout(()=>{
      handleChangeData();
      console.log("making true");            
  },1000)


  const Navigate = useNavigate();

  const finaldata:AverageEmotionData[] = [
    {
      emotion: "Happy",
      percent: "32%",
      icon: content.DetailAnalysisImages.Happyicon,
    },
    {
      emotion: "Sad",
      percent: "5%",
      icon:content.DetailAnalysisImages.sadicon,
    },
    {
      emotion: "Neutral",
      percent: "50%",
      icon: content.DetailAnalysisImages.neutralicon,
    },
    {
      emotion: "Fear",
      percent: "8%",
      icon: content.DetailAnalysisImages.fearicon,
    },
    {
      emotion: "Surprise",
      percent: "15%",
      icon: content.DetailAnalysisImages.surpriseicon,
    },
    {
      emotion: "Angry",
      percent: "10%",
      icon: content.DetailAnalysisImages.angryicon,
    },
  ];

  //Dummy Data for Row 4th Promdoro Data

  const PromodoroData:DummyPromdoroData[] = [
    {
      title: "Promdoro's",
      caption: "Total number of promodoro completed",
      value: "05",
    },
    {
      title: "Promdoro time",
      caption: "Total time of focus during work",
      value: "2.8",
    },
    {
      title: "Breaks's taken",
      caption: "Total number of short break and long break taken",
      value: "00",
    },
    {
      title: "Break time",
      caption: "Total time of short break and long break taken",
      value: "40",
    },
  ];

  //Dummy Data for Row 5th DailyRoutine 

  const DailyRoutineData:dailyRoutineDataType[] = [
    { title: "water intake", value: "6+ glasses", image: content.DetailAnalysisImages.waterintakeimg },
    { title: "Sleep time", value: "0-4 hours", image: content.DetailAnalysisImages.sleepimg },
    { title: "Vegetables/fruits intake", value: "1-2", image: content.DetailAnalysisImages.foodimg },
    { title: "Focusing on myself", value: "Kind of", image: content.DetailAnalysisImages.focusimage },
    { title: "Physical activity", value: "15-30 mintues", image: content.DetailAnalysisImages.exerciseimg },
    { title: "Energy", value: "Fully charged", image: content.DetailAnalysisImages.energyimg },
  ];

  //Dummy Data for Total Daily Activities and Total Relaxation Techniques

  const totalDailyActivities:string = "03";
  const totalRelaxazation:string    = "03";

  //State Variable and Onchange Function for dropdown menu options for selecting day 
  const [daySelected,setDaySelected] = React.useState<string>("Today");
  const options:string[] = ["Today", "Yesterday"];
  const handleDayChange = (e:any)=>{
    setDaySelected(e.target.value);
  } 
 
return (
  <div className="detailOverall">
    <div className="detailAnalysiscontainer">
      <div className="detailAnalysiscontent">
        <div className="detailAnalysisFirstRow">
          <div className="backbtn" onClick={() => Navigate("/dashboard")} style={{ cursor: "pointer" }}>Back</div>
          <div className="dropdownDetailAnalysisContainer">
            <FormControl fullWidth className="dropdownDetailAnalysis">
              <InputLabel id="demo-simple-select-label">{daySelected}</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={daySelected} label="Day" onChange={handleDayChange}>
                {options.map((option)=>(<MenuItem value={option}>{option}</MenuItem>))}  
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="detailAnalysisContainerHeader">
          <h4>Get my Detailed Analysis Report</h4>
        </div>
        <div className="dadownload">
          <div className="downloadicon">
            <MdDownload size="1x"/>
          </div>
          <div className="shareicon">
            <IoMdShare size="1x" />
          </div>
        </div>
        <div className="daicons">
          {finaldata.map((data) => (
            <div className="ec">
              <div className="echeader">
                <div>
                  <img src={data.icon} />
                </div>
                <div className="ece">{data.emotion}</div>
              </div>
              <div className="ecpercent">{data.percent}</div>
              <div className="ecfooter">Average Score</div>
            </div>
          ))}
        </div>
        <div className="dagraphs">
          <div className="fes">Facial Emotional Score</div>
          <div className="daline">
            <div className="labels"></div>
            <LineChart/>
            {/* <Line  data={dataGraph} options={optionsData}/> */}
          </div>
        </div>
        <div className="dagraphs">
          <div className="fes">Heal activity score</div>
          <div className="daline">
            <Line data={content.HealActivityScoreData} options={content.optionsHealActivityGraph}/>
          </div>
        </div>
        <div className="dathirdrow">
          <div className="detailanaysisboxes">
            <div className="dabox" style={{ marginBottom: "3rem" }}>
              <div className="daboxcontent">
                <div className=" alignthree">
                  <div className="fes">Total daily activities</div>
                  <div className="dasubcaption">
                    Tasks done from daily activities
                  </div>
                </div>
                <div className="boldcount">{totalDailyActivities}</div>
              </div>
            </div>
            <div className="dabox">
              <div className="daboxcontent">
                <div className=" alignthree">
                  <div className="fes">Relaxzation techniques</div>
                  <div className="dasubcaption">Heal yourself exercises</div>
                </div>
                <div className="boldcount">{totalRelaxazation}</div>
              </div>
            </div>
          </div>
          <div className="healsessionbox">
            <div className="graphheader fes">
              Heal Session Duration
            </div>
            <div className="healsessiongraph">
              <Line data={content.HealSessionDurationData} options={content.optionHealDuration}/>
             
            </div>
          </div>
        </div>
        <div className="dafourthrow secondaryalign">
          {PromodoroData.map((data) => (
            <div className="promdorobox">
              <div className=" alignthree">
                <div className="fes">{data.title}</div>
                <div className="dasubcaption">{data.caption}</div>
              </div>
              <div className="boldcount">{data.value}</div>
            </div>
          ))}
        </div>
        <div className="dafifthrow">
          <div className="fes">Daily routine</div>
          <div className="dailyroutineboxes">
            {DailyRoutineData.map((data) => (
              <div className="dailyroutinebox primaryalign">
                <div className="primaryalign dadailyroutineheader">
                  <div>{data.value}</div>
                  <div style={{ color: "#6F9792" }}>{data.title}</div>
                </div>
                <div className="dailyimages">
                  <img src={data.image} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default DetailAnalysis;