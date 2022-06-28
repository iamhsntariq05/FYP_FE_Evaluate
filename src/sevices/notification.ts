import { io } from "socket.io-client";

const socket = io("http://localhost:8080");

const sendGlobalNotification = (id: string, message: string) => {
  if (!id || !message) return;
  socket.emit("sendNotification", { noti: message, room: id });
};
export { sendGlobalNotification };
