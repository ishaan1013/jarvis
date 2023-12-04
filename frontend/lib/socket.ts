import { io } from "socket.io-client";

export const socket = io("http://127.0.0.1:8000/", {
  autoConnect: false,
});
