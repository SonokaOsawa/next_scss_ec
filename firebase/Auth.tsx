import firebase from "./firebaseConfig";
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { loginUser, logoutUser } from "../features/user";
import { getItems } from "../features/items";
import { getCart, resetCart } from "../features/cart";
import { getOrder, resetOrder } from "../features/order";

interface AuthContextProps {
  currentUser: firebase.User | null | undefined;
}

interface Props {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({ currentUser: undefined });

const AuthProvider = ({ children }: Props) => {
  const [currentUser, setCurrentUser] = useState<
    firebase.User | null | undefined
  >(undefined);
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      // ログイン状態が変化すると呼ばれる
      setCurrentUser(user);
      if (user) {
        let uid = user.uid;
        let name = user.displayName;
        dispatch(loginUser({ uid, name }));
        // @ts-ignore
        dispatch(getCart(uid));
        // @ts-ignore
        dispatch(getOrder(uid));
      } else {
        dispatch(logoutUser());
        dispatch(resetCart());
        dispatch(resetOrder());
      }
    });
    // @ts-ignore
    dispatch(getItems());
  }, [dispatch]);
  return (
    <AuthContext.Provider value={{ currentUser: currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
