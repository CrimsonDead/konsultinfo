"use client";

import React, { FC, useState } from "react";
import { IProps, ICoordinates } from "./@types";
import { isUndefined } from "lodash";

export const MovingBubbles: FC<IProps> = ({
  left,
  top,
  interval = 3,
  distance = 600,
  step = 50,
  maxRotate = 200,
  children,
}) => {
  // change step if you want each coordinates change to be larger
  // change distance if you want to allow it to go further
  // change interval to make it change direction more frequently
  const [coordinates, setCoordinates] = useState<ICoordinates>({ x: 0, y: 0 });
  const getShift = (shiftDegree: number, shiftStep: number): ICoordinates => ({
    x: +(Math.cos((shiftDegree * Math.PI) / 180) * shiftStep).toFixed(),
    y: +(Math.sin((shiftDegree * Math.PI) / 180) * shiftStep).toFixed(),
  });

  let degree = +(Math.random() * 360).toFixed();
  const animationRepeater = () => {
    const onSetCoordinates = () =>
      setCoordinates((prevState) => {
        degree += +(Math.random() * maxRotate * 2 - maxRotate).toFixed();
        let shift = getShift(degree, step);
        while (
          Math.abs(prevState.x + shift.x) >= distance ||
          Math.abs(prevState.y + shift.y) >= distance
        ) {
          degree += +(Math.random() * maxRotate * 2 - maxRotate).toFixed();
          shift = getShift(degree, step);
        }
        return {
          x: prevState.x + shift.x,
          y: prevState.y + shift.y,
        };
      });
    setTimeout(onSetCoordinates, 1500);
  };

  const setAnimation = () => {
    if (typeof window === "undefined") return;
    if (!isUndefined(window)) window.requestAnimationFrame(animationRepeater);
  };

  setAnimation();

  return (
    <div
      style={{
        left: `${left}px`,
        top: `${top}px`,
        position: "fixed",
        zIndex: "-5",
      }}
    >
      <div
        style={{
          transform: `translate(${coordinates.x}px,${coordinates.y}px)`,
          transition: `transform ${interval}s linear`,
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};
