import { useState, useEffect } from "react";
import countriesServer from "./services/countries";
import SearchBar from "./components/SearchBar";
import Countries from "./components/Countries";
import Country from "./components/Country";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const [countries, setCountires] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  const getAndSetCountries = () => {
    countriesServer.getAllCountries().then((resultCountries) => {
      setCountires(resultCountries);
    });
  };

  useEffect(getAndSetCountries, []);

  const handleSetCountryName = (name) => {
    setCountryName(name);
    setSelectedCountry(null); // in case I am typying while looking at details of a country
  };

  const getFilteredCountries = () => {
    return (
      countries.filter((country) => {
        return (
          country.name.common
            .toLowerCase()
            .includes(countryName.toLocaleLowerCase()) ||
          country.name.official
            .toLocaleLowerCase()
            .includes(countryName.toLocaleLowerCase())
        );
      }) || []
    );
  };

  const filteredCountries = getFilteredCountries();

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setSelectedCountry(filteredCountries[0]);
    } else if (!selectedCountry) {
      setWeather(null);
    }
  }, [filteredCountries, selectedCountry]);

  useEffect(() => {
    if (selectedCountry) {
      countriesServer
        .getCurrentWeatherByCoordinates(
          selectedCountry.capitalInfo.latlng[0],
          selectedCountry.capitalInfo.latlng[1]
        )
        .then((response) => {
          const weatherData = {
            temp: (response.main.temp - 273.15).toFixed(2),
            wind: response.wind.speed,
            icon: `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`,
          };
          setWeather(weatherData);
        });
    }
  }, [selectedCountry]);

  return (
    <div>
      <SearchBar
        countryName={countryName}
        setCountryName={(event) => handleSetCountryName(event.target.value)}
      />

      {countryName &&
        filteredCountries.length === 1 &&
        selectedCountry &&
        weather && (
          <Country data={selectedCountry} detailed={true} weather={weather} />
        )}
      {countryName &&
        filteredCountries.length > 1 &&
        filteredCountries.length <= 10 && (
          <Countries
            countries={filteredCountries}
            onShowCountry={(country) => setSelectedCountry(country)}
            selectedCountry={selectedCountry}
            weather={weather}
          />
        )}
      {countryName && filteredCountries.length > 10 && (
        <div>Too many matches, specify another filter</div>
      )}
    </div>
  );
};

export default App;
