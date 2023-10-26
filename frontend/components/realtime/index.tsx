"use client";

import { useEffect, useState } from "react";
import Logs from "./logs";
import { socket } from "@/lib";
import { TerminalSquare } from "lucide-react";

export default function RealTime() {
  const [modal, setModal] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.connect();
    console.log("CONNECTED");

    return () => {
      socket.disconnect();
      console.log("DISCONNECTED");
    };
  }, []);

  // separate effect to avoid unnecessary re-connections
  useEffect(() => {
    function handler(value: string) {
      setMessages([value, ...messages]);
    }

    socket.on("log", handler);

    return () => {
      socket.off("log", handler);
    };
  }, [messages]);

  const trigger = () => {
    socket.emit("trigger", Date.now());
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <div className="absolute bottom-4 left-4 flex flex-col items-start">
      {/* <button
        onClick={trigger}
        className="mb-6 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition-all hover:bg-white/75"
      >
        Trigger Server Events
      </button> */}
      {modal ? <Logs close={closeModal} messages={messages} /> : null}
      <button
        onClick={() => setModal((prev) => !prev)}
        className="z-50 mt-4 rounded-md border border-neutral-700 bg-neutral-900 p-2 transition-all hover:bg-neutral-800"
      >
        <TerminalSquare className="h-6 w-6 text-neutral-600" />
      </button>
    </div>
  );
}
