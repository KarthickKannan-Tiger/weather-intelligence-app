export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  country_code?: string;
  admin1?: string; // State / Region
  elevation?: number;
  timezone?: string;
  population?: number;
}

export interface CurrentWeatherData {
  temperature: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  is_day: number;
  precipitation: number;
  weather_code: number;
  surface_pressure: number;
  wind_speed_10m: number;
  wind_direction_10m: number;
  uv_index: number;
  time: string;
}

export interface HourlyWeatherData {
  time: string[];
  temperature_2m: number[];
  relative_humidity_2m: number[];
  precipitation_probability: number[];
  weather_code: number[];
  wind_speed_10m: number[];
  uv_index: number[];
}

export interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
  uv_index_max: number[];
  precipitation_sum: number[];
  precipitation_probability_max: number[];
  wind_speed_10m_max: number[];
}

export interface WeatherResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current: CurrentWeatherData;
  hourly: HourlyWeatherData;
  daily: DailyWeatherData;
}

export type TemperatureUnit = 'celsius' | 'fahrenheit';
export type WindUnit = 'kmh' | 'mph' | 'ms';

export interface ActivityRecommendation {
  id: string;
  title: string;
  category: 'sports' | 'leisure' | 'travel' | 'home';
  status: 'Ideal' | 'Good' | 'Caution' | 'Unfavorable';
  iconName: string;
  reason: string;
  tip: string;
  score: number; // 0 to 100
}
