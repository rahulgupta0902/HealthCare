import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Dashboard } from "./Components/DashBoard/Dashboard";
import { SignUp } from "./Components/SignUp/SignUp";
import { Login } from "./Components/Login/Login";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Heal1 } from "./Components/Heal1/Heal1";
import About from "./Components/About/About";
import { Home } from "./Components/Home/Home";
import "./App.css";
import Help from "./Components/Help/Help";
import { Plans } from "./Components/Plans/Plans";
import Onboarding from "./Components/Onboarding/Onboarding";
import DetailAnalysis from "./Components/DetailedAnalysis/DetailAnalysis";
import Boxbreathing from "./Components/BoxBreathing/Boxbreathing";
import BoxbreathingExercise from "./Components/BoxBreathing/BoxbreathingExercise";
import DailyRoutineCheck from "./Components/DailyRoutineCheck/DailyRoutineCheck";
import DailyRoutineQuestions from "./Components/DailyRoutineCheck/DailyRoutineQuestions";
import { Heal2 } from "./Components/Heal2/Heal2";
import { Meditation } from "./Components/Meditation/Meditation";
import { Relaxation } from "./Components/Relaxation/Relaxation";
import { Anxiety } from "./Components/Anxiety/Anxiety";
import { Burnout } from "./Components/Burnout/Burnout";
import { PhQ9 } from "./Components/PhQ9/PhQ9";
import FAQs from "./Components/FAQs/FAQs";
import { Take5 } from "./Components/Take5/Take5"
import { Manifestation } from "./Components/Manifestation/Manifestation";
import { Align } from "./Components/Align/Align";
import { Goal } from "./Components/Goal/Goal";
import Settings from "./Components/Settings/Settings";
import ChatbotPanel from "./Components/Chatbot/Chatbot/ChatbotPanel";
import ChatbotConfiguration from "./Components/Chatbot/ChatbotConfiguration/ChatbotConfiguration";


function App() {

  const [displayNav, setDisplayNav] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [highlight,setHighlight] = useState<string>('')
  const { pathname } = useLocation();

  const [healpaths] = useState([
    '/healyourself',
    "/align",
    "/manifest",
    "/take5",
    "/relaxation",
    "/meditation",
    "/anxiety",
    "/burnout",
    "/phq9", 
    "/goal"
  ])

  const [dashboardpaths] = useState([
    "/moodcompass",
    "/plans",
    "/onboarding",
    "/dashboard",
    "/detailanalysis",
    "/boxbreathing",
    "/extwo",
    "/dailyroutinecheck",
    "/exfour"
  ])

  const [helppaths] = useState([
  "/faqs",
  '/help'
  ])

  useEffect(() => {

    if (
      pathname === "/chatbot" ||
      pathname === "/chatbot/config" ||
      pathname === "/login" ||
      pathname === "/signup"
    ) {
      if (displayNav) {
        setDisplayNav(false);
      }
    } else {
      if (!displayNav) {
        setDisplayNav(true);
      }
    }

    for(let i=0;i<healpaths.length;i++)
    {
    if(pathname===healpaths[i])
    {
    setHighlight('/healyourself')

    }
    }
    for(let i=0;i<dashboardpaths.length;i++)
    {
    if(pathname===dashboardpaths[i])
    {
    setHighlight('/moodcompass')
    
    }
    }
    for(let i=0;i<helppaths.length;i++)
    {
    if(pathname===helppaths[i])
    {
    setHighlight('/help')

    }
    }
    if(pathname==='/settings')
    setHighlight('/settings')
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);



 

const [plan,setPlan]=React.useState<string>("");

const handleChangePlan = (plan : string)=>{
  setPlan(plan);
}

  return (
    <>
      {displayNav ? (
        <Navbar
          displayNav={displayNav}
          setDisplayNav={setDisplayNav}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          highlight={highlight}
          setHighlight={setHighlight}
          plan={plan} 
          handleChangePlan={handleChangePlan}
        />
      ) : (
        ""
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/moodcompass" element={<Dashboard plan={plan} handleChangePlan={handleChangePlan}/>} />
        <Route path="/healyourself" element={<Heal2 />} />
        <Route path="/heal1" element={<Heal1 />} />
        <Route path="/help" element={<Help />} />
        <Route path="/about" element={<About />} />
        <Route path="/align" element={<Align />} />
        <Route path="/manifest" element={<Manifestation />} />
        <Route path="/take5" element={<Take5 />} />
        <Route
          path="/login"
          element={
            <Login
              displayNav={displayNav}
              setDisplayNav={setDisplayNav}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <SignUp
              displayNav={displayNav}
              setDisplayNav={setDisplayNav}
              isLogin={isLogin}
              setIsLogin={setIsLogin}
            />
          }
        />
        <Route path="/relaxation" element={<Relaxation />} />
        <Route path="/meditation" element={<Meditation />} />
        <Route path="/anxiety" element={<Anxiety isSad={false} />} />
        <Route path="/sad" element={<Anxiety isSad={true} />} />
        <Route path="/plans" element={<Plans plan={plan} handleChangePlan={handleChangePlan}/>} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/dashboard" element={<Dashboard plan={plan} handleChangePlan={handleChangePlan}/>} />
        <Route path="/detailanalysis" element={<DetailAnalysis plan={plan} handleChangePlan={handleChangePlan}/>} />
        <Route path="/boxbreathing" element={<Boxbreathing />} />
        <Route path="/burnout" element={<Burnout />} />
        <Route path="/phq9" element={<PhQ9 />} />
        <Route path="/extwo" element={<BoxbreathingExercise />} />
        <Route path="/dailyroutinecheck" element={<DailyRoutineCheck />} />
        <Route path="/exfour" element={<DailyRoutineQuestions />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/chatbot" element={<ChatbotPanel />} />
        <Route path="/chatbot/config" element={<ChatbotConfiguration />} />
        <Route path="/goal" element={<Goal />} />
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </>
  );
}

export default App;