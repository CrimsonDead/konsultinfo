import React, { FC } from 'react';
import { CATEGORIES } from '@/features/MainPage/constants';
import { IMassageComponentProps } from '@/features/MainPage/types';
import { DEFAULT_MASSAGES } from '@/features/MainPage/constants';
import { useAppDispatch } from '@/store';
import { addMassage } from '@/store/slices/massages';

export const MassageCategoriesList: FC<IMassageComponentProps> = ({
  setDefaultData,
  setDefaultMassageIndex,
  setMassageType,
  defaultData,
  defaultMassageIndex,
  massageType,
}) => {
  const dispatch = useAppDispatch();

  const handleClick = (category: string) => {
    setDefaultData({ ...defaultData, [massageType]: category });
    dispatch(
      addMassage({
        id: Math.floor(Math.random() * 1000),
        isUser: true,
        userId: 1,
        text: category,
      })
    );
    dispatch(addMassage(DEFAULT_MASSAGES[defaultMassageIndex + 1]));
    setMassageType(DEFAULT_MASSAGES[defaultMassageIndex + 1].type as string);
    setDefaultMassageIndex(defaultMassageIndex + 1);
  };

  return (
    <ul className="flex list-none max-h-[200px] overflow-auto flex-col">
      {CATEGORIES.map(({ id, category }) => (
        <li
          key={id}
          className="flex items-center justify-center rounded-[10px] mb-[5px] shadow-md">
          <button
            value={category}
            onClick={() => handleClick(category)}>
            {category}
          </button>
        </li>
      ))}
    </ul>
  );
};
