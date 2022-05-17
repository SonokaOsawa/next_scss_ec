import { FC } from "react";
import { Itemtype } from "../../features/items";
import Image from "next/image";
import Link from "next/link";

interface Props {
  item: Itemtype;
}

const Item: FC<Props> = ({ item }) => {
  return (
    <Link href={`/${item.id}`} passHref>
      <div className="group">
        <div className="w-full">
          <Image
            src={`/${item.img}`}
            alt="Pic"
            className="rounded-lg h-full w-full object-center object-cover group-hover:opacity-75"
            width={400}
            height={400}
          />
        </div>
        <h3 className="mt-4 text-base text-gray-700">{item.name}</h3>
        <p className="mt-1 text-base font-medium text-gray-900">{item.pm}円</p>
      </div>
    </Link>
  );
};

export default Item;
