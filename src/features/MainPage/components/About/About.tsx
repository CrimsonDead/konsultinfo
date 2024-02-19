"use client";

import { FC } from "react";
import { aboutParagraphs } from "../../constants";
import certificate from "@/assets/certificate.jpg";
import Image from "next/image";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import { useWindowDimensions } from "@/hooks";

export const About: FC = () => {
  const data = useWindowDimensions();

  return (
    <section className="w-full  bg-yellow-700" id="about">
      <div className="text-center text-white  font-playfair sm:pl-48 sm:pr-48 pl-12 pr-12 ">
        <h1 className="text-5xl font-bold sm:pt-24 sm:pb-24 pt-12 pb-12">
          {" "}
          О НАС
        </h1>
        <div className="">
          {aboutParagraphs.map((item) => (
            <div
              className="pb-24 flex justify-center text-[23px]"
              key={item.id}
            >
              {item.title}
            </div>
          ))}
        </div>
        <h1 className="text-5xl font-bold sm:pt-24 sm:pb-24 pt-12 pb-12">
          {" "}
          СЕРТИФИКАТ
        </h1>
        <div className="flex items-center justify-center mb-[20px]">
          <Image
            src={certificate}
            width={200}
            height={400}
            alt="Фото сертификата"
          />
        </div>
        <h1 className="md:text-5xl text-4xl font-bold sm:pt-24 sm:pb-24 pt-12 pb-12">
          {" "}
          НАШЕ МЕСТОНАХОЖДЕНИЕ
        </h1>
        <div className="mb-[20px] flex items-center justify-center">
          <Map
            width={(data?.width as number) - (data?.width as number) * 0.2}
            height={550}
            defaultState={{ center: [53.939534, 27.601348], zoom: 15 }}
          >
            <Placemark defaultGeometry={[53.939534, 27.601348]} />
          </Map>
        </div>
      </div>
    </section>
  );
};
