"use client";

import { FC, useEffect, useState } from "react";
import { IMessage } from "../@types";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useSearchParams } from "next/navigation";
import { useChatData, useWebSocket } from "@/hooks";
import { useSelector } from "react-redux";
import { Loader } from "@/ui-kit";
import { isEmpty } from "lodash";
import { useAppDispatch } from "@/store";
import { fetchChat } from "@/store/slices/user";
const dayjs = require("dayjs");

export const AdminChat: FC = () => {
  const { chatId } = useChatData(true);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [message, setMessage] = useState<string>("");

  const {
    user: { chatLoading, currentChat },
  } = useSelector((store: any) => store);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!!chatId) dispatch(fetchChat({ chatId }));
  }, [, chatId]);

  const { sendMessage, userId } = useWebSocket({
    setMessages,
    isConnectionAllowed: !!chatId,
  });

  const handleSendMessage = () => {
    if (message === "") {
      return;
    }
    sendMessage(message);
    setMessage("");
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (!currentChat || chatLoading || !currentChat.messages) return;
    const parseReqData = currentChat.messages.map((item: any) => ({
      id: item.id,
      text: item.content,
      date: dayjs(item.sendDate).format("HH:mm"),
      isAdmin: item.usreId === userId,
    }));
    setMessages(parseReqData);
  }, [chatId, currentChat]);

  return (
    <main className="chat__body flex h-screen max-h-screen flex-col items-center justify-between pb-24 py-4 overflow-y-scroll relative overflow-hidden">
      <section className="chat__body">
        {!!chatId && (
          <div className="messages">
            {!!messages &&
              messages.map((message) => {
                if (!message.isAdmin) {
                  return (
                    <div className="message">
                      <div className="message__text">
                        <div className="message__text__content">
                          {message.text}
                          <div className="message__time">{message.date}</div>
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <div className="message my-message droplet">
                    <div className="message__text">
                      <div className="message__text__content">
                        {message.text}
                        <div className="message__time">{message.date}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </section>
      <svg height="0" width="0">
        <defs>
          <clipPath id="left-droplet">
            <path d="M 10,0 A 10,10 0 0 1 0,10 H 16 V 0 Z" />
          </clipPath>
          <clipPath id="right-droplet">
            <path d="M 6,0 A 10,10 0 0 0 16,10 H 0 V 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        style={{ width: "-webkit-fill-available" }}
        className="fixed bottom-0 z-50"
      >
        <div className="flex items-center rounded-lg p-[6px] bg-gray-300 w-full">
          <input
            className="p-4 w-full focus:outline-none"
            placeholder="Введите ваше сообщение"
            value={message}
            name="massageField"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (message !== "") {
                  handleSendMessage();
                }
              }
            }}
          />
          <button onClick={() => handleSendMessage()} className="ml-3">
            <RiSendPlane2Fill size="24px" color="#93C5FD" />
          </button>
        </div>
      </div>
    </main>
  );
};
