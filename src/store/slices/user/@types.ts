import { IChat } from "@/features/AdminPage/@types";

export interface IUser {
  id: number;
  login: string;
  // chats: IChat[]
  userName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  chat?: string;
}

export interface IUserState {
  loading: boolean;
  user: Partial<IUser>;
  error: string | null;
  currentChat: any;
  chatLoading: boolean;
  chatSearchLoading: boolean;
}

export interface IFetchUserData {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  message: string;
}
