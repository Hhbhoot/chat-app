import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthContex } from "./AuthContex";

export const socketContex = createContext();

export const useSocketContex = () => {
  return useContext(socketContex);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authenticatedUSer } = useAuthContex();

  useEffect(() => {
    if (authenticatedUSer) {
      const socket = io("http://localhost:8080", {
        query: { userId: authenticatedUSer._id },
        reconnectionDelay: 1000,
      });
      setSocket(socket);

      socket.on("onlineUsers", (users) => {
        setOnlineUser(users);
      });
    } else {
      if (socket) {
        setSocket(null);
        socket.close();
      }
    }
  }, [authenticatedUSer]);

  return (
    <socketContex.Provider value={{ socket, onlineUser }}>
      {children}
    </socketContex.Provider>
  );
};
