import React, { useState, useEffect, useCallback } from 'react';
import { GeoLocation, WeatherResponse, TemperatureUnit, WindUnit } from './types/weather';
import { getWeatherData, getCityFromCoordinates, POPULAR_CITIES } from './services/weatherApi';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CurrentWeatherCard } from './components/CurrentWeatherCard';
import { HourlyForecastSlider } from './components/HourlyForecastSlider';
import { TemperatureChart } from './components/TemperatureChart';
import { ForecastCards } from './components/ForecastCards';
import { ActivityPlanner } from './components/ActivityPlanner';
import { WeatherAlertsBanner } from './components/WeatherAlertsBanner';
import { ErrorDisplay, LoadingSkeleton } from './components/ErrorDisplay';

const FAVORITES_STORAGE_KEY = 'weather_intelligence_favorites';
const LAST_CITY_STORAGE_KEY = 'weather_intelligence_last_city';
const TEMP_UNIT_KEY = 'weather_intelligence_temp_unit';
const WIND_UNIT_KEY = 'weather_intelligence_wind_unit';

export default function App() {
  const [selectedCity, setSelectedCity] = useState<GeoLocation | null>(() => {
    try {
      const saved = localStorage.getItem(LAST_CITY_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return POPULAR_CITIES[0]; // Default to London
  });

  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Preference Settings
  const [tempUnit, setTempUnit] = useState<TemperatureUnit>(() => {
    return (localStorage.getItem(TEMP_UNIT_KEY) as TemperatureUnit) || 'celsius';
  });
  const [windUnit, setWindUnit] = useState<WindUnit>(() => {
    return (localStorage.getItem(WIND_UNIT_KEY) as WindUnit) || 'kmh';
  });

  // Favorite cities
  const [favorites, setFavorites] = useState<GeoLocation[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Ignore
    }
    return [POPULAR_CITIES[0], POPULAR_CITIES[1], POPULAR_CITIES[2]];
  });

  // Save units to localStorage
  const handleTempUnitChange = (unit: TemperatureUnit) => {
    setTempUnit(unit);
    localStorage.setItem(TEMP_UNIT_KEY, unit);
  };

  const handleWindUnitChange = (unit: WindUnit) => {
    setWindUnit(unit);
    localStorage.setItem(WIND_UNIT_KEY, unit);
  };

  // Toggle favorite
  const handleToggleFavorite = (city: GeoLocation) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.id === city.id || (f.latitude === city.latitude && f.longitude === city.longitude));
      let updated: GeoLocation[];
      if (exists) {
        updated = prev.filter((f) => f.id !== city.id && (f.latitude !== city.latitude || f.longitude !== city.longitude));
      } else {
        updated = [city, ...prev];
      }
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  // Fetch weather data for target city
  const fetchWeather = useCallback(async (city: GeoLocation) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getWeatherData(city.latitude, city.longitude);
      setWeather(data);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      localStorage.setItem(LAST_CITY_STORAGE_KEY, JSON.stringify(city));
    } catch (err: any) {
      console.error('Weather fetch error:', err);
      setError(err.message || 'Unable to load weather forecast for selected location.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity, fetchWeather]);

  // Handle City Select
  const handleSelectCity = (city: GeoLocation) => {
    setSelectedCity(city);
  };

  // Handle Current Geolocation
  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your current browser.');
      return;
    }

    setIsLocating(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const loc = await getCityFromCoordinates(latitude, longitude);
          setSelectedCity(loc);
        } catch (e) {
          setSelectedCity({
            id: Date.now(),
            name: 'Current Location',
            latitude,
            longitude,
          });
        } finally {
          setIsLocating(false);
        }
      },
      (geoError) => {
        setIsLocating(false);
        let msg = 'Failed to detect current location.';
        if (geoError.code === geoError.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please enable location access or search for a city manually.';
        } else if (geoError.code === geoError.POSITION_UNAVAILABLE) {
          msg = 'Location position is currently unavailable.';
        } else if (geoError.code === geoError.TIMEOUT) {
          msg = 'Location detection request timed out.';
        }
        setError(msg);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-sky-500 selection:text-white antialiased">
      {/* Top Application Header */}
      <Header
        tempUnit={tempUnit}
        onTempUnitChange={handleTempUnitChange}
        windUnit={windUnit}
        onWindUnitChange={handleWindUnitChange}
        onRefresh={() => selectedCity && fetchWeather(selectedCity)}
        isRefreshing={isLoading}
        lastUpdated={lastUpdated}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        {/* City Search Bar & Favorite Quick Select */}
        <section aria-label="City Search">
          <SearchBar
            onSelectCity={handleSelectCity}
            selectedCity={selectedCity}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onUseCurrentLocation={handleUseCurrentLocation}
            isLocating={isLocating}
          />
        </section>

        {/* Error Notification banner if any */}
        {error && (
          <ErrorDisplay
            message={error}
            type="network"
            onRetry={() => selectedCity && fetchWeather(selectedCity)}
          />
        )}

        {/* Loading Skeleton */}
        {isLoading && !error && <LoadingSkeleton />}

        {/* Weather Dashboard View */}
        {!isLoading && !error && weather && selectedCity && (
          <div className="space-y-6 transition-all duration-300">
            {/* Automatic Weather Condition Hazard Advisory */}
            <WeatherAlertsBanner weather={weather} />

            {/* Current Weather Highlight Card */}
            <CurrentWeatherCard
              city={selectedCity}
              weather={weather}
              tempUnit={tempUnit}
              windUnit={windUnit}
            />

            {/* 24-Hour Timeline Horizontal Slider */}
            <HourlyForecastSlider
              weather={weather}
              tempUnit={tempUnit}
            />

            {/* Interactive 7-Day & 24-Hour Recharts Temperature Trend */}
            <TemperatureChart
              weather={weather}
              tempUnit={tempUnit}
            />

            {/* 7-Day Forecast Cards */}
            <ForecastCards
              weather={weather}
              tempUnit={tempUnit}
              windUnit={windUnit}
            />

            {/* Weather-Based Smart Activity Planner */}
            <ActivityPlanner weather={weather} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 px-4 text-center text-xs text-slate-500 space-y-1">
        <p>Powered by Open-Meteo Public Geocoding & Weather Forecast API</p>
        <p className="text-slate-600">Built with React 19, Vite, Tailwind CSS, Recharts & Lucide Icons</p>
      </footer>
    </div>
  );
}
