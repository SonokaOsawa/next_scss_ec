import { useDispatch, useSelector } from "react-redux";
import Btn from "../components/atom/Btn";
import { CartItems } from "../components/molecule/CartItems";
import { selectItems } from "../features/items";
import { selectCart } from "../features/cart";
import { CartPrice } from "../components/molecule/CartPrice";
import { OrderForm } from "../components/organisms/OrderForm";
import { useState } from "react";
import { selectUser } from "../features/user";

const ShoppingCart = () => {
  const items = useSelector(selectItems);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const showForm = () => {
    if (user.uid) {
      setShow(true);
    } else {
      alert("ログインしてください");
    }
  };
  return (
    <>
      {cart.iteminfo !== undefined ? (
        cart.iteminfo.length !== 0 ? (
          <>
            <div className="flex content-start">
              <div className="w-2/3 p-2 text-gray-700 text-center">
                <CartItems items={items} />
              </div>
              <div className="w-1/3 p-2 text-gray-700 text-center">
                <CartPrice />
              </div>
            </div>
            <Btn
              text="注文に進む"
              classname="flex items-center shadow border-blue-500 border-2 rounded-full  px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white"
              onClick={showForm}
            />
            {show && <OrderForm />}
          </>
        ) : (
          <div>カートに商品がありません</div>
        )
      ) : (
        <div>カートに商品がありません</div>
      )}
    </>
  );
};

export default ShoppingCart;
