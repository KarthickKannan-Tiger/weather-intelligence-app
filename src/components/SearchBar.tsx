import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Loader2, Star, Globe } from 'lucide-react';
import { GeoLocation } from '../types/weather';
import { searchCities, POPULAR_CITIES } from '../services/weatherApi';

interface SearchBarProps {
  onSelectCity: (city: GeoLocation) => void;
  selectedCity?: GeoLocation | null;
  favorites: GeoLocation[];
  onToggleFavorite: (city: GeoLocation) => void;
  onUseCurrentLocation: () => void;
  isLocating: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectCity,
  selectedCity,
  favorites,
  onToggleFavorite,
  onUseCurrentLocation,
  isLocating,
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounced search effect
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setSuggestions([]);
      setIsLoading(false);
      setErrorMessage(null);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const timer = setTimeout(async () => {
      try {
        const results = await searchCities(query);
        setSuggestions(results);
        if (results.length === 0) {
          setErrorMessage(`No cities found for "${query}"`);
        } else {
          setErrorMessage(null);
        }
      } catch (err: any) {
        setErrorMessage('Failed to search cities. Please check network.');
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (city: GeoLocation) => {
    onSelectCity(city);
    setQuery('');
    setSuggestions([]);
    setIsOpen(false);
  };

  const isFav = selectedCity ? favorites.some((f) => f.id === selectedCity.id || (f.latitude === selectedCity.latitude && f.longitude === selectedCity.longitude)) : false;

  return (
    <div className="w-full space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Main Search Input Box */}
        <div ref={searchRef} className="relative flex-1">
          <div className="relative flex items-center">
            <Search className="absolute left-3.5 w-5 h-5 text-slate-400 pointer-events-none" />
            <input
              id="input-city-search"
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search city (e.g. London, New York, Tokyo, Berlin)..."
              className="w-full pl-11 pr-10 py-3 bg-slate-800/90 hover:bg-slate-800 border border-slate-700/80 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 text-slate-100 placeholder-slate-400 rounded-2xl text-sm font-medium outline-none transition-all shadow-inner"
            />
            {query ? (
              <button
                id="btn-clear-search"
                type="button"
                onClick={() => {
                  setQuery('');
                  setSuggestions([]);
                  setErrorMessage(null);
                }}
                className="absolute right-3.5 p-1 rounded-full text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
              >
                <X className="w-4 h-4" />
              </button>
            ) : isLoading ? (
              <Loader2 className="absolute right-3.5 w-4 h-4 text-sky-400 animate-spin" />
            ) : null}
          </div>

          {/* Autocomplete Suggestions Dropdown */}
          {isOpen && (query.trim().length >= 2 || suggestions.length > 0 || errorMessage) && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto divide-y divide-slate-800/60 backdrop-blur-xl">
              {isLoading && (
                <div className="p-4 flex items-center justify-center text-sm text-slate-400 gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-sky-400" />
                  Searching Open-Meteo geocoding database...
                </div>
              )}

              {!isLoading && errorMessage && (
                <div className="p-4 text-center text-sm text-slate-400">
                  {errorMessage}
                </div>
              )}

              {!isLoading &&
                suggestions.map((city) => (
                  <button
                    key={`${city.id}-${city.latitude}-${city.longitude}`}
                    type="button"
                    onClick={() => handleSelect(city)}
                    className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-sky-500/10 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-slate-800 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-100 group-hover:text-sky-300">
                          {city.name}
                        </div>
                        <div className="text-xs text-slate-400">
                          {[city.admin1, city.country].filter(Boolean).join(', ')}
                        </div>
                      </div>
                    </div>
                    {city.elevation && (
                      <span className="text-xs font-mono text-slate-500">
                        {Math.round(city.elevation)}m alt
                      </span>
                    )}
                  </button>
                ))}
            </div>
          )}
        </div>

        {/* Current Location Button */}
        <button
          id="btn-use-location"
          type="button"
          onClick={onUseCurrentLocation}
          disabled={isLocating}
          className="px-4 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-95 transition-all disabled:opacity-60 whitespace-nowrap"
        >
          {isLocating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Detecting Location...
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              Use My Location
            </>
          )}
        </button>

        {/* Bookmark / Favorite City Button */}
        {selectedCity && (
          <button
            id="btn-favorite-city"
            type="button"
            onClick={() => onToggleFavorite(selectedCity)}
            className={`px-4 py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 border transition-all ${
              isFav
                ? 'bg-amber-500/15 border-amber-500/40 text-amber-400 hover:bg-amber-500/20'
                : 'bg-slate-800/90 border-slate-700/80 text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            title={isFav ? 'Remove from favorite cities' : 'Save as favorite city'}
          >
            <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span className="hidden sm:inline">{isFav ? 'Saved' : 'Save City'}</span>
          </button>
        )}
      </div>

      {/* Quick Select Chips: Popular & Favorite Cities */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="flex items-center gap-1 text-slate-400 font-medium whitespace-nowrap shrink-0">
          <Globe className="w-3.5 h-3.5" /> Quick Cities:
        </span>
        {POPULAR_CITIES.map((city) => {
          const isSelected = selectedCity?.name === city.name;
          return (
            <button
              key={city.id}
              type="button"
              onClick={() => handleSelect(city)}
              className={`px-3 py-1.5 rounded-full font-medium transition-all whitespace-nowrap border shrink-0 ${
                isSelected
                  ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                  : 'bg-slate-800/60 hover:bg-slate-700/80 border-slate-700/60 text-slate-300 hover:text-white'
              }`}
            >
              {city.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};
