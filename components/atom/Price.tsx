import { FC } from "react";

interface Props {
  price: number;
}

const Price: FC<Props> = ({ price }) => {
  return <span>{price.toLocaleString()}円</span>;
};

export default Price;
