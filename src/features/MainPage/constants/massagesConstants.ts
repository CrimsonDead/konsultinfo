import { IMassage } from '..';

export const DEFAULT_MASSAGES: IMassage[] = [
  {
    id: `${Math.floor(Math.random() * 10000)}`,
    type: 'issue',
    userId: `${Math.floor(Math.random() * 10000)}`,
    isUser: false,
    text: 'Здравствуйет, чем могу вам помочь?',
  },
  {
    id: `${Math.floor(Math.random() * 10000)}`,
    type: 'category',
    isUser: false,
    userId: `${Math.floor(Math.random() * 10000)}`,
    styles: { width: '280px' },
    classes: {
      wrapper: 'flex-col text-center',
      text: 'mb-[10px]',
    },
    text: 'Выберите отросль права',
  },
  {
    id: `${Math.floor(Math.random() * 10000)}`,
    userId: `${Math.floor(Math.random() * 10000)}`,
    type: 'firstName',
    isUser: false,
    text: 'Введите ваше имя',
  },
  {
    id: `${Math.floor(Math.random() * 10000)}`,
    userId: `${Math.floor(Math.random() * 10000)}`,
    type: 'middleName',
    isUser: false,
    text: 'Введите ваше отчество',
  },
  {
    id: `${Math.floor(Math.random() * 10000)}`,
    userId: `${Math.floor(Math.random() * 10000)}`,
    type: 'lastName',
    isUser: false,
    text: 'Введите вашу фамилию',
  },
  {
    id: `${Math.floor(Math.random() * 10000)}`,
    type: 'phone',
    isUser: false,
    userId: `${Math.floor(Math.random() * 10000)}`,
    text: 'Введите ваш номер телефона.',
  },
  {
    id: `${Math.floor(Math.random() * 10000)}`,
    type: 'massanger',
    userId: `${Math.floor(Math.random() * 10000)}`,
    styles: { width: '280px' },
    classes: {
      wrapper: 'flex-col text-center',
    },
    isUser: false,
    text: 'Выберите где хотите продолжить общение',
  },
];

export const CATEGORIES = [
  { id: 2, category: 'Уголовное' },
  { id: 3, category: 'Административное' },
  { id: 4, category: 'Налоговое' },
  { id: 5, category: 'Гражданское' },
  { id: 6, category: 'Семейное' },
  { id: 7, category: 'Земельное' },
  { id: 8, category: 'Медицинское' },
  { id: 9, category: 'Пенсионное' },
  { id: 10, category: 'Трудовое' },
  { id: 11, category: 'Жилищное' },
  { id: 12, category: 'Дебиторское' },
];

export const MASSANGERS = [
  { id: 1, massanger: 'Viber', href: 'https://viber.click/375291536719' },
  { id: 2, massanger: 'Telegram', href: 'https://t.me/dobrachka' },
  { id: 3, massanger: 'Почта', href: 'mailto:kisluak53773@gmail.com' },
  { id: 4, massanger: 'Остаться здесь' },
];

export const DEFAULT_MASSAGE_NAMING = {
  issue: 'Проблема:',
  category: 'Раздел правав:',
  firstName: 'Имя:',
  middleName: 'Отчество:',
  lastName: 'Фамилия:',
  phone: 'Номер телефона',
};

export const DEFAULT_CONNECTION_ANSWER = {
  id: `${Math.floor(Math.random() * 10000)}`,
  userId: `${Math.floor(Math.random() * 10000)}`,
  isUser: false,
  text: 'Подождите пару минут, сейчас вам ответит наш специалист',
};
