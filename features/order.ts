import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase/firebaseConfig";
import { AppThunk } from "./store";
import { Carttype } from "./cart";
import { resetCart } from "./cart";

export interface Ordertype extends Carttype {
  name?: string;
  email?: string;
  zipcode?: string;
  address?: string;
  tel?: string;
  orderdate?: string;
  deliveryDate?: string;
  deliveryTime?: string;
  paymethod?: string;
  card?: string;
  totalPrice?: number;
  timestamp?: number;
}

const initialState: Ordertype[] = [];

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action: PayloadAction<Ordertype>) => {
      let orders = [...state, action.payload];
      return (state = orders);
    },
    resetOrder: (state) => {
      return (state = initialState);
    },
  },
});

export const { setOrder, resetOrder } = orderSlice.actions;
export const selectOrder = (state: RootState) => state.order;

export default orderSlice.reducer;

export const getOrder =
  (uid: string): AppThunk =>
  (dispatch): void => {
    firebase
      .firestore()
      .collection(`users/${uid}/orders`)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (doc.data().status !== 0) {
            let order: Ordertype = doc.data();
            dispatch(setOrder(order));
          }
        });
      });
  };

export const order =
  (neworder: Ordertype): AppThunk =>
  (dispatch) => {
    firebase
      .firestore()
      .collection(`users/${neworder.uid}/orders`)
      .doc(neworder.id)
      .update(neworder)
      .then(() => {
        dispatch(setOrder(neworder));
        dispatch(resetCart());
      });
  };

export const cancel =
  (order: Ordertype): AppThunk =>
  (dispatch) => {
    firebase
      .firestore()
      .collection(`users/${order.uid}/orders`)
      .doc(order.id)
      .update({ status: 9 })
      .then(() => {
        dispatch(resetOrder());
        if (order.uid) {
          dispatch(getOrder(order.uid));
        }
      });
  };
