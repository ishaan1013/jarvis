"use client";

import { useEffect, useState } from "react";
import Logs from "./logs";
import { socket } from "@/lib";
import { HardDriveDownload, RadioTower, TerminalSquare } from "lucide-react";
import Dnd from "../dnd";
import { ModelName, useStore } from "@/lib/state";

export default function RealTime() {
  const [modal, setModal] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  // const [{ x, y }, setCoordinates] = useState<{ x: number; y: number }>({
  //   x: 0,
  //   y: 0,
  // });

  const { objects, setPosition, setRotation, setScale } = useStore();

  useEffect(() => {
    socket.connect();
    console.log("CONNECTED");

    return () => {
      socket.disconnect();
      console.log("DISCONNECTED");
    };
  }, []);

  // separate effect for events
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onLog(value: string) {
      setMessages([value, ...messages]);
    }

    function onTranslate(data: { id: string; x: number; y: number }) {
      const modelName = data.id as ModelName;
      setPosition(modelName, {
        x: objects[modelName].position.x + data.x,
        y: objects[modelName].position.y + data.y,
        z: 0,
      });
    }

    function onRotate(data: { id: string; x: number; y: number; z: number }) {
      const modelName = data.id as ModelName;
      setRotation(modelName, {
        x: objects[modelName].rotation.x + data.x,
        y: objects[modelName].rotation.y + data.y,
        z: objects[modelName].rotation.z + data.z,
      });
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("log", onLog);
    socket.on("translate", onTranslate);
    socket.on("rotate", onRotate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("log", onLog);
      socket.off("translate", onTranslate);
      socket.off("rotate", onRotate);
    };
  }, [messages]);

  const trigger = () => {
    socket.emit("trigger", Date.now());
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className="absolute bottom-4 left-4 z-50 flex flex-col items-start">
        {modal ? (
          <Logs
            isConnected={isConnected}
            close={closeModal}
            messages={messages}
          />
        ) : null}
        <div className="mt-4 flex space-x-4">
          <button
            onClick={() => setModal((prev) => !prev)}
            className="z-50 rounded-md border border-neutral-700 bg-neutral-900 p-2 transition-all hover:bg-neutral-800"
          >
            <TerminalSquare className="h-6 w-6 text-neutral-600" />
          </button>
          <button
            onClick={() => trigger()}
            disabled={!isConnected}
            className="z-50 rounded-md border border-neutral-700 bg-neutral-900 p-2 transition-all hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-neutral-900"
          >
            <HardDriveDownload className="h-6 w-6 text-neutral-600" />
          </button>
        </div>
      </div>
      {/* <div className="z-10 h-full w-full">
        <Dnd x={x} y={y} setCoordinates={setCoordinates} />
      </div> */}
    </>
  );
}
