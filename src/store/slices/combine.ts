import { combineReducers } from '@reduxjs/toolkit';
import { userSlice } from './user/userSlice';
import { massageSlice } from './massages';

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [massageSlice.name]: massageSlice.reducer,
});
