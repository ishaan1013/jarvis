"use client";

import { useEffect, useState } from "react";
import Logs from "./logs";
import { socket, mapTranslation, mapRotation } from "@/lib";
import { Gestures, ModelName, useStore } from "@/lib/state";
import { mapGestures } from "@/lib/3d/mapGestures";

export const trigger = () => {
  socket.emit("trigger", Date.now());
};

export default function RealTime() {
  const [modal, setModal] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const { isConnected, setIsConnected } = useStore();

  const {
    objects,
    setPosition,
    setRotation,
    setScale,
    pointer,
    setPointer,
    gesture,
    setGesture,
  } = useStore();

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

    function onPointer(data: { x: number; y: number; z: number }) {
      // const { x, y } = pointer;
      // setPointer({
      //   x: x + data.x,
      //   y: y + data.y,
      // });

      setPointer(data);

      if (gesture === "drag") {
        setPosition("goose", {
          ...mapTranslation(data.x * 100, data.y * 100),
          z: 0,
        });
      }
      if (gesture === "rotate") {
        setRotation("goose", mapRotation(data.x, data.y, data.z));
      }
    }

    function onMode(data: { mode: string }) {
      setGesture(data.mode === "none" ? null : mapGestures(data.mode));
    }

    // function onTranslate(data: { id: string; x: number; y: number }) {
    //   const modelName = data.id as ModelName;
    //   const { x, y } = objects[modelName].position;
    //   setPosition(modelName, {
    //     x: x + data.x,
    //     y: y + data.y,
    //     z: 0,
    //   });
    // }

    // function onRotate(data: { id: string; x: number; y: number; z: number }) {
    //   const modelName = data.id as ModelName;
    //   setRotation(modelName, {
    //     x: objects[modelName].rotation.x + data.x,
    //     y: objects[modelName].rotation.y + data.y,
    //     z: objects[modelName].rotation.z + data.z,
    //   });
    // }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("log", onLog);
    socket.on("pointer", onPointer);
    socket.on("mode", onMode);
    // socket.on("translate", onTranslate);
    // socket.on("rotate", onRotate);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("log", onLog);
      socket.off("pointer", onPointer);
      socket.off("mode", onMode);
      // socket.off("translate", onTranslate);
      // socket.off("rotate", onRotate);
    };
  }, [objects, pointer]);

  const closeModal = () => {
    setModal(false);
  };

  return null;
}
