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
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
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
