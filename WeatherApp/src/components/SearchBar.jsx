import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [cityName, setCityName] = useState("");
  return (
    <div className="search">
      <input
        placeholder="Search City"
        type="text"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button onClick={() => onSearch(cityName)} aria-label="Search">
        <Search size={18} />
      </button>
    </div>
  );
}

export default SearchBar;