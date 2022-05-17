import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import UserSlice from "./user";
import ItemsSlice from "./items";
import CartSlice from "./cart";
import OrderSlice from "./order";

export const store = configureStore({
  reducer: {
    user: UserSlice,
    items: ItemsSlice,
    cart: CartSlice,
    order: OrderSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
