import { ReactNode } from "react";
import { ILoginData } from "@/services";
import { Dispatch, SetStateAction } from "react";

export interface IMassage {
  id: string | number;
  type?: string;
  userId?: string;
  text: string;
  createdAt?: Date;
  isUser?: boolean;
  children?: ReactNode;
  date?: string;
  classes?: {
    wrapper?: string;
    text?: string;
  };
  styles?: { width: string };
}

export interface IMessageMessangerProps {
  setShouldSetConnection: Dispatch<SetStateAction<boolean>>;
  type: string;
}

export interface IDefaultData {
  issue: string;
  category: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
}

export interface IMassageComponentProps {
  setDefaultMassageIndex: Dispatch<SetStateAction<number>>;
  setDefaultData: Dispatch<SetStateAction<IDefaultData>>;
  setMassageType: Dispatch<SetStateAction<string>>;
  defaultMassageIndex: number;
  defaultData: IDefaultData;
  massageType: string;
}

export interface IContactsForm {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  issue: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  comment: string;
}
