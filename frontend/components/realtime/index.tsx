"use client";

import { useEffect, useState } from "react";
import Logs from "./logs";
import { socket, mapTranslation, mapRotation, mapScale } from "@/lib";
import { Gestures, ModelName, useStore } from "@/lib/state";
import { mapGestures } from "@/lib/3d/mapGestures";

export const trigger = () => {
  socket.emit("trigger", Date.now());
};

export default function RealTime() {
  const [modal, setModal] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const { setIsConnected, target } = useStore();

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
      if (gesture === "point") {
        if (
          Math.round(data.z * 10) / 10 < 0.5 &&
          Math.round(pointer.z * 10) / 10 >= 0.5
        ) {
          console.log("pointer click");
        }
      }

      setPointer(data);

      if (target) {
        if (gesture === "drag") {
          setPosition(target, {
            ...mapTranslation(data.x * 100, data.y * 100),
            z: 0,
          });
        } else if (gesture === "rotate") {
          setRotation(target, mapRotation(data.x, data.y, data.z));
        } else if (gesture === "scale") {
          setScale(target, mapScale(data.z));
        }
      }
    }

    function onMode(data: { mode: string }) {
      setGesture(data.mode === "none" ? null : mapGestures(data.mode));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("log", onLog);
    socket.on("pointer", onPointer);
    socket.on("mode", onMode);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("log", onLog);
      socket.off("pointer", onPointer);
      socket.off("mode", onMode);
    };
  }, [objects, pointer]);

  const closeModal = () => {
    setModal(false);
  };

  return null;
}
