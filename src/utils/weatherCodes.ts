export interface WeatherCodeDetails {
  code: number;
  description: string;
  shortDescription: string;
  iconName: string; // Lucide icon identifier
  bgGradient: string;
  textColor: string;
  badgeBg: string;
}

export const WMO_WEATHER_CODES: Record<number, WeatherCodeDetails> = {
  0: {
    code: 0,
    description: 'Clear sky',
    shortDescription: 'Sunny / Clear',
    iconName: 'Sun',
    bgGradient: 'from-amber-500/10 via-sky-500/5 to-blue-500/10',
    textColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  },
  1: {
    code: 1,
    description: 'Mainly clear',
    shortDescription: 'Mainly Clear',
    iconName: 'SunMedium',
    bgGradient: 'from-amber-400/10 via-sky-500/5 to-slate-500/10',
    textColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/20',
  },
  2: {
    code: 2,
    description: 'Partly cloudy',
    shortDescription: 'Partly Cloudy',
    iconName: 'CloudSun',
    bgGradient: 'from-sky-400/10 via-indigo-500/5 to-slate-500/10',
    textColor: 'text-sky-600 dark:text-sky-400',
    badgeBg: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
  },
  3: {
    code: 3,
    description: 'Overcast',
    shortDescription: 'Cloudy',
    iconName: 'Cloud',
    bgGradient: 'from-slate-400/10 via-slate-500/10 to-zinc-600/10',
    textColor: 'text-slate-600 dark:text-slate-400',
    badgeBg: 'bg-slate-500/10 text-slate-700 dark:text-slate-300 border-slate-500/20',
  },
  45: {
    code: 45,
    description: 'Foggy conditions',
    shortDescription: 'Fog',
    iconName: 'CloudFog',
    bgGradient: 'from-slate-300/10 via-zinc-400/10 to-slate-500/10',
    textColor: 'text-slate-500 dark:text-slate-400',
    badgeBg: 'bg-slate-400/10 text-slate-600 dark:text-slate-300 border-slate-400/20',
  },
  48: {
    code: 48,
    description: 'Depositing rime fog',
    shortDescription: 'Freezing Fog',
    iconName: 'CloudFog',
    bgGradient: 'from-cyan-300/10 via-slate-400/10 to-blue-500/10',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
  },
  51: {
    code: 51,
    description: 'Light drizzle',
    shortDescription: 'Light Drizzle',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-sky-300/10 via-blue-400/10 to-slate-500/10',
    textColor: 'text-sky-500 dark:text-sky-400',
    badgeBg: 'bg-sky-400/10 text-sky-600 dark:text-sky-300 border-sky-400/20',
  },
  53: {
    code: 53,
    description: 'Moderate drizzle',
    shortDescription: 'Drizzle',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-sky-400/10 via-blue-500/10 to-slate-600/10',
    textColor: 'text-sky-600 dark:text-sky-400',
    badgeBg: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
  },
  55: {
    code: 55,
    description: 'Dense drizzle',
    shortDescription: 'Heavy Drizzle',
    iconName: 'CloudDrizzle',
    bgGradient: 'from-blue-500/10 via-indigo-500/10 to-slate-600/10',
    textColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
  },
  56: {
    code: 56,
    description: 'Light freezing drizzle',
    shortDescription: 'Freezing Drizzle',
    iconName: 'CloudSnow',
    bgGradient: 'from-cyan-400/10 via-sky-500/10 to-slate-600/10',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
  },
  57: {
    code: 57,
    description: 'Dense freezing drizzle',
    shortDescription: 'Heavy Freezing Drizzle',
    iconName: 'CloudSnow',
    bgGradient: 'from-cyan-500/10 via-blue-600/10 to-slate-700/10',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    badgeBg: 'bg-cyan-600/10 text-cyan-800 dark:text-cyan-200 border-cyan-600/20',
  },
  61: {
    code: 61,
    description: 'Slight rain',
    shortDescription: 'Light Rain',
    iconName: 'CloudRain',
    bgGradient: 'from-blue-400/10 via-sky-500/10 to-slate-600/10',
    textColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20',
  },
  63: {
    code: 63,
    description: 'Moderate rain',
    shortDescription: 'Rain',
    iconName: 'CloudRain',
    bgGradient: 'from-blue-500/15 via-sky-600/10 to-slate-700/10',
    textColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/20',
  },
  65: {
    code: 65,
    description: 'Heavy rain',
    shortDescription: 'Heavy Rain',
    iconName: 'CloudRainWind',
    bgGradient: 'from-indigo-600/20 via-blue-700/15 to-slate-800/15',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    badgeBg: 'bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border-indigo-500/20',
  },
  66: {
    code: 66,
    description: 'Light freezing rain',
    shortDescription: 'Freezing Rain',
    iconName: 'CloudSnow',
    bgGradient: 'from-cyan-500/15 via-blue-600/15 to-slate-700/15',
    textColor: 'text-cyan-600 dark:text-cyan-400',
    badgeBg: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border-cyan-500/20',
  },
  67: {
    code: 67,
    description: 'Heavy freezing rain',
    shortDescription: 'Heavy Freezing Rain',
    iconName: 'CloudSnow',
    bgGradient: 'from-cyan-600/20 via-indigo-700/15 to-slate-800/15',
    textColor: 'text-cyan-700 dark:text-cyan-300',
    badgeBg: 'bg-cyan-600/20 text-cyan-800 dark:text-cyan-200 border-cyan-600/20',
  },
  71: {
    code: 71,
    description: 'Slight snow fall',
    shortDescription: 'Light Snow',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-200/20 via-indigo-300/10 to-slate-400/10',
    textColor: 'text-sky-500 dark:text-sky-300',
    badgeBg: 'bg-sky-400/15 text-sky-700 dark:text-sky-200 border-sky-400/20',
  },
  73: {
    code: 73,
    description: 'Moderate snow fall',
    shortDescription: 'Snow',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-300/20 via-indigo-400/15 to-slate-500/15',
    textColor: 'text-sky-600 dark:text-sky-300',
    badgeBg: 'bg-sky-500/20 text-sky-800 dark:text-sky-200 border-sky-500/20',
  },
  75: {
    code: 75,
    description: 'Heavy snow fall',
    shortDescription: 'Heavy Snow',
    iconName: 'Snowflake',
    bgGradient: 'from-indigo-400/25 via-sky-500/20 to-slate-600/20',
    textColor: 'text-indigo-500 dark:text-indigo-300',
    badgeBg: 'bg-indigo-500/25 text-indigo-800 dark:text-indigo-200 border-indigo-500/25',
  },
  77: {
    code: 77,
    description: 'Snow grains',
    shortDescription: 'Snow Grains',
    iconName: 'Snowflake',
    bgGradient: 'from-slate-300/20 via-sky-400/15 to-indigo-500/15',
    textColor: 'text-slate-600 dark:text-slate-300',
    badgeBg: 'bg-slate-400/20 text-slate-800 dark:text-slate-200 border-slate-400/20',
  },
  80: {
    code: 80,
    description: 'Slight rain showers',
    shortDescription: 'Showers',
    iconName: 'CloudRain',
    bgGradient: 'from-sky-400/15 via-blue-500/10 to-indigo-500/10',
    textColor: 'text-sky-600 dark:text-sky-400',
    badgeBg: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/20',
  },
  81: {
    code: 81,
    description: 'Moderate rain showers',
    shortDescription: 'Rain Showers',
    iconName: 'CloudRainWind',
    bgGradient: 'from-blue-500/15 via-indigo-500/15 to-slate-600/10',
    textColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/20',
  },
  82: {
    code: 82,
    description: 'Violent rain showers',
    shortDescription: 'Heavy Showers',
    iconName: 'CloudLightning',
    bgGradient: 'from-indigo-600/20 via-purple-600/15 to-slate-800/20',
    textColor: 'text-indigo-600 dark:text-indigo-400',
    badgeBg: 'bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 border-indigo-600/20',
  },
  85: {
    code: 85,
    description: 'Slight snow showers',
    shortDescription: 'Snow Showers',
    iconName: 'Snowflake',
    bgGradient: 'from-sky-300/15 via-indigo-400/15 to-slate-500/10',
    textColor: 'text-sky-500 dark:text-sky-300',
    badgeBg: 'bg-sky-400/15 text-sky-700 dark:text-sky-200 border-sky-400/20',
  },
  86: {
    code: 86,
    description: 'Heavy snow showers',
    shortDescription: 'Heavy Snow Showers',
    iconName: 'Snowflake',
    bgGradient: 'from-indigo-500/20 via-sky-600/20 to-slate-700/20',
    textColor: 'text-indigo-600 dark:text-indigo-300',
    badgeBg: 'bg-indigo-500/20 text-indigo-800 dark:text-indigo-200 border-indigo-500/20',
  },
  95: {
    code: 95,
    description: 'Thunderstorm',
    shortDescription: 'Thunderstorm',
    iconName: 'CloudLightning',
    bgGradient: 'from-amber-600/15 via-purple-700/15 to-slate-800/20',
    textColor: 'text-amber-500 dark:text-amber-300',
    badgeBg: 'bg-amber-500/20 text-amber-800 dark:text-amber-200 border-amber-500/30',
  },
  96: {
    code: 96,
    description: 'Thunderstorm with slight hail',
    shortDescription: 'Storm with Hail',
    iconName: 'CloudLightning',
    bgGradient: 'from-amber-700/20 via-indigo-800/20 to-slate-900/20',
    textColor: 'text-amber-600 dark:text-amber-300',
    badgeBg: 'bg-amber-600/20 text-amber-800 dark:text-amber-200 border-amber-600/30',
  },
  99: {
    code: 99,
    description: 'Thunderstorm with heavy hail',
    shortDescription: 'Severe Storm & Hail',
    iconName: 'CloudLightning',
    bgGradient: 'from-purple-700/25 via-slate-900/25 to-rose-900/20',
    textColor: 'text-purple-500 dark:text-purple-300',
    badgeBg: 'bg-purple-600/25 text-purple-800 dark:text-purple-200 border-purple-600/30',
  },
};

