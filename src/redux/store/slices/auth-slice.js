import { createSlice } from "@reduxjs/toolkit";
import { getAuthUser, loginAsync } from "../thunks/auth-thunk";
import { removeAccessToken } from "../../../utils/local-storage";

const initialState = {
  isAuthenticated: false,
  user: null,
  status: "idle",
  error: null,
};
// const initialState = {
//   isAuthenticated: true,
//   user: { name: "Mild" },
//   status: "idle",
//   error: null,
// };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.status = "idle";
      state.error = null;
      removeAccessToken();
      window.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(getAuthUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAuthUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(getAuthUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;

const authReducer = authSlice.reducer;
export default authReducer;
