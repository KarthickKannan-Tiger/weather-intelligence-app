import React from 'react';
import { Clock, Umbrella } from 'lucide-react';
import { WeatherResponse, TemperatureUnit } from '../types/weather';
import { convertTemperature, getWeatherDetails } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface HourlyForecastSliderProps {
  weather: WeatherResponse;
  tempUnit: TemperatureUnit;
}

export const HourlyForecastSlider: React.FC<HourlyForecastSliderProps> = ({ weather, tempUnit }) => {
  const hourly = weather.hourly;
  if (!hourly || !hourly.time || hourly.time.length === 0) return null;

  // Take next 24 hours starting from current hour
  const now = new Date();
  const currentHourIndex = hourly.time.findIndex((t) => new Date(t) >= now);
  const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;
  const next24Hours = hourly.time.slice(startIndex, startIndex + 24);

  const unitSymbol = tempUnit === 'fahrenheit' ? '°F' : '°C';

  return (
    <div id="section-hourly-forecast" className="bg-slate-900/70 border border-slate-800/80 rounded-3xl p-5 backdrop-blur-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-sky-400" />
          <h3 className="text-base font-bold text-slate-100">Hourly Forecast</h3>
        </div>
        <span className="text-xs text-slate-400 font-mono">24-Hour Timeline</span>
      </div>

      <div className="flex items-center gap-3 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-slate-700">
        {next24Hours.map((timeStr, idx) => {
          const actualIndex = startIndex + idx;
          const temp = convertTemperature(hourly.temperature_2m[actualIndex] ?? 0, tempUnit);
          const code = hourly.weather_code[actualIndex] ?? 0;
          const precipProb = hourly.precipitation_probability?.[actualIndex] ?? 0;
          
          const hourDate = new Date(timeStr);
          const isCurrentHour = idx === 0;
          const hourLabel = isCurrentHour
            ? 'Now'
            : hourDate.toLocaleTimeString([], { hour: 'numeric' });

          const isDayHour = hourDate.getHours() >= 6 && hourDate.getHours() < 20;
          const details = getWeatherDetails(code, isDayHour);

          return (
            <div
              key={timeStr}
              className={`flex flex-col items-center justify-between p-3.5 rounded-2xl border min-w-[85px] transition-all shrink-0 ${
                isCurrentHour
                  ? 'bg-sky-500/15 border-sky-500/50 text-white shadow-lg shadow-sky-500/10'
                  : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60 text-slate-300'
              }`}
            >
              <span className="text-xs font-semibold text-slate-400">{hourLabel}</span>

              <div className="my-2 p-1.5 rounded-xl bg-slate-900/40">
                <WeatherIcon name={details.iconName} className="w-6 h-6 text-sky-300" />
              </div>

              <span className="text-sm font-bold text-slate-100">
                {temp}{unitSymbol}
              </span>

              {precipProb > 10 ? (
                <div className="mt-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[10px] font-bold">
                  <Umbrella className="w-2.5 h-2.5" />
                  {precipProb}%
                </div>
              ) : (
                <div className="mt-2 text-[10px] text-slate-500 font-mono">--</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
