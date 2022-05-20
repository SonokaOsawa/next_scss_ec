import { FC, useState } from "react";

interface Props {
  search: (word: string | undefined) => void;
}

const SearchItems: FC<Props> = ({ search }) => {
  const [word, setWord] = useState("");
  return (
    <div className="searchitems">
      <div className="searchfield">
        <input
          type="text"
          placeholder="商品を検索する"
          onChange={(e) => setWord(e.target.value)}
          className="searchinput"
        />
        <button onClick={() => search(word)} className="searchbutton">
          <svg
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SearchItems;
