const SearchBar = ({ countryName, setCountryName }) => {
  return (
    <div>
      find countries
      <input value={countryName} onChange={setCountryName} />
    </div>
  );
};

export default SearchBar;
