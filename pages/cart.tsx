import { useSelector } from "react-redux";
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
          <div className="itemdetailbody">
            <div className="cartdevide">
              <div>
                <CartItems items={items} />
              </div>
              <div>
                <CartPrice />
                <Btn
                  text="注文に進む"
                  classname="cartbutton"
                  onClick={showForm}
                />
                {show && <div>下に入力フォームがあります↓</div>}
              </div>
            </div>
            {show && <OrderForm />}
          </div>
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
