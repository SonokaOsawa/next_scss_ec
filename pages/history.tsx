import { useSelector } from "react-redux";
import { HistoryItems } from "../components/molecule/HistoryItems";
import { selectItems } from "../features/items";
import order, { selectOrder } from "../features/order";

const History = () => {
  const items = useSelector(selectItems);
  const orders = useSelector(selectOrder);
  return (
    <>
      {orders.length > 0 ? (
        <div className="historyWrapper">
          <HistoryItems items={items} />
        </div>
      ) : (
        <h2 className="compBox">注文履歴がありません</h2>
      )}
    </>
  );
};

export default History;
