import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../../apis/auth";
import { setAccessToken } from "../../../utils/local-storage";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials, thunkAPI) => {
    try {
      const response = await authApi.register(credentials);
      setAccessToken(response.data.accessToken);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAuthUser = createAsyncThunk(
  "auth/getAuthUser",
  async (_, thunkAPI) => {
    try {
      const response = await authApi.getAuthUser();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
