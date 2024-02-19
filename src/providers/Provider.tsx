'use client';

import { store } from '@/store/store';
import React, { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

export const ProviderWrapper: FC<PropsWithChildren> = ({ children }) => {
  // const persistor = persistStore(store);
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        {children}
      {/* </PersistGate> */}
    </Provider>
  );
};
