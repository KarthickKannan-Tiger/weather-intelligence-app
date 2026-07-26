import React from 'react';
import { AlertTriangle, Flame, Snowflake, Wind, Umbrella, SunMedium } from 'lucide-react';
import { WeatherResponse } from '../types/weather';

interface WeatherAlertsBannerProps {
  weather: WeatherResponse;
}

export const WeatherAlertsBanner: React.FC<WeatherAlertsBannerProps> = ({ weather }) => {
  const current = weather.current;
  const temp = current.temperature;
  const wind = current.wind_speed_10m;
  const uv = current.uv_index;
  const code = current.weather_code;

  const alerts: { id: string; title: string; message: string; icon: React.ReactNode; style: string }[] = [];

  // Extreme Heat Warning
  if (temp >= 35) {
    alerts.push({
      id: 'heat',
      title: 'Extreme Heat Warning',
      message: `Temperature is currently ${Math.round(temp)}°C. Avoid prolonged afternoon sun exposure and maintain hydration.`,
      icon: <Flame className="w-5 h-5 text-rose-400 shrink-0" />,
      style: 'bg-rose-500/10 border-rose-500/30 text-rose-200',
    });
  }

  // Freezing Temperature Warning
  if (temp <= 0) {
    alerts.push({
      id: 'freezing',
      title: 'Freezing Weather Hazard',
      message: `Sub-zero temperature (${Math.round(temp)}°C). Watch for icy road patches and frostbite risks.`,
      icon: <Snowflake className="w-5 h-5 text-cyan-400 shrink-0" />,
      style: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-200',
    });
  }

  // High Winds
  if (wind >= 40) {
    alerts.push({
      id: 'wind',
      title: 'High Wind Advisory',
      message: `Strong wind gusts up to ${Math.round(wind)} km/h detected. Secure loose outdoor objects.`,
      icon: <Wind className="w-5 h-5 text-amber-400 shrink-0" />,
      style: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
    });
  }

  // Severe Storm / Rain
  if (code >= 95 || code === 65 || code === 82) {
    alerts.push({
      id: 'storm',
      title: 'Thunderstorm & Heavy Rainfall Alert',
      message: 'Active thunderstorm or heavy rain in progress. Seek shelter and avoid outdoor electrical equipment.',
      icon: <Umbrella className="w-5 h-5 text-indigo-400 shrink-0" />,
      style: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-200',
    });
  }

  // Very High / Extreme UV Warning
  if (uv >= 8) {
    alerts.push({
      id: 'uv',
      title: 'High UV Radiation Advisory',
      message: `UV Index is elevated at ${uv.toFixed(1)}. Apply SPF 30+ sunscreen, wear polarized sunglasses and a hat.`,
      icon: <SunMedium className="w-5 h-5 text-amber-400 shrink-0" />,
      style: 'bg-amber-500/10 border-amber-500/30 text-amber-200',
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-2.5">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-2xl border flex items-start gap-3 backdrop-blur-md shadow-md ${alert.style}`}
        >
          {alert.icon}
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold tracking-tight">{alert.title}</h4>
            <p className="text-xs opacity-90 leading-relaxed">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
