import { GeoLocation, WeatherResponse } from '../types/weather';

export const POPULAR_CITIES: GeoLocation[] = [
  { id: 2643743, name: 'London', latitude: 51.5085, longitude: -0.1257, country: 'United Kingdom', country_code: 'GB', admin1: 'England' },
  { id: 5128581, name: 'New York', latitude: 40.7143, longitude: -74.006, country: 'United States', country_code: 'US', admin1: 'New York' },
  { id: 1850147, name: 'Tokyo', latitude: 35.6895, longitude: 139.6917, country: 'Japan', country_code: 'JP', admin1: 'Tokyo' },
  { id: 2988507, name: 'Paris', latitude: 48.8534, longitude: 2.3488, country: 'France', country_code: 'FR', admin1: 'Île-de-France' },
  { id: 2147714, name: 'Sydney', latitude: -33.8678, longitude: 151.2073, country: 'Australia', country_code: 'AU', admin1: 'New South Wales' },
  { id: 292223, name: 'Dubai', latitude: 25.2582, longitude: 55.3047, country: 'United Arab Emirates', country_code: 'AE', admin1: 'Dubai' },
  { id: 1880252, name: 'Singapore', latitude: 1.2897, longitude: 103.8501, country: 'Singapore', country_code: 'SG' },
];

export async function searchCities(query: string): Promise<GeoLocation[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=10&language=en&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Geocoding server error (${res.status})`);
    }
    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }
    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      country: item.country,
      country_code: item.country_code,
      admin1: item.admin1,
      elevation: item.elevation,
      timezone: item.timezone,
      population: item.population,
    }));
  } catch (error) {
    console.error('Error searching cities:', error);
    throw new Error('Unable to connect to city geocoding service. Please check your internet connection.');
  }
}

export async function getWeatherData(latitude: number, longitude: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m,uv_index',
    hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m,uv_index',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max,wind_speed_10m_max',
    timezone: 'auto',
  });

  const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Weather service responded with error (${res.status})`);
    }
    const data = await res.json();
    if (!data.current || !data.daily || !data.hourly) {
      throw new Error('Incomplete weather payload received from server.');
    }
    return data;
  } catch (error: any) {
    console.error('Error fetching weather data:', error);
    throw new Error(error.message || 'Failed to fetch weather data for selected location.');
  }
}

export async function getCityFromCoordinates(lat: number, lon: number): Promise<GeoLocation> {
  // Use Open-Meteo reverse geocoding if possible or fallback query
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${lat.toFixed(2)},${lon.toFixed(2)}&count=1&language=en&format=json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return {
          id: data.results[0].id,
          name: data.results[0].name,
          latitude: lat,
          longitude: lon,
          country: data.results[0].country,
          country_code: data.results[0].country_code,
          admin1: data.results[0].admin1,
        };
      }
    }
  } catch (e) {
    // Ignore and return approximate location format
  }

  return {
    id: Date.now(),
    name: 'Current Location',
    latitude: lat,
    longitude: lon,
    admin1: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`,
  };
}
