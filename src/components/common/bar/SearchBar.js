import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../../../styles/SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setTerm(newTerm);
    onSearch(newTerm); // 검색어 변경 시마다 부모 컴포넌트에 전달
  };

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="검색어를 입력해 주세요"
        className="searchInput"
        value={term}
        onChange={handleInputChange}
      />
      <button className="searchButton">
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
