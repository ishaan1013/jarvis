"use client";

import { useEffect, useState } from "react";
import Logs from "./logs";
import { socket } from "@/lib";

export default function RealTime() {
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

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={trigger}
        className="mb-6 rounded-md bg-white px-3 py-2 text-sm font-medium text-black transition-all hover:bg-white/75"
      >
        Trigger Server Events
      </button>
      <Logs messages={messages} />
    </div>
  );
}
