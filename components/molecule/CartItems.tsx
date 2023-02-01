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
    <div>
      {cart.iteminfo && (
        <>
          {cart.iteminfo.map((cartitem) => (
            <div key={cartitem.id}>
              {items
                .filter((item) => {
                  return cartitem.itemId === item.id;
                })
                .map((ci) => (
                  <div className="cartitemwrapper" key={ci.id}>
                    <div className="position">
                      <Image
                        alt="cartimage"
                        src={`/${ci.img}`}
                        className="detailimage"
                        fill
                        sizes="(max-width: 400px) 100vw"
                        priority
                      />
                    </div>
                    <div className="">
                      <div className="name">{ci.name}</div>
                      <div className="cartdetail">
                        <div>数量：{cartitem.buynum}</div>
                        {cartitem.price && <Price price={cartitem.price} />}
                        <div>
                          <Btn
                            onClick={() => deleteBtn(cartitem)}
                            classname="deletebutton"
                            text="削除"
                          />
                        </div>
                      </div>
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
