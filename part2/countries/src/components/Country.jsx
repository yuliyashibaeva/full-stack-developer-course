const Country = ({ data, detailed, weather }) => {
  return (
    <div>
      {detailed ? (
        <>
          <h1>
            {data.name.common} {data.name.common === "Finland" && "❤️"}
          </h1>
          <p>Capital {data.capital}</p>
          <p>Area {data.area}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(data.languages).map((language, index) => (
              <li key={index}>{language}</li>
            ))}
          </ul>
          <img src={data.flags.png} />
          <h2>Weather in {data.capital}</h2>
          {weather ? (
            <>
              <p>Temperature {weather.temp} Celsius</p>
              <img src={weather.icon} />
              <p>Wind {weather.wind} m/s</p>
            </>
          ) : (
            <p>Waiting for weather data.</p>
          )}
        </>
      ) : (
        <div>{data.name.common}</div>
      )}
    </div>
  );
};

export default Country;
