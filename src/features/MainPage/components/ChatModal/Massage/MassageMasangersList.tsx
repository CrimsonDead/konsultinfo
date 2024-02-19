import React, { FC } from 'react';
import { MASSANGERS } from '@/features/MainPage/constants';
import Link from 'next/link';
import { IMessageMessangerProps } from '@/features/MainPage';
import { DEFAULT_CONNECTION_ANSWER } from '@/features/MainPage/constants';
import { useAppDispatch } from '@/store';
import { addMassage } from '@/store/slices/massages';

export const MassageMasangersList: FC<IMessageMessangerProps> = ({
  setShouldSetConnection,
  type,
}) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    if (type === 'massanger') {
      dispatch(addMassage(DEFAULT_CONNECTION_ANSWER));
      setShouldSetConnection(true);
    }
  };

  return (
    <ul className="flex list-none">
      {MASSANGERS.map((item) => (
        <li
          key={item.id}
          className="flex items-center mr-[4px] justify-center rounded-[10px] shadow-md p-[4px]">
          {item.href ? (
            <Link href={item.href}>
              <span>{item.massanger}</span>
            </Link>
          ) : (
            <button
              value={item.massanger}
              onClick={handleClick}>
              {item.massanger}
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
