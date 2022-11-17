import { FC, useEffect, useState } from "react";
import { selectCart } from "../../features/cart";
import { useSelector } from "react-redux";
import Price from "../atom/Price";

export const CartPrice: FC = () => {
  const cart = useSelector(selectCart);
  const [totalPrice, setTotalprice] = useState(0);
  useEffect(() => {
    if (Object.keys(cart).length !== 0) {
      // @ts-ignore
      const total = cart.iteminfo.reduce((a, b) => a + b.price, 0);
      setTotalprice(total);
    }
  }, [cart]);
  return (
    <div className="name">
      合計金額：
      <Price price={totalPrice} />
    </div>
  );
};
