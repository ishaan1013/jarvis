"use client";

import React, { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
// import { start } from "repl";

const Dictaphone = () => {
  //This is a boolean variable to see if the wake up word was said or not
  const [wake, setWake] = useState(false);

  //This array is where you put all of the commands that we need to recognize
  //command: "string"    -> The string here is the exact command that we are listening for. Use () around a word to make it optional
  //                        Can have multiple strings if you want multiple voice commands for the same function
  //callback: () => {}   -> This is the function that needs to run after the command is heard
  const commands = [
    //This first command is for the wake up word. If it hears Jarvis, it sets the wake variable to true
    {
      command: "(Hey) Jarvis",
      callback: () => setWake(true),
    },
    //For all other commands, check if (wake) and then have the functionality inside the if statement
    //At the end of the functionality portion, setWake(false) to make it so you do one command at a time
    {
      command: "Test",
      callback: () => {
        if (wake) {
          setWake(false);
        }
      },
    },
    //This is just here for reference in case you get a similar error to what this was doing
    // {
    //   command: "clear",
    //   callback: ({ resetTranscript }: { resetTranscript: () => void }) =>
    //     resetTranscript(),
    // },
  ];

  //Apparently we need this in order for the commands to work
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

  // const startListening = () =>
  //   SpeechRecognition.startListening({ continuous: true });

  //The next line makes it so the mic is on as soon as the page loads. We need this, it's just commented out for testing purposes.
  //SpeechRecognition.sta rtListening({ continuous: true });

  return (
    <div>
      <p>{wake ? "Jarvis awake" : "Jarvis off"}</p>
      <p>{transcript}</p>
    </div>
    // <button onClick={SpeechRecognition.stopListening}>Stop Listening</button>
    // <button onClick={startListening}>Start Listening</button>
  );
};

export default Dictaphone;
