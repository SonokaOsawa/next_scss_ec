import { useSelector } from "react-redux";
import { HistoryItems } from "../components/molecule/HistoryItems";
import { selectItems } from "../features/items";
import { selectOrder } from "../features/order";

const History = () => {
  const items = useSelector(selectItems);
  const orders = useSelector(selectOrder);
  return (
    <>
      {orders.length > 0 ? (
        <div className="flex content-start">
          <div className="w-2/3 p-2 text-gray-700">
            <HistoryItems items={items} />
          </div>
        </div>
      ) : (
        <div>注文履歴がありません</div>
      )}
    </>
  );
};

export default History;
