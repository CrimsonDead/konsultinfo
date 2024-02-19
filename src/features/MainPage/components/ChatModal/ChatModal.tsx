'use client';

import React, { FC, useState, useRef, useEffect } from 'react';
import { RiSendPlane2Fill } from 'react-icons/ri';
import { IDefaultData, IMassage } from '../../types';
import {
  MassageCategoriesList,
  MassageMasangersList,
  Massage,
} from './Massage';
import { DEFAULT_MASSAGES } from '../../constants';
import { formatDefaultMassage } from '@/utils';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/store';
import { isEmpty, isArray } from 'lodash';
import {
  addMassage,
  getMassages,
  setMassages,
  fetchMassages,
} from '@/store/slices/massages';
import { AuthService } from '@/services/auth';
import { useWebSocket } from '@/hooks';
import { IMessage } from '@/features/AdminPage/@types';

export const ChatModal: FC = () => {
  const [message, setMassage] = useState<string>('');
  const [defaultMassageIndex, setDefaultMassageIndex] = useState<number>(0);
  const [massageType, setMassageType] = useState<string>(
    DEFAULT_MASSAGES[0].type as string
  );
  const [defaultData, setDefaultData] = useState<IDefaultData>({
    issue: '',
    category: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phone: '',
  });
  const [shouldSetConnection, setShouldSetConnection] =
    useState<boolean>(false);
  const dispatch = useAppDispatch();
  const massages = useSelector(getMassages);
  const lastMassag = useRef<HTMLDivElement | null>(null);
  const { sendMessage } = useWebSocket({
    setMessages: (
      fn: (prevState: IMessage[] | IMassage[]) => IMessage[] | IMassage[]
    ) => {
      const data = fn(massages as IMassage[]);
      dispatch(addMassage(data[data.length - 1]));
    },
    isConnectionAllowed: shouldSetConnection,
    isAdmin: false,
  });

  useEffect(() => {
    if (AuthService.hasAccessToken()) {
      dispatch(fetchMassages());
      setShouldSetConnection(true);
    }
    if (isEmpty(massages) && !AuthService.hasAccessToken())
      dispatch(setMassages([DEFAULT_MASSAGES[0]]));
  }, []);

  useEffect(() => {
    lastMassag.current?.scrollIntoView({ behavior: 'smooth' });
    // if (
    //   AuthService.hasAccessToken() &&
    //   isArray(massages) &&
    //   massages.length === 1
    // ) {
    //   dispatch(addMassage(DEFAULT_CONNECTION_ANSWER));
    // }
    // lastMassag.current?.scrollIntoView({ behavior: 'smooth' });
  }, [massages]);

  const handleMassages = async () => {
    if (AuthService.hasAccessToken()) {
      if (message === '') {
        return;
      }
      sendMessage(message);
      setMassage('');
    } else {
      setDefaultData({ ...defaultData, [massageType]: message });
      const randId = `${Math.floor(Math.random() * 10000)}`;
      dispatch(
        addMassage({
          id: randId,
          isUser: true,
          userId: randId,
          text: message,
        })
      );
      dispatch(addMassage(DEFAULT_MASSAGES[defaultMassageIndex + 1]));
      if (massageType === 'phone') {
        const messageText = formatDefaultMassage({
          ...defaultData,
          phone: message,
        });
        await AuthService.registerUser({
          firstName: defaultData.firstName,
          middleName: defaultData.middleName,
          lastName: defaultData.lastName,
          phone: message,
          message: messageText,
        });
      }
      setMassageType(DEFAULT_MASSAGES[defaultMassageIndex + 1].type as string);
      setDefaultMassageIndex(defaultMassageIndex + 1);
      setMassage('');
    }
  };

  return (
    <>
      <div className="bg-[#211d1c] h-[28px]" />
      <div className="overflow-auto bg-white h-[35vh] p-[10px] overflow-x-hidden">
        {isArray(massages) &&
          massages.map((message) => (
            <Massage
              id={message.id}
              key={message.id}
              isUser={message.isUser}
              text={message?.text}
              classes={message?.classes}
              styles={message?.styles}>
              {message.type === 'category' && (
                <MassageCategoriesList
                  setDefaultData={setDefaultData}
                  setDefaultMassageIndex={setDefaultMassageIndex}
                  setMassageType={setMassageType}
                  defaultData={defaultData}
                  defaultMassageIndex={defaultMassageIndex}
                  massageType={massageType}
                />
              )}
              {message.type === 'massanger' && (
                <MassageMasangersList
                  setShouldSetConnection={setShouldSetConnection}
                  type={massageType}
                />
              )}
            </Massage>
          ))}
        <div ref={lastMassag}></div>
      </div>
      <div className="flex items-center rounded-buttom p-[6px] bg-gray-300">
        <input
          className="p-[3px] w-[90%] focus:outline-none"
          placeholder="Введите ваше сообщение"
          value={message}
          name="massageField"
          onChange={(e) => setMassage(e.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              if (message !== '') {
                handleMassages();
              }
            }
          }}
        />
        <button
          onClick={handleMassages}
          className="ml-[10px]">
          <RiSendPlane2Fill
            size="24px"
            color="#93C5FD"
          />
        </button>
      </div>
    </>
  );
};
