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
    <div className="bg-gray-200">
      {orders.map((order) => (
        <div key={order.id} className="border-b border-white">
          <div>{order.orderdate}</div>
          {order.iteminfo && (
            <>
              {order.iteminfo.map((orderitem) => (
                <div key={orderitem.id} className="text-center">
                  {items
                    .filter((item) => {
                      return orderitem.itemId === item.id;
                    })
                    .map((oi) => (
                      <div className="grid grid-cols-3 gap-4" key={oi.id}>
                        <div className="col-span-1 pt-1">
                          <Image
                            alt="cartimage"
                            src={`/${oi.img}`}
                            width={200}
                            height={200}
                          />
                        </div>
                        <div className="col-span-1 pt-1">
                          <p>{oi.name}</p>
                          <p>数量：{orderitem.buynum}</p>
                        </div>
                        <div className="col-span-1 pt-1">
                          {orderitem.price && <Price price={orderitem.price} />}
                        </div>
                      </div>
                    ))}
                </div>
              ))}
            </>
          )}
          {order.status === 9 ? (
            <div>キャンセル済み</div>
          ) : (
            <Btn
              onClick={() => cancelBtn(order)}
              classname="items-center shadow border-blue-500 border-2 rounded-full  px-4 py-2 text-blue-500 hover:bg-blue-500 hover:text-white"
              text="キャンセル"
            />
          )}
        </div>
      ))}
    </div>
  );
};
