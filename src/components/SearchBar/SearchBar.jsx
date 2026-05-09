import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const handleChange = (e) => {
    onSearch(e.target.value); // filtrado en tiempo real
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        placeholder="Buscar por marca o modelo..."
        onChange={handleChange}
        className="searchbar__input"
      />
    </div>
  );
};

export default SearchBar;
