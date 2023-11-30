"use client";

import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const [wake, setWake] = useState(false);

  const commands = [
    {
      command: "(Hey) Jarvis",
      callback: () => setWake(true),
    },
    {
      command: "Print",
      callback: () => {
        if (wake) {
          console.log("Print");
        }
      },
    },
  ];

  const { transcript, browserSupportsSpeechRecognition, listening } =
    useSpeechRecognition({ commands });

  //This portion is lowkey optional but it checks if the browser supports the speechRecognition
  const [supported, setSupported] = useState(true);
  useEffect(() => {
    if (browserSupportsSpeechRecognition) setSupported(true);
    else setSupported(false);
  }, [browserSupportsSpeechRecognition]);
  if (!supported) {
    return null;
  }

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    <>
      <div>
        <p>{supported ? "Browser is supported" : "Browser is not supported"}</p>
        <p>{listening ? "Listening on" : "Listening off"}</p>
        <p>{wake ? "Jarvis awake" : "Jarvis off"}</p>
        <p>Transcript: {transcript}</p>
      </div>
    </>
  );
};

export default Dictaphone;
