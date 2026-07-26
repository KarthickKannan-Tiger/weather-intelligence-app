import React, { useState } from 'react';
import { Calendar, Umbrella, Wind, Sun, ChevronRight, X, Droplets, Sunrise, Sunset } from 'lucide-react';
import { WeatherResponse, TemperatureUnit, WindUnit } from '../types/weather';
import { convertTemperature, convertWindSpeed, getWeatherDetails, getUvCategory } from '../utils/weatherCodes';
import { WeatherIcon } from './WeatherIcon';

interface ForecastCardsProps {
  weather: WeatherResponse;
  tempUnit: TemperatureUnit;
  windUnit: WindUnit;
}

export const ForecastCards: React.FC<ForecastCardsProps> = ({ weather, tempUnit, windUnit }) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);

  const daily = weather.daily;
  if (!daily || !daily.time) return null;

  const unitSymbol = tempUnit === 'fahrenheit' ? '°F' : '°C';

  // Find min and max across all 7 days for proper relative temperature bar scaling
  const allMax = daily.temperature_2m_max.map((t) => convertTemperature(t, tempUnit));
  const allMin = daily.temperature_2m_min.map((t) => convertTemperature(t, tempUnit));
  const minTempScale = Math.min(...allMin);
  const maxTempScale = Math.max(...allMax);
  const tempRange = maxTempScale - minTempScale || 1;

  // Format date helper
  const formatDayName = (dateStr: string, idx: number) => {
    if (idx === 0) return 'Today';
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { weekday: 'short' });
  };

  const formatDateShort = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const formatTimeStr = (isoStr?: string) => {
    if (!isoStr) return '--:--';
    try {
      return new Date(isoStr).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return isoStr;
    }
  };

  return (
    <div id="section-7day-forecast" className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-sky-400" />
          <h3 className="text-lg font-bold text-slate-100">7-Day Weather Forecast</h3>
        </div>
        <span className="text-xs text-slate-400">Click card for full day breakdown</span>
      </div>

      {/* 7-Day Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
        {daily.time.map((timeStr, idx) => {
          const code = daily.weather_code[idx] ?? 0;
          const maxTemp = convertTemperature(daily.temperature_2m_max[idx] ?? 0, tempUnit);
          const minTemp = convertTemperature(daily.temperature_2m_min[idx] ?? 0, tempUnit);
          const precipProb = daily.precipitation_probability_max?.[idx] ?? 0;
          const windSpeed = convertWindSpeed(daily.wind_speed_10m_max?.[idx] ?? 0, windUnit);
          const uvMax = daily.uv_index_max?.[idx] ?? 0;

          const details = getWeatherDetails(code, true);

          // Calculate visual temp bar positioning
          const leftPercent = ((minTemp - minTempScale) / tempRange) * 100;
          const widthPercent = Math.max(15, ((maxTemp - minTemp) / tempRange) * 100);

          return (
            <button
              key={timeStr}
              type="button"
              onClick={() => setSelectedDayIndex(idx)}
              className={`text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between gap-3 group relative overflow-hidden ${
                idx === 0
                  ? 'bg-gradient-to-b from-sky-500/15 via-slate-900/90 to-slate-900 border-sky-500/40 shadow-lg shadow-sky-500/5'
                  : 'bg-slate-900/80 hover:bg-slate-800/90 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Day Header */}
              <div className="flex items-center justify-between w-full">
                <div>
                  <div className="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors">
                    {formatDayName(timeStr, idx)}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {formatDateShort(timeStr)}
                  </div>
                </div>
                {idx === 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    NOW
                  </span>
                )}
              </div>

              {/* Weather Icon & Description */}
              <div className="flex items-center gap-2 my-1">
                <div className="p-2 rounded-xl bg-slate-800/80 group-hover:bg-sky-500/20 text-sky-400 transition-colors">
                  <WeatherIcon name={details.iconName} className="w-6 h-6" />
                </div>
                <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {details.shortDescription}
                </div>
              </div>

              {/* Temperature Min / Max */}
              <div className="space-y-1.5 w-full">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-sky-400">{minTemp}{unitSymbol}</span>
                  <span className="text-rose-400">{maxTemp}{unitSymbol}</span>
                </div>

                {/* Min-Max Bar Graphic */}
                <div className="w-full bg-slate-800 h-2 rounded-full relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-sky-400 via-amber-400 to-rose-500 rounded-full"
                    style={{
                      left: `${leftPercent}%`,
                      width: `${widthPercent}%`,
                    }}
                  />
                </div>
              </div>

              {/* Metrics Pills: Rain % & Wind */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-1 font-semibold text-blue-400">
                  <Umbrella className="w-3 h-3" />
                  <span>{precipProb}%</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 font-mono">
                  <Wind className="w-3 h-3" />
                  <span>{windSpeed.value}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded Day Detail Modal */}
      {selectedDayIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 max-w-lg w-full space-y-5 shadow-2xl relative">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h4 className="text-xl font-bold text-white">
                  {formatDayName(daily.time[selectedDayIndex], selectedDayIndex)} Forecast Breakdown
                </h4>
                <p className="text-xs text-slate-400 font-medium">
                  {formatDateShort(daily.time[selectedDayIndex])}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDayIndex(null)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Weather Overview */}
            {(() => {
              const code = daily.weather_code[selectedDayIndex] ?? 0;
              const details = getWeatherDetails(code, true);
              const maxTemp = convertTemperature(daily.temperature_2m_max[selectedDayIndex], tempUnit);
              const minTemp = convertTemperature(daily.temperature_2m_min[selectedDayIndex], tempUnit);
              const precipSum = daily.precipitation_sum?.[selectedDayIndex] ?? 0;
              const precipProb = daily.precipitation_probability_max?.[selectedDayIndex] ?? 0;
              const wind = convertWindSpeed(daily.wind_speed_10m_max?.[selectedDayIndex] ?? 0, windUnit);
              const uvMax = daily.uv_index_max?.[selectedDayIndex] ?? 0;
              const uvCat = getUvCategory(uvMax);

              return (
                <div className="space-y-4">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${details.bgGradient} border border-slate-700/50 flex items-center gap-4`}>
                    <div className="p-3 rounded-2xl bg-slate-900/60 text-sky-300">
                      <WeatherIcon name={details.iconName} className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{details.description}</div>
                      <div className="text-xs text-slate-300">
                        High of <span className="font-bold text-rose-400">{maxTemp}{unitSymbol}</span> and low of <span className="font-bold text-sky-400">{minTemp}{unitSymbol}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
                        <Droplets className="w-3.5 h-3.5 text-blue-400" /> Precipitation
                      </div>
                      <div className="text-base font-bold text-white">{precipSum} mm</div>
                      <div className="text-xs text-blue-400 font-medium">{precipProb}% chance max</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
                        <Wind className="w-3.5 h-3.5 text-sky-400" /> Max Wind Gusts
                      </div>
                      <div className="text-base font-bold text-white">{wind.value} {wind.label}</div>
                      <div className="text-xs text-slate-400">Peak daytime wind</div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
                        <Sun className="w-3.5 h-3.5 text-amber-400" /> Max UV Index
                      </div>
                      <div className="text-base font-bold text-white">{uvMax.toFixed(1)}</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${uvCat.badge}`}>
                        {uvCat.label}
                      </span>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/50 space-y-1">
                      <div className="text-xs text-slate-400 flex items-center gap-1.5 font-semibold">
                        <Sunrise className="w-3.5 h-3.5 text-amber-400" /> Sun Schedule
                      </div>
                      <div className="text-xs text-slate-200">
                        Rise: <span className="font-bold">{formatTimeStr(daily.sunrise?.[selectedDayIndex])}</span>
                      </div>
                      <div className="text-xs text-slate-200">
                        Set: <span className="font-bold">{formatTimeStr(daily.sunset?.[selectedDayIndex])}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};
