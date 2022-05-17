import { FC, useState } from "react";
import SearchField from "../atom/SearchField";
import Btn from "../atom/Btn";

interface Props {
  search: (word: string | undefined) => void;
}

const SearchItems: FC<Props> = ({ search }) => {
  const [word, setWord] = useState("");
  return (
    <div className="bg-white shadow p-4 mb-4 w-1/2 container mx-auto flex">
      <SearchField
        placeholder="商品を検索する"
        onChange={(e) => setWord(e.target.value)}
        classname="w-full rounded p-4 mr-2"
      />
      <Btn
        text="Search"
        onClick={() => search(word)}
        classname="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4"
      ></Btn>
    </div>
  );
};

export default SearchItems;
