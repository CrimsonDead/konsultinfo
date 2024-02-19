'use client';

import React, { FC, PropsWithChildren } from 'react';
import { YMaps } from '@pbe/react-yandex-maps';

export const YnadexProvider: FC<PropsWithChildren> = ({ children }) => {
  return <YMaps>{children}</YMaps>;
};
