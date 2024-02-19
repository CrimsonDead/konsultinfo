import React, { FC } from "react";
import { ContactsForm } from "./ContactsForm";

export const Contacts: FC = () => {
  return (
    <section
      className="w-full h-[710px] bg-cover flex flex-col md:flex-row bg-[url('/contactsBackground.jpg')] text-white"
      id="contacts"
    >
      <article className="bg-[#36516C]/[.9] grow-[9] hidden md:flex justify-center md:justify-end pt-[10px] pr-[15px]">
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start ml-auto">
          <h1 className="font-playfair font-bold text-[30px]">СВЯЖИТЕСЬ</h1>
          <h1 className="font-playfair text-[30px]">С НАМИ</h1>
        </div>
      </article>
      <article className="bg-[#134B7E]/[.9] grow-[10] flex items-center justify-center flex-col md:block pl-[40px] pt-[20px]">
        <h1 className="font-playfair">
          <span className="font-bold">НАШ</span> АДРЕС
        </h1>
        <div className="mt-[40px]">
          <div>ул.Мележа 1, офис 315</div>
          <div>
            <span className="font-bold">Email:</span> koncyltinfo@mail.ru
          </div>
          <div>
            <span className="font-bold">Телефон:</span> +375(29)-337-74-64
          </div>
        </div>
        {/* <div className="mt-[30px] text-blue-200">Смотреть на карте</div> */}
        <div className="mt-[50px]">
          Напишите нам, и мы свяжемся с вами в ближайшее время:
        </div>
        <div className=" inline-flex gap-20">
          <ContactsForm />
          <div>
            <div className=" mt-[30px]">Пн-Пт 10:00-20:30</div>
            <div className=" mt-2">Сб-Вс 10:00-18:00</div>
          </div>
        </div>
      </article>
    </section>
  );
};
