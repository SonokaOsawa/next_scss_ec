import { FC } from "react";
import Image from "next/image";
import { Itemtype } from "../../features/items";
import { Ordertype, selectOrder, cancel } from "../../features/order";
import Price from "../atom/Price";
import Btn from "../atom/Btn";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  items: Itemtype[];
}

export const HistoryItems: FC<Props> = ({ items }) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrder);
  const cancelBtn = (orderitem: Ordertype) => {
    if (window.confirm("注文をキャンセルしますか？")) {
      // @ts-ignore
      dispatch(cancel(orderitem));
    }
  };
  return (
    <div className="">
      {orders.map((order) => (
        <div key={order.id} className="historyBox">
          {order.orderdate && <div>{order.orderdate.replace(/-/g, "/")}</div>}
          {order.iteminfo && (
            <>
              {order.iteminfo.map((orderitem) => (
                <div key={orderitem.id} className="">
                  {items
                    .filter((item) => {
                      return orderitem.itemId === item.id;
                    })
                    .map((oi) => (
                      <div className="flexBox" key={oi.id}>
                        <div className="imgBox">
                          <Image
                            alt="historyimage"
                            src={`/${oi.img}`}
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="historyDetail">
                          <div>{oi.name}</div>
                          <div>数量：{orderitem.buynum}</div>
                          {orderitem.price && <Price price={orderitem.price} />}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </>
          )}
          <div className="historyContentEnd">
            {order.status === 9 ? (
              <div className="cansel">キャンセル済み</div>
            ) : (
              <Btn
                onClick={() => cancelBtn(order)}
                classname="cancelbutton"
                text="キャンセル"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
