import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    LogOut: (state, action) => {
      state.userInfo = null;
    },
  },
});
export const { addUserInfo ,LogOut} = authSlice.actions;
export default authSlice.reducer;
