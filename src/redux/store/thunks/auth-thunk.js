import { createAsyncThunk } from "@reduxjs/toolkit";
import authApi from "../../../apis/auth";

export const loginAsync = createAsyncThunk(
  "auth/loginAsync",
  async (credentials, thunkAPI) => {
    try {
      console.log(thunkAPI);
      const response = await authApi.register(credentials);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
