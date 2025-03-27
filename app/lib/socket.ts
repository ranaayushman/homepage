import { io, Socket } from "socket.io-client";

// Replace with your actual backend URL from .env.local
export const SOCKET_SERVER_URL: string =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000";

// Function to create a socket connection
export const createSocketConnection = (): Socket => {
  const socket = io(SOCKET_SERVER_URL, {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });

  return socket;
};
