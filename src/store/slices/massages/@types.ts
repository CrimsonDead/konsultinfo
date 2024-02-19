import { IMassage } from '@/features/MainPage';

export interface IMassageState {
  massages: IMassage[] | object;
  isLoading: boolean;
  error: string;
}
