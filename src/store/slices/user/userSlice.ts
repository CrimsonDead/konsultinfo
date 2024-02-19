import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import fetchWithWrapper from "@/services/fetch";
import { IUserState } from "./@types";
import { API_URL } from "@/constants";

const initialState: IUserState = {
  loading: false,
  user: {},
  error: null,
  currentChat: {},
  chatLoading: false,
  chatSearchLoading: false,
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (action: { userId: string; isAdmin: boolean }) => {
    try {
      const { userId, isAdmin } = action;
      const response = await fetchWithWrapper.post(
        `${API_URL}/User/${isAdmin ? "admin" : "id"}`,
        { id: userId }
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error(`Fetch user error`);
    } catch (error) {
      console.error(error);
    }
  }
);

export const fetchChat = createAsyncThunk(
  "user/fetchChat",
  async (action: { chatId: string }) => {
    try {
      const { chatId } = action;
      const response = await fetchWithWrapper.post(`${API_URL}/Chat/id`, {
        id: chatId,
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error(`Fetch chat error`);
    } catch (error) {
      console.error(error);
    }
  }
);

export const searchChat = createAsyncThunk(
  "user/searchChat",
  async (action: { username: string }) => {
    try {
      const { username } = action;
      const response = await fetchWithWrapper(
        `${API_URL}/Chat/usernamefilterpage?username=${username}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      throw new Error(`Fetch chat error`);
    } catch (error) {
      console.error(error);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    removeUser(state) {
      state.user = initialState.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = initialState.loading;
      state.user = { ...state.user, ...action.payload };
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = initialState.loading;
      state.user = initialState.user;
      state.error = action.error.message as string;
    });
    builder.addCase(fetchChat.pending, (state) => {
      state.chatLoading = true;
      state.error = null;
    });
    builder.addCase(fetchChat.fulfilled, (state, action) => {
      state.chatLoading = false;
      state.currentChat = action.payload;
    });
    builder.addCase(searchChat.pending, (state) => {
      state.chatSearchLoading = true;
    });
    builder.addCase(searchChat.fulfilled, (state, action) => {
      const qwe = "asd";
      return {
        ...state,
        chatSearchLoading: false,
        user: {
          ...state.user,
          chats: action.payload,
        },
      };
    });
  },
});

export const getIsUserLoading = (state: RootState) => state.user.loading;
export const getUserError = (state: RootState) => state.user.error;
export const getUser = (state: RootState) => state.user.user;

export const { removeUser } = userSlice.actions;
