"use client";

import React, { FC, useEffect } from "react";
import { Header } from "@/components";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { IoMdArrowUp } from "react-icons/io";
import { useModal, useWindowDimensions } from "@/hooks";
import { Modal } from "@/ui-kit/Modal";
import { ChatModal } from "./ChatModal";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { Contacts } from "./Contacts";
import { Categories } from "./Categories";
import { About } from "./About";
import { Main } from "./Main";
import { AuthService } from "@/services/auth";

export const MainPage: FC = () => {
  const { ref, inView } = useInView();

  const data = useWindowDimensions();

  const { isOpened, closeModal, openModal } = useModal();

  useEffect(() => {
    if (AuthService.hasRefreshToken()) {
      AuthService.refreshTokens();
    }
  }, []);

  return (
    <>
      <Modal
        isOpen={isOpened}
        isOverlay={false}
        onClose={closeModal}
        classes={{
          modalWindow:
            "max-w-[400px] border-4 rounded-[10px] border-[#211d1c] bottom-[420px] fixed top-[5%] left-[0%] lg:left-[30%] md:left-[25%] sm:left-[18%]",
          closeIconContainer: "top-[0px] right-[0px]",
          closeIcon: "w-[25px] h-[25px]",
        }}
      >
        <ChatModal />
      </Modal>
      <Header ref={ref} />
      <main className="flex flex-col">
        <Main />
        <Categories />
        <About />
        <Contacts />
        {!inView && (
          <Link
            className="fixed bottom-[60px] left-[60px] z-10 bg-black"
            href="#header"
          >
            <IoMdArrowUp size="30px" color="white" />
          </Link>
        )}
        <div className="fixed bottom-[60px] right-[60px] animate-ping rounded-full w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-orange-400"></div>
        <div
          className="fixed bottom-[60px] right-[60px] cursor-pointer flex items-center justify-center rounded-full w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-[#ffa500]"
          onClick={() => openModal()}
        >
          <IoChatboxEllipsesSharp
            size={(data?.width as number) <= 768 ? "30" : "50"}
            color="black"
          />
        </div>
        {isOpened && (
          <div
            className="fixed bottom-[60px] right-[60px] z-40 cursor-pointer flex items-center justify-center rounded-full w-[40px] h-[40px] md:w-[80px] md:h-[80px] bg-[#ffa500]"
            onClick={() => closeModal()}
          >
            <IoChatboxEllipsesSharp
              size={(data?.width as number) <= 768 ? "30" : "50"}
              color="black"
            />
          </div>
        )}
      </main>
    </>
  );
};
