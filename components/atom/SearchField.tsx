import { FC } from "react";

interface Props {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classname: string;
}

const SearchField: FC<Props> = ({ placeholder, onChange, classname }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={onChange}
      className={classname}
    />
  );
};

export default SearchField;
