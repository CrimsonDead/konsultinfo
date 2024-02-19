import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchWithWrapper from "@/services/fetch";
import { RootState } from "@/store";
import { filterMessages } from "@/utils";
import { IMassage } from "@/features/MainPage";
import { IMassageState } from "./@types";
import { isArray } from "lodash";
import { AuthService, decodeJwt } from "@/services/auth";
import { chatIdTokenKey, userIdTokenKey } from "@/hooks/useSocketData";

const initialState: IMassageState = {
  massages: {},
  error: "",
  isLoading: false,
};

export const fetchMassages = createAsyncThunk(
  "massageSlice/fetchMassages",
  async () => {
    try {
      const token = AuthService.getRefreshToken();
      const decodedJwt = decodeJwt(token);
      const userId = decodedJwt?.payload[userIdTokenKey];
      const chatId = decodedJwt?.payload[chatIdTokenKey];
      const response = await fetchWithWrapper.post(
        `${process.env.API_URL}/Chat/id`,
        { id: chatId }
      );
      const data = await response.json();
      if (response.ok) {
        return filterMessages(data.messages, userId);
      }
      throw new Error(`Fetch massages error: ${data}`);
    } catch (error) {
      throw new Error(`Fetch massages error: ${error}`);
    }
  }
);

export const massageSlice = createSlice({
  name: "massages",
  initialState,
  reducers: {
    addMassage(state, action) {
      if (isArray(state.massages)) state.massages.push(action.payload);
    },
    setMassages(state, action) {
      state.massages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMassages.pending, (state) => {
      state.isLoading = true;
      state.error = initialState.error;
    });
    builder.addCase(fetchMassages.fulfilled, (state, action) => {
      state.isLoading = initialState.isLoading;
      state.massages = action.payload;
    });
    builder.addCase(fetchMassages.rejected, (state, action) => {
      state.isLoading = initialState.isLoading;
      state.error = action.error.message as string;
    });
  },
});

export const getIsMassagesLoading = (state: RootState) =>
  state.massages.isLoading;
export const getMassagesError = (state: RootState) => state.massages.error;
export const getMassages = (state: RootState) => state.massages.massages;

export const { setMassages, addMassage } = massageSlice.actions;
