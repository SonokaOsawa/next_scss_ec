import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface User {
  uid: string | null;
  name: string | null;
}

const initialState: User = { uid: null, name: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      return (state = action.payload);
    },
    logoutUser: (state) => {
      return (state = initialState);
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
