import Country from "./Country";
import Button from "./Button";

const Countries = ({ countries, onShowCountry, selectedCountry, weather }) => {
  return (
    <div>
      {selectedCountry ? (
        <Country data={selectedCountry} detailed={true} weather={weather} />
      ) : (
        countries.map((country) => (
          <div
            key={country.cca3}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <Country data={country} detailed={false} />
            <Button text="show" onClick={() => onShowCountry(country)} />
          </div>
        ))
      )}
    </div>
  );
};

export default Countries;
