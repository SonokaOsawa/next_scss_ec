import { FC } from "react";
import { Itemtype } from "../../features/items";
import Image from "next/image";
import Link from "next/link";

interface Props {
  item: Itemtype;
}

const Item: FC<Props> = ({ item }) => {
  return (
    <Link href={`/${item.id}`} passHref className="link">
      <div className="item">
        <Image
          src={`/${item.img}`}
          alt="Pic"
          className="image"
          width={300}
          height={300}
          priority
        />
        <h3>{item.name}</h3>
        <p>{item.pm}円</p>
      </div>
    </Link>
  );
};

export default Item;
