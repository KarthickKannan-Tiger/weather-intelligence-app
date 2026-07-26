import React, { useState } from 'react';
import {
  Compass,
  Footprints,
  Bike,
  UtensilsCrossed,
  Sparkles,
  Shirt,
  Car,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Info,
} from 'lucide-react';
import { ActivityRecommendation, WeatherResponse } from '../types/weather';
import { generateActivityRecommendations } from '../utils/activityPlanner';

interface ActivityPlannerProps {
  weather: WeatherResponse;
}

export const ActivityPlanner: React.FC<ActivityPlannerProps> = ({ weather }) => {
  const [filter, setFilter] = useState<'all' | 'sports' | 'leisure' | 'travel' | 'home'>('all');

  const recommendations = generateActivityRecommendations(weather);

  const filtered = filter === 'all' ? recommendations : recommendations.filter((a) => a.category === filter);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Footprints':
        return <Footprints className="w-5 h-5" />;
      case 'Bike':
        return <Bike className="w-5 h-5" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Shirt':
        return <Shirt className="w-5 h-5" />;
      case 'Car':
        return <Car className="w-5 h-5" />;
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: ActivityRecommendation['status']) => {
    switch (status) {
      case 'Ideal':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Ideal Conditions
          </span>
        );
      case 'Good':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" /> Favorable
          </span>
        );
      case 'Caution':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <AlertTriangle className="w-3.5 h-3.5" /> Exercise Caution
          </span>
        );
      case 'Unfavorable':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <XCircle className="w-3.5 h-3.5" /> Unfavorable
          </span>
        );
    }
  };

  return (
    <div id="section-activity-planner" className="bg-slate-900/80 border border-slate-800/80 rounded-3xl p-5 sm:p-6 backdrop-blur-xl space-y-4 shadow-xl">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-100">Weather Intelligence Activity Planner</h3>
            <p className="text-xs text-slate-400">
              Real-time outdoor & lifestyle recommendations
            </p>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none text-xs font-semibold">
          {[
            { id: 'all', label: 'All Activities' },
            { id: 'sports', label: 'Sports' },
            { id: 'leisure', label: 'Leisure' },
            { id: 'travel', label: 'Travel' },
            { id: 'home', label: 'Home' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap border ${
                filter === tab.id
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                  : 'bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border-slate-700/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
        {filtered.map((act) => (
          <div
            key={act.id}
            className="p-4 rounded-2xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300">
                    {renderIcon(act.iconName)}
                  </div>
                  <h4 className="text-sm font-bold text-slate-100">{act.title}</h4>
                </div>
              </div>

              <div className="pt-1">{getStatusBadge(act.status)}</div>

              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                {act.reason}
              </p>
            </div>

            {/* Score Bar & Tip */}
            <div className="space-y-2 pt-2 border-t border-slate-700/50">
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold">
                <span>Feasibility Index</span>
                <span className="text-indigo-400 font-bold">{act.score}%</span>
              </div>
              <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    act.score >= 80
                      ? 'bg-emerald-500'
                      : act.score >= 50
                      ? 'bg-sky-500'
                      : act.score >= 30
                      ? 'bg-amber-500'
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${act.score}%` }}
                />
              </div>

              <div className="flex items-start gap-1.5 text-[11px] text-slate-400 bg-slate-900/60 p-2 rounded-xl border border-slate-800">
                <Info className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>{act.tip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
