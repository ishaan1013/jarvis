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
      setMessages([...messages, value]);
    }

    socket.on("log", handler);

    return () => {
      socket.off("log", handler);
    };
  }, [messages]);

  return <Logs messages={messages} />;
}
