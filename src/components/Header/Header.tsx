"use client";

import React, { ChangeEvent, forwardRef, useRef, useState } from "react";
import Link from "next/link";
import { linksList } from "@/constants";
import { useModal, useOnClickOutside, useWindowDimensions } from "@/hooks";
import { IoMenu } from "react-icons/io5";
import logo from "@/assets/logoImage.jpg";
import Image from "next/image";
import cx from "classnames";
import { Modal } from "@/ui-kit/Modal";
import { AuthService } from "@/services/auth";

interface FormData {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  message: string;
}

const initialFields: (keyof FormData)[] = [
  "firstName",
  "lastName",
  "middleName",
  "phone",
  "message",
];

const initialFieldsLabels = [
  "Имя",
  "Фамилия",
  "Отчество",
  "Номер телефона",
  "сообщение",
];

export const Header = forwardRef<HTMLHeadElement>(({}, ref) => {
  const data = useWindowDimensions();
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const mobileNavRef = useRef(null);
  const { isOpened, closeModal, openModal } = useModal();

  const [formData, setFormData] = useState<FormData>(
    initialFields.reduce((acc, field) => ({ ...acc, [field]: "" }), {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      message: "",
    })
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClick = () => {
    const { firstName, lastName, middleName, phone, message } = formData;
    if (!firstName || !lastName || !middleName || !phone) return;
    AuthService.registerUser({
      firstName,
      lastName,
      middleName,
      phone,
      message,
      onSuccess: () => closeModal(),
    });
  };

  useOnClickOutside(mobileNavRef, () => setIsMenuActive(!isMenuActive), true);

  return (
    <header
      ref={ref}
      id="header"
      className="flex items-center md:justify-around bg-[#f59e0b] h-[12vh] w-full"
    >
      <Modal isOpen={isOpened} onClose={closeModal}>
        <div
          className={cx(
            "flex flex-col text-[14px] items-center justify-center gap-8 px-[55px] py-[70px]"
          )}
        >
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-2xl font-bold text-gray-800">
              Записаться на консультацию
            </h1>
          </div>
          <div className="mt-2 flex w-full items-center justify-center">
            <form style={{ width: "600px", margin: "auto" }}>
              {initialFields.map((field, index) => (
                <div key={field} style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", marginBottom: "5px" }}>
                    {initialFieldsLabels[index]}:
                  </label>
                  {field === "message" ? (
                    <textarea
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  ) : (
                    <input
                      style={{
                        width: "100%",
                        padding: "8px",
                        border: "1px solid #ccc",
                        borderRadius: "4px",
                      }}
                      type={field === "phone" ? "tel" : "text"}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
            </form>
          </div>
          <div className="mt-2 flex w-full items-center justify-center">
            <div
              className="cursor-pointer text-xl bg-[#00CD00] p-3 rounded-md"
              onClick={handleClick}
            >
              Записаться на косультацию
            </div>
          </div>
        </div>
      </Modal>
      <h1 className="text-[18px] md:text-[26px] flex font-playfair ml-[20px] select-none text-black items-center">
        <Image src={logo} width={30} height={50} alt="логотип фирмы" />
        <p className="pl-2 text-3xl">КонсультИнфо</p>
      </h1>
      {(data?.width as number) <= 768 && (
        <button
          onClick={() => setIsMenuActive(!isMenuActive)}
          className="z-10 absolute right-[20px]"
        >
          <IoMenu size="25" color="black" />
        </button>
      )}
      <div className="flex">
        <nav>
          <div className="hidden md:flex w-full pb-2">
            <span className="pr-3">
              email:{" "}
              <a href="mailto:koncyltinfo@mail.ru">koncyltinfo@mail.ru</a>
            </span>
            <span className="ml-auto" />
            телефон: <a href="tel:+375293377464">+375(29)-337-74-64</a>
          </div>
          <ul className="hidden md:flex list-none items-center text-black">
            {linksList.map((link, index) => (
              <li
                key={link.id}
                className={cx(
                  "text-[16px] font-sans",
                  index === linksList.length - 1 ? "mr-0" : "mr-7"
                )}
              >
                <Link href={link.href}>
                  <span>{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-[30px] hidden xl:flex items-center">
          <div className="cursor-pointer bg-[#00CD00] p-3" onClick={openModal}>
            Записаться на консультацию
          </div>
        </div>
      </div>
      {isMenuActive && (
        <nav
          ref={mobileNavRef}
          className="fixed top-[12vh] right-0 bg-white rounded-md"
        >
          <ul className="flex list-none flex-col items-center p-[4px] justify-center text-black">
            {linksList.map((link, index) => (
              <li
                key={link.id}
                className={cx(
                  "font-sans w-full text-center text-[22px]",
                  index === linksList.length - 1
                    ? ""
                    : "border-b-[1px] border-b-black"
                )}
                onClick={() => setIsMenuActive(!isMenuActive)}
              >
                <Link href={link.href}>
                  <span>{link.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
});
