import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "@microsoft/signalr-protocol-msgpack";
import { IMessage } from "@/features/AdminPage/@types";
import { AuthService, decodeJwt } from "@/services/auth";
import { useSearchParams } from "next/navigation";
import { useChatData } from ".";
import { isMessage } from "@/utils";
import { IMassage } from "@/features/MainPage";
const dayjs = require("dayjs");

//TODO fix this any type
export const useWebSocket = ({
  setMessages,
  isConnectionAllowed = true,
  isAdmin = true,
}: {
  setMessages: (value: any) => void;
  isConnectionAllowed: boolean;
  isAdmin?: boolean;
}) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  const { userId, chatId } = useChatData(isAdmin);

  const createConnection = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl("http://crimssondead-001-site4.ftempurl.com/api/chatsocket")
      .build();

    await connection.start();
    return connection;
  };

  const startConnection = async (connection: signalR.HubConnection | null) => {
    try {
      if (connection) {
        await connection.start();
      }
    } catch (error) {
      console.error("Error starting connection:", error);
    }
  };

  const addReceiveMessageListener = (
    connection: signalR.HubConnection | null,
    callback: (user: string, message: string) => void
  ) => {
    if (connection) {
      connection.on("Receive", (user, receivedMessage) => {
        callback(user, receivedMessage);
      });
    }
  };

  const addToChat = async (
    connection: signalR.HubConnection | null,
    chatId: string,
    userId: string
  ) => {
    try {
      if (connection) {
        await connection.invoke("AddToChat", chatId, userId);
      }
    } catch (error) {
      console.error("Error adding to chat:", error);
    }
  };

  const removeFromChat = async (
    connection: signalR.HubConnection | null,
    chatId: string,
    userId: string
  ) => {
    try {
      if (connection) {
        await connection.invoke("RemoveFromChat", chatId, userId);
      }
    } catch (error) {
      console.error("Error removing from chat:", error);
    }
  };

  const send = async (
    connection: signalR.HubConnection | null,
    userId: string,
    chatId: string,
    message: string
  ) => {
    try {
      if (connection) {
        await connection.invoke("Send", userId, chatId, message);
        if (isAdmin) {
          setMessages((prevState: IMessage[]) => [
            ...prevState,
            {
              id: userId,
              text: message,
              isAdmin: true,
              date: dayjs().format("HH:mm"),
            },
          ]);
          return;
        }
        setMessages((prevState: IMessage[] | IMassage[]) => {
          let messageToSet = {
            id: userId,
            text: message,
            date: dayjs().format("HH:mm"),
          };
          isMessage(prevState)
            ? ((messageToSet as unknown as IMessage).isAdmin = true)
            : ((messageToSet as IMassage).isUser = true);
          return [...prevState, messageToSet];
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (!isConnectionAllowed || !chatId || !userId) return;
    const setupConnection = async () => {
      const newConnection = await createConnection();
      setConnection(newConnection);
      addToChat(newConnection, chatId, userId);
    };

    setupConnection();

    return () => {
      removeFromChat(connection, chatId, userId);
    };
  }, [, isConnectionAllowed, chatId, userId]);

  useEffect(() => {
    if (!isConnectionAllowed || !chatId || !userId) return;
    startConnection(connection);
    addReceiveMessageListener(connection, (user, receivedMessage) => {
      if (user !== userId) {
        setMessages((prevState: IMessage[] | IMassage[]) => {
          let messageToSet = {
            id: user,
            text: receivedMessage,
            date: dayjs().format("HH:mm"),
          };
          isMessage(prevState)
            ? ((messageToSet as unknown as IMessage).isAdmin = false)
            : ((messageToSet as IMassage).isUser = false);
          return [...prevState, messageToSet];
        });
      }
    });
  }, [connection, isConnectionAllowed, chatId, userId]);

  const handleSendMessage = (text: string) => {
    send(connection, userId, chatId, text);
  };

  return {
    sendMessage: (text: string) => handleSendMessage(text),
    userId,
  };
};
