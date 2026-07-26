import React from 'react';
import { CloudSun, RefreshCw } from 'lucide-react';
import { TemperatureUnit, WindUnit } from '../types/weather';

interface HeaderProps {
  tempUnit: TemperatureUnit;
  onTempUnitChange: (unit: TemperatureUnit) => void;
  windUnit: WindUnit;
  onWindUnitChange: (unit: WindUnit) => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated?: string;
}

export const Header: React.FC<HeaderProps> = ({
  tempUnit,
  onTempUnitChange,
  windUnit,
  onWindUnitChange,
  onRefresh,
  isRefreshing,
  lastUpdated,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-6 py-3.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo & Brand Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
            <CloudSun className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-100 tracking-tight">Weather Intelligence</h1>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                Open-Meteo
              </span>
            </div>
            {lastUpdated && (
              <p className="text-xs text-slate-400 font-mono">
                Updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>

        {/* Controls: Units Switcher & Refresh */}
        <div className="flex items-center gap-2.5 flex-wrap justify-end w-full sm:w-auto">
          {/* Temperature Unit Segmented Control */}
          <div className="inline-flex p-1 rounded-xl bg-slate-800/90 border border-slate-700/60 text-xs font-semibold">
            <button
              id="btn-unit-celsius"
              type="button"
              onClick={() => onTempUnitChange('celsius')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tempUnit === 'celsius'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °C
            </button>
            <button
              id="btn-unit-fahrenheit"
              type="button"
              onClick={() => onTempUnitChange('fahrenheit')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                tempUnit === 'fahrenheit'
                  ? 'bg-sky-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              °F
            </button>
          </div>

          {/* Wind Speed Unit Select */}
          <div className="inline-flex p-1 rounded-xl bg-slate-800/90 border border-slate-700/60 text-xs font-semibold">
            <button
              id="btn-wind-kmh"
              type="button"
              onClick={() => onWindUnitChange('kmh')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                windUnit === 'kmh'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              km/h
            </button>
            <button
              id="btn-wind-mph"
              type="button"
              onClick={() => onWindUnitChange('mph')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                windUnit === 'mph'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              mph
            </button>
            <button
              id="btn-wind-ms"
              type="button"
              onClick={() => onWindUnitChange('ms')}
              className={`px-2.5 py-1.5 rounded-lg transition-all ${
                windUnit === 'ms'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              m/s
            </button>
          </div>

          {/* Refresh Button */}
          <button
            id="btn-refresh-weather"
            type="button"
            onClick={onRefresh}
            disabled={isRefreshing}
            title="Refresh current weather data"
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700/80 text-slate-300 hover:text-white border border-slate-700/60 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-sky-400' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
};
