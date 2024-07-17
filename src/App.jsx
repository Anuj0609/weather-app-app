import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const API = "MWCg3OcvciAzFpWYYxs65qwuWTVeHolE";

  const [inputSearch, setInputSearch] = useState("");
  const [locationResult, setLocationResult] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getYourLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API}&q=${inputSearch}`;
      const result = await axios.get(url);
      setLocationResult(result.data.slice(0, 5));
    } catch (err) {
      setError("Error fetching location data.");
    } finally {
      setLoading(false);
      setInputSearch("");
    }
  };

  const getWeather = async (locationKey) => {
    setLoading(true);
    setError(null);
    try {
      const url = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${API}`;
      const result = await axios.get(url);
      setWeather(result.data[0]);
    } catch (err) {
      setError("Error fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="MainContainer">
      <div className="search-container">
        <div className="input-button">
          <input
            className="input-field"
            type="text"
            placeholder="Search Your Address"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
          />
          <button
            className="button-I"
            onClick={getYourLocation}
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
        {error && <div className="error">{error}</div>}
        <div className="location-results">
          {locationResult.map((location) => (
            <button
              key={location.Key}
              className="button-O"
              onClick={() => getWeather(location.Key)}
            >
              {location.LocalizedName} -{" "}
              {location.AdministrativeArea.LocalizedName}
              {"-"}
              {location.Country.LocalizedName}
            </button>
          ))}
        </div>
      </div>
      {weather && (
        <div className="weather-info">
          {weather.WeatherText}: {weather.Temperature.Metric.Value}°
          {weather.Temperature.Metric.Unit}
        </div>
      )}
    </div>
  );
}

export default App;
