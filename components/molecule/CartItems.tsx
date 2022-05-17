import { FC } from "react";
import Image from "next/image";
import { Itemtype } from "../../features/items";
import {
  Carttype,
  deleteCartitem,
  selectCart,
  Iteminfotype,
  setCart,
} from "../../features/cart";
import Price from "../atom/Price";
import Btn from "../atom/Btn";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../features/user";

interface Props {
  items: Itemtype[];
}

export const CartItems: FC<Props> = ({ items }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cart = useSelector(selectCart);
  const deleteBtn = (iteminfo: Iteminfotype) => {
    if (user.uid) {
      // @ts-ignore
      dispatch(deleteCartitem(iteminfo, user.uid, cart));
    } else {
      let newcart: Carttype = { ...cart };
      if (cart.iteminfo) {
        newcart.iteminfo = cart.iteminfo.filter(
          (item) => item.id !== iteminfo.id
        );
        dispatch(setCart(newcart));
      }
    }
  };
  return (
    <div className="bg-gray-200">
      {cart.iteminfo && (
        <>
          {cart.iteminfo.map((cartitem) => (
            <div key={cartitem.id}>
              {items
                .filter((item) => {
                  return cartitem.itemId === item.id;
                })
                .map((ci) => (
                  <div className="grid grid-cols-3 gap-4" key={ci.id}>
                    <div className="col-span-1 pt-1">
                      <Image
                        alt="cartimage"
                        src={`/${ci.img}`}
                        width={200}
                        height={200}
                      />
                    </div>
                    <div className="col-span-1 pt-1">
                      <p>{ci.name}</p>
                      <p>数量：{cartitem.buynum}</p>
                    </div>
                    <div className="col-span-1 pt-1">
                      {cartitem.price && <Price price={cartitem.price} />}
                      <Btn
                        onClick={() => deleteBtn(cartitem)}
                        classname="items-center shadow border-blue-500 border-2 rounded-full  px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white"
                        text="削除"
                      />
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </>
      )}
    </div>
  );
};
