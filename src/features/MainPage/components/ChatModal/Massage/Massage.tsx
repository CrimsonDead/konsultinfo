import React, { FC } from "react";
import { IMassage } from "@/features/MainPage/types";
import cx from "classnames";

export const Massage: FC<IMassage> = ({
  id,
  isUser,
  text,
  children,
  classes,
  styles,
}) => {
  return (
    <div
      key={id}
      style={styles}
      className={cx(
        `w-[40%] p-2 flex items-center justify-center mb-[15px] rounded-[10px] ${isUser ? " bg-blue-300 ml-auto" : "bg-gray-200"}`,
        classes?.wrapper
      )}
    >
      <span className={classes?.text}>{text}</span>
      {children}
    </div>
  );
};