export function getWeatherDetails(code: number, isDay: boolean = true): WeatherCodeDetails {
  const details = WMO_WEATHER_CODES[code];
  if (!details) {
    return {
      code,
      description: 'Unknown weather condition',
      shortDescription: 'Unknown',
      iconName: isDay ? 'Sun' : 'Moon',
      bgGradient: 'from-sky-500/10 via-slate-500/10 to-indigo-500/10',
      textColor: 'text-sky-600 dark:text-sky-400',
      badgeBg: 'bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20',
    };
  }

  // Adjust icon for night if clear / partly cloudy
  if (!isDay) {
    if (code === 0 || code === 1) {
      return {
        ...details,
        iconName: 'Moon',
        shortDescription: details.shortDescription.replace('Sunny', 'Clear Night'),
      };
    }
    if (code === 2) {
      return {
        ...details,
        iconName: 'CloudMoon',
      };
    }
  }

  return details;
}

export function convertTemperature(celsius: number, unit: 'celsius' | 'fahrenheit'): number {
  if (unit === 'fahrenheit') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

export function convertWindSpeed(kmh: number, unit: 'kmh' | 'mph' | 'ms'): { value: number; label: string } {
  if (unit === 'mph') {
    return { value: Math.round(kmh * 0.621371), label: 'mph' };
  }
  if (unit === 'ms') {
    return { value: Math.round((kmh / 3.6) * 10) / 10, label: 'm/s' };
  }
  return { value: Math.round(kmh), label: 'km/h' };
}

export function getWindDirectionText(deg: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round(((deg %= 360) < 0 ? deg + 360 : deg) / 45) % 8;
  return directions[index];
}

export function getUvCategory(uvIndex: number): { label: string; color: string; badge: string } {
  if (uvIndex <= 2) {
    return { label: 'Low', color: 'text-emerald-500', badge: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' };
  }
  if (uvIndex <= 5) {
    return { label: 'Moderate', color: 'text-amber-500', badge: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' };
  }
  if (uvIndex <= 7) {
    return { label: 'High', color: 'text-orange-500', badge: 'bg-orange-500/10 text-orange-600 dark:text-orange-400' };
  }
  if (uvIndex <= 10) {
    return { label: 'Very High', color: 'text-rose-500', badge: 'bg-rose-500/10 text-rose-600 dark:text-rose-400' };
  }
  return { label: 'Extreme', color: 'text-purple-600', badge: 'bg-purple-500/10 text-purple-600 dark:text-purple-400' };
}
