"use client";

import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const Dictaphone = () => {
  const {
    transcript,
    interimTranscript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [supported, setSupported] = useState(true);

  useEffect(() => {
    if (browserSupportsSpeechRecognition) setSupported(true);
    else setSupported(false);
  }, [browserSupportsSpeechRecognition]);

  return (
    <>
      {supported ? (
        <div>
          <p>Microphone: {listening ? "on" : "off"}</p>
          <button onClick={() => SpeechRecognition.startListening()}>
            Start
          </button>
          <button onClick={() => SpeechRecognition.stopListening()}>
            Stop
          </button>
          <button onClick={() => resetTranscript()}>Reset</button>
          <p className="mt-8 text-2xl font-bold text-red-500">
            TRANSCRIPT:{transcript}
          </p>
        </div>
      ) : (
        <div>not supported :(</div>
      )}
    </>
  );
};
export default Dictaphone;
