import { FC, useState } from "react";

interface Props {
  search: (word: string | undefined) => void;
}

const SearchItems: FC<Props> = ({ search }) => {
  const [word, setWord] = useState("");
  return (
    <div className="searchfield">
      <input
        type="text"
        placeholder="商品を検索する"
        onChange={(e) => setWord(e.target.value)}
        className="searchinput"
      />
      <button onClick={() => search(word)} className="searchbutton">
        search
      </button>
    </div>
  );
};

export default SearchItems;
