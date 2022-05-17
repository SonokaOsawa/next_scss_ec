import { FC } from "react";

interface Props {
  text: string;
  onClick: () => void;
  classname: string;
}

const Btn: FC<Props> = ({ text, onClick, classname }) => {
  return (
    <button onClick={onClick} className={classname}>
      {text}
    </button>
  );
};

export default Btn;
