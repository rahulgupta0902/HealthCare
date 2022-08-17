import React, { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas/Canvas";
import ChatArea from "./chatbot-panel/ChatArea";
import { ChatbotQuestionsProxy } from "./Chatbot.demo";
import "./ChatbotPanel.css";

function ChatbotPanel() {
  const [showIntro, setShowIntro] = useState(true);
  const [loadedModel, setLoadedModel] = useState(false);
  const chatBotProxyRef = useRef(new ChatbotQuestionsProxy());
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [speechMarks, setSpeechMarks] = useState<{
    frames: any[];
    words: any[];
  } | null>(null);
  const [questionText, setQuestionText] = useState("");
  // this function can be used for getting the questions and speechMarks from the server.
  const getQuestions = async () => {
    const {
      audio,
      speechMarks,
      questionText,
    } = await chatBotProxyRef.current.getText();
    const audioTune = new Audio(URL.createObjectURL(audio));
    setAudio(audioTune);
    setSpeechMarks(speechMarks);
    setQuestionText(questionText);
  };
  useEffect(() => {
    if (!showIntro) {
      getQuestions();
    }
  }, [showIntro]);
  return (
    <div
      className="chatbot tw-w-full tw-h-full tw-flex"
      style={{
        // here we can add user specified background.
        background: "url('/background/b-1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="tw-w-1/2 tw-h-full tw-bg-transparent">
        {/* These components gets all data about audio and speechMarks and provides rendering and animation of model */}
        <Canvas
          audioTune={audio}
          speechMarks={speechMarks?.frames}
          setLoadedModel={setLoadedModel}
        />
      </div>
      <div className="tw-flex tw-flex-col tw-w-1/2 tw-h-full tw-bg-gradient-to-l tw-from-black">
        {/* These components gets all data about chat questions. */}
        <ChatArea
          questionText={questionText}
          setShowIntro={setShowIntro}
          showIntro={showIntro}
          getQuestions={getQuestions}
          setQuestionText={setQuestionText}
          loadedModel={loadedModel}
        />
      </div>
    </div>
  );
}

export default ChatbotPanel;
