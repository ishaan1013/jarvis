"use client";

import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Mic } from "lucide-react";
import { useStore } from "@/lib/state";
import voiceToModel from "./voiceToModel";

export default function VoiceControl() {
  const { menuOpen, setMenuOpen, jarvis, setJarvis, setTarget } = useStore();

  const commands = [
    {
      command: "(Hey) Jarvis",
      callback: () => setJarvis(true),
    },
    {
      command: "Open (The) Menu",
      callback: () => {
        if (jarvis) {
          setMenuOpen(true);
          setJarvis(false);
        }
      },
    },
    {
      command: "Close (The) Menu",
      callback: () => {
        if (jarvis) {
          setMenuOpen(false);
          setJarvis(false);
        }
      },
    },
    {
      command: "Add (the) (a) *",
      callback: (model: string) => {
        if (jarvis) {
          // console.log(model);
          const modelName = voiceToModel(model);
          // console.log(modelName);
          setTarget(modelName);
          setJarvis(false);
        }
      },
    },
    {
      command: "Remove *",
      callback: () => {
        if (jarvis) {
          setTarget(null);
          setJarvis(false);
        }
      },
    },
    {
      command: "Print",
      callback: () => {
        if (jarvis) {
          console.log("Print");
          setJarvis(false);
        }
      },
    },
  ];

  const { transcript, browserSupportsSpeechRecognition } = useSpeechRecognition(
    { commands },
  );

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
    const initialValue = transcript;
    const disableOffsetTimeout = setTimeout(() => {
      if (initialValue === transcript) {
        setJarvis(false);
      }
    }, 3000);
    return () => clearTimeout(disableOffsetTimeout);
  }, [transcript]);

  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  return (
    // <>
    //   <div>
    //     <p>{supported ? "Browser is supported" : "Browser is not supported"}</p>
    //     <p>Transcript: {transcript}</p>
    //   </div>
    // </>

    <div
      className={`absolute left-1/2 top-4 z-50 flex h-10 -translate-x-1/2 items-center justify-center rounded-full border border-muted-foreground/50 bg-secondary px-4 duration-200 ${
        jarvis && !menuOpen
          ? "visible translate-y-0 opacity-100"
          : // : "visible translate-y-0 opacity-100"
            "invisible -translate-y-2 opacity-0"
      }`}
    >
      <Mic className="mr-2 h-4 w-4" /> Jarvis is listening...
      {/* <Mic className="mr-2 h-4 w-4" /> {transcript} */}
    </div>
  );
}
