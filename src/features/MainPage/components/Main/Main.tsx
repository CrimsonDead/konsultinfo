import { FC } from "react";

export const Main: FC = () => {
  return (
    <section className="w-full bg-[url('/MainBackground.jpg')] " id="main">
      <div className="flex text-white font-playfair bg-[url('/MainBackground.jpg')] bg-cover">
        <div className="h-screen w-full md:w-[50%] bg-[#786F68]/[.8]  flex flex-col items-end justify-center">
          <div className="flex flex-col items-start md:w-[400px] pl-[40px] mr-16">
            <h1 className="font-bold text-5xl ">КонсультИнфо</h1>
            <p className="md:pr-16 pt-8 text-[20px]">
              Предоставление информации по различным отраслям права в вопросах
              урегулирования отношений и подготовки документов по сложившейся
              правовой ситуации (в сферах: гражданских, хозяйственных,
              брачно-семейных, уголовно-административных, налоговых, пенсионных,
              жилищных, вопросах, вопросах здравоохранения и т.п.)
            </p>
          </div>
        </div>
        <div className="hidden  w-[65%]  "></div>
      </div>
    </section>
  );
};
