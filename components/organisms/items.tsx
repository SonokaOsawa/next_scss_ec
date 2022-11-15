import { FC } from "react";
import Item from "../molecule/item";
import { Itemtype } from "../../features/items";

interface Props {
  items: Itemtype[];
  noSearch: boolean;
}

const Items: FC<Props> = ({ items, noSearch }) => {
  return (
    <>
      {noSearch ? (
        <div>検索ワードに一致する商品はありません</div>
      ) : (
        <>
          <div className="items">
            {items.map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Items;
