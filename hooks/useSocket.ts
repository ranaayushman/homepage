import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { createSocketConnection } from "@/app/lib/socket";

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
}

export const useSocket = (): UseSocketReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    // Prevent running on server-side
    if (typeof window === "undefined") {
      return;
    }

    // Create socket connection
    const socketIo: Socket = createSocketConnection();

    // Connection event handlers
    socketIo.on("connect", () => {
      console.log("Socket connected successfully");
      setIsConnected(true);
      setSocket(socketIo);
    });

    socketIo.on("disconnect", () => {
      console.log("Socket disconnected");
      setIsConnected(false);
      setSocket(null);
    });

    socketIo.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setIsConnected(false);
    });

    // Cleanup on unmount
    return () => {
      socketIo.disconnect();
    };
  }, []); // Empty dependency array since the URL is fixed in lib/socket.ts

  return { socket, isConnected };
};
