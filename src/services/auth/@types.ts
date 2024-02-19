import { ILoginAdmin } from '@/features/Authorization/types';

export interface ITokenDataType {
  id?: string;
  role?: string;
}

export interface IJwtValues {
  id?: string;
  userName?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  chat?: string;
  access: string;
  refresh: string;
}

export interface ILoginData {
  issue?: string;
  isAdmin?: boolean;
  category?: string;
  fullName?: string;
  password?: string;
  userName?: string;
  phoneNumber?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  message?: string;
  onSuccess?: (tokens?: IJwtValues) => void;
  onFailed?: (error: string) => void;
}

export interface ILoginAdminData extends ILoginAdmin {
  onSuccess?: (tokens?: IJwtValues) => void;
  onFailed?: (error: string) => void;
}

export interface IPostTypes extends ILoginData {
  refresh?: string;
  email?: string;
  password?: string;
}

export interface ITokenData {
  role: string;
  expire_date: string;
  user_id: string;
}
