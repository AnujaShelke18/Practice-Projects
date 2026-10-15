import { CloudSun } from "lucide-react";
import SearchBar from "./SearchBar";

function Navbar({ onSearch }) {
  return (
    <nav className="navbar glass">
      <h1><CloudSun size={28} /> Weather App</h1>
      <SearchBar onSearch={onSearch} />
    </nav>
  );
}

export default Navbar;