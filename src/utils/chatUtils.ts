import { IContactsForm, IMassage } from '@/features/MainPage/types';
import { IDefaultData } from '@/features/MainPage/types';
import { DEFAULT_MASSAGE_NAMING } from '@/features/MainPage/constants';
import dayjs from 'dayjs';
import { IMessage } from '@/features/AdminPage/@types';
import { isArray } from 'lodash';

export const filterMessages = (massages: any[], userId: string): IMassage[] => {
  return massages.map((massage) => ({
    id: massage.id,
    text: massage.content,
    date: dayjs(massage.sendDate).format('HH:mm'),
    isUser: massage.usreId === userId,
  }));
};

export const formatDefaultMassage = (
  defaultMassage: IDefaultData | IContactsForm
) => {
  let result = '';
  Object.entries(defaultMassage).map(([key, value]) => {
    result += `${DEFAULT_MASSAGE_NAMING[key as 'issue' | 'category' | 'firstName' | 'middleName' | 'lastName' | 'phone']} ${value};\n`;
  });
  return result;
};

export const isMessage = (value: any): value is IMessage =>
  isArray(value) ? !!value[0].isAdmin : !!value.isAdmin;

  