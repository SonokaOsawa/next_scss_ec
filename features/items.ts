import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import firebase from "../firebase/firebaseConfig";
import { AppThunk } from "./store";

export interface Itemtype {
  id?: number;
  name?: string;
  des?: string;
  pm?: number;
  pl?: number;
  img?: string;
}

const initialState: Itemtype[] = [];

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Itemtype[]>) => {
      return (state = action.payload);
    },
  },
});

export const { setItems } = itemsSlice.actions;
export const selectItems = (state: RootState) => state.items;

export default itemsSlice.reducer;

export const getItems = (): AppThunk => (dispatch) => {
  firebase
    .firestore()
    .collection("items")
    .get()
    .then((snapshot) => {
      let items: Itemtype[] = [];
      snapshot.forEach((item) => {
        let itemdata = item.data();
        items.push(itemdata);
      });
      return dispatch(setItems(items));
    });
};
