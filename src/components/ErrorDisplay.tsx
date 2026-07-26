import React from 'react';
import { AlertCircle, RefreshCw, SearchX, WifiOff } from 'lucide-react';

interface ErrorDisplayProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  type?: 'search' | 'network' | 'location';
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  title = 'Weather Service Notice',
  message,
  onRetry,
  type = 'network',
}) => {
  return (
    <div className="p-8 rounded-3xl bg-slate-900/90 border border-slate-800 text-center space-y-4 max-w-lg mx-auto my-8 shadow-2xl backdrop-blur-xl">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center mx-auto border border-rose-500/20">
        {type === 'search' ? (
          <SearchX className="w-8 h-8" />
        ) : type === 'network' ? (
          <WifiOff className="w-8 h-8" />
        ) : (
          <AlertCircle className="w-8 h-8" />
        )}
      </div>

      <div className="space-y-1.5">
        <h3 className="text-xl font-bold text-slate-100">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <button
          id="btn-error-retry"
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm shadow-lg shadow-sky-500/20 active:scale-95 transition-all"
        >
          <RefreshCw className="w-4 h-4" /> Try Again
        </button>
      )}
    </div>
  );
};

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-64 rounded-3xl bg-slate-800/60 border border-slate-700/50" />
      <div className="h-40 rounded-3xl bg-slate-800/60 border border-slate-700/50" />
      <div className="h-72 rounded-3xl bg-slate-800/60 border border-slate-700/50" />
      <div className="h-48 rounded-3xl bg-slate-800/60 border border-slate-700/50" />
    </div>
  );
};
