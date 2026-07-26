import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { TrendingUp, Calendar, Clock } from 'lucide-react';
import { WeatherResponse, TemperatureUnit } from '../types/weather';
import { convertTemperature, getWeatherDetails } from '../utils/weatherCodes';

interface TemperatureChartProps {
  weather: WeatherResponse;
  tempUnit: TemperatureUnit;
}

export const TemperatureChart: React.FC<TemperatureChartProps> = ({ weather, tempUnit }) => {
  const [activeTab, setActiveTab] = useState<'7day' | '24hour'>('7day');

  const unitSymbol = tempUnit === 'fahrenheit' ? '°F' : '°C';

  // Format 7-day data
  const dailyData = weather.daily.time.map((timeStr, index) => {
    const date = new Date(timeStr);
    const dayLabel = date.toLocaleDateString([], { weekday: 'short', month: 'numeric', day: 'numeric' });
    const maxTemp = convertTemperature(weather.daily.temperature_2m_max[index] ?? 0, tempUnit);
    const minTemp = convertTemperature(weather.daily.temperature_2m_min[index] ?? 0, tempUnit);
    const weatherCode = weather.daily.weather_code[index] ?? 0;
    const details = getWeatherDetails(weatherCode);

    return {
      name: dayLabel,
      Max: maxTemp,
      Min: minTemp,
      condition: details.shortDescription,
    };
  });

  // Format 24-hour data
  const now = new Date();
  const currentHourIndex = weather.hourly.time.findIndex((t) => new Date(t) >= now);
  const startIndex = currentHourIndex >= 0 ? currentHourIndex : 0;
  const next24Hours = weather.hourly.time.slice(startIndex, startIndex + 24);

  const hourlyData = next24Hours.map((timeStr, idx) => {
    const actualIndex = startIndex + idx;
    const date = new Date(timeStr);
    const label = idx === 0 ? 'Now' : date.toLocaleTimeString([], { hour: 'numeric' });
    const temp = convertTemperature(weather.hourly.temperature_2m[actualIndex] ?? 0, tempUnit);
    const precip = weather.hourly.precipitation_probability[actualIndex] ?? 0;

    return {
      name: label,
      Temperature: temp,
      RainProbability: precip,
    };
  });

  return (
    <div
      id="chart-temperature-trend"
      className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 sm:p-6 backdrop-blur-xl space-y-4 shadow-xl"
    >
      {/* Chart Header & Tab Switches */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Temperature Analytics</h3>
            <p className="text-xs text-slate-400">
              Interactive thermal distribution & forecast curves
            </p>
          </div>
        </div>

        <div className="inline-flex p-1 rounded-2xl bg-slate-800/90 border border-slate-700/60 text-xs font-semibold self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveTab('7day')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeTab === '7day'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" /> 7-Day Trend
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('24hour')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              activeTab === '24hour'
                ? 'bg-sky-500 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" /> 24-Hour Curve
          </button>
        </div>
      </div>

      {/* Chart Container */}
      <div className="h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === '7day' ? (
            <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
                </linearGradient>
                <linearGradient id="colorMin" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                unit={unitSymbol}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  color: '#f8fafc',
                  fontSize: '12px',
                  fontWeight: '600',
                }}
                formatter={(value: any, name: any) => [`${value}${unitSymbol}`, name === 'Max' ? 'High Temp' : 'Low Temp']}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
              <Area
                type="monotone"
                dataKey="Max"
                stroke="#f43f5e"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorMax)"
              />
              <Area
                type="monotone"
                dataKey="Min"
                stroke="#38bdf8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorMin)"
              />
            </AreaChart>
          ) : (
            <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHourlyTemp" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.5} />
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis
                stroke="#94a3b8"
                fontSize={11}
                tickLine={false}
                unit={unitSymbol}
                domain={['auto', 'auto']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  borderRadius: '16px',
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
                  color: '#f8fafc',
                  fontSize: '12px',
                }}
                formatter={(value: any, name: any) => [
                  name === 'Temperature' ? `${value}${unitSymbol}` : `${value}%`,
                  name,
                ]}
              />
              <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px', color: '#cbd5e1' }} />
              <Area
                type="monotone"
                dataKey="Temperature"
                stroke="#38bdf8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorHourlyTemp)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};
