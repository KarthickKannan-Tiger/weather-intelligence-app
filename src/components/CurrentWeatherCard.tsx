import React from 'react';
import {
  Wind,
  Droplets,
  Sun,
  Compass,
  ArrowDown,
  ArrowUp,
  Gauge,
  Sunrise,
  Sunset,
  Clock,
  MapPin,
} from 'lucide-react';
import { GeoLocation, WeatherResponse, TemperatureUnit, WindUnit } from '../types/weather';
import {
  getWeatherDetails,
  convertTemperature,
  convertWindSpeed,
  getWindDirectionText,
  getUvCategory,
} from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface CurrentWeatherCardProps {
  city: GeoLocation;
  weather: WeatherResponse;
  tempUnit: TemperatureUnit;
  windUnit: WindUnit;
}

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  city,
  weather,
  tempUnit,
  windUnit,
}) => {
  const current = weather.current;
  const isDay = current.is_day === 1;
  const details = getWeatherDetails(current.weather_code, isDay);

  const currentTemp = convertTemperature(current.temperature, tempUnit);
  const feelsLike = convertTemperature(current.apparent_temperature, tempUnit);

  const todayMax = convertTemperature(weather.daily.temperature_2m_max[0] ?? current.temperature, tempUnit);
  const todayMin = convertTemperature(weather.daily.temperature_2m_min[0] ?? current.temperature, tempUnit);

  const wind = convertWindSpeed(current.wind_speed_10m, windUnit);
  const windDir = getWindDirectionText(current.wind_direction_10m);

  const uvCat = getUvCategory(current.uv_index);

  // Format sunrise / sunset times
  const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    try {
      const date = new Date(isoString);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoString;
    }
  };

  const sunrise = formatTime(weather.daily.sunrise[0]);
  const sunset = formatTime(weather.daily.sunset[0]);

  const unitSymbol = tempUnit === 'fahrenheit' ? '°F' : '°C';

  return (
    <div
      id="card-current-weather"
      className={`relative overflow-hidden rounded-3xl border border-slate-700/60 bg-gradient-to-br ${details.bgGradient} p-6 sm:p-8 backdrop-blur-xl shadow-2xl transition-all`}
    >
      {/* Background Weather Ambient Decoration */}
      <div className="absolute -right-8 -top-8 w-64 h-64 opacity-10 blur-2xl rounded-full bg-sky-400 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Top Header Row: Location & Condition Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>{[city.admin1, city.country].filter(Boolean).join(', ')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-0.5">
              {city.name}
            </h2>
          </div>

          <div
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border ${details.badgeBg} backdrop-blur-md shadow-sm w-fit`}
          >
            <WeatherIcon name={details.iconName} className="w-5 h-5" />
            <span className="text-sm font-semibold">{details.description}</span>
          </div>
        </div>

        {/* Temperature & Main Display Row */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pt-2">
          <div className="flex items-baseline gap-4">
            <span className="text-6xl sm:text-7xl font-black text-white tracking-tighter">
              {currentTemp}
              <span className="text-4xl font-light text-slate-400 ml-1">{unitSymbol}</span>
            </span>

            <div className="space-y-1">
              <div className="text-sm font-medium text-slate-300">
                Feels like <span className="font-bold text-white">{feelsLike}{unitSymbol}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-400">
                <span className="flex items-center gap-0.5 text-rose-400">
                  <ArrowUp className="w-3.5 h-3.5" /> High {todayMax}{unitSymbol}
                </span>
                <span className="flex items-center gap-0.5 text-sky-400">
                  <ArrowDown className="w-3.5 h-3.5" /> Low {todayMin}{unitSymbol}
                </span>
              </div>
            </div>
          </div>

          {/* Sun Cycle Mini Card */}
          <div className="flex items-center gap-4 px-4 py-2.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sunrise className="w-4 h-4 text-amber-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Sunrise</div>
                <div className="font-bold text-slate-200">{sunrise}</div>
              </div>
            </div>
            <div className="h-6 w-px bg-slate-800" />
            <div className="flex items-center gap-2">
              <Sunset className="w-4 h-4 text-orange-400" />
              <div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Sunset</div>
                <div className="font-bold text-slate-200">{sunset}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Grid Key Weather Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
          {/* Wind Metric */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Wind className="w-4 h-4 text-sky-400" /> Wind Speed
              </span>
              <Compass className="w-3.5 h-3.5 text-slate-500" />
            </div>
            <div className="text-xl font-bold text-white">
              {wind.value} <span className="text-xs font-normal text-slate-400">{wind.label}</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-1">
              <span>Direction:</span>
              <span className="font-semibold text-slate-200">{windDir} ({current.wind_direction_10m}°)</span>
            </div>
          </div>

          {/* Humidity Metric */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-indigo-400" /> Humidity
              </span>
            </div>
            <div className="text-xl font-bold text-white">
              {current.relative_humidity_2m}<span className="text-xs font-normal text-slate-400">%</span>
            </div>
            {/* Visual Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, current.relative_humidity_2m))}%` }}
              />
            </div>
          </div>

          {/* UV Index Metric */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amber-400" /> UV Index
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-white">{current.uv_index.toFixed(1)}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${uvCat.badge}`}>
                {uvCat.label}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {current.uv_index >= 6 ? 'Sun protection advised' : 'Low skin risk'}
            </div>
          </div>

          {/* Surface Pressure Metric */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md space-y-2">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <Gauge className="w-4 h-4 text-emerald-400" /> Pressure
              </span>
            </div>
            <div className="text-xl font-bold text-white">
              {Math.round(current.surface_pressure)} <span className="text-xs font-normal text-slate-400">hPa</span>
            </div>
            <div className="text-xs text-slate-400">
              {current.surface_pressure > 1013 ? 'High pressure system' : 'Low pressure system'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
