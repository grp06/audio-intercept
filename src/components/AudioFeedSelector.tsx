import { Radio, Wifi } from 'lucide-react';
import { AudioFeed } from '../types';

interface AudioFeedSelectorProps {
  feeds: AudioFeed[];
  onFeedSelect: (feedId: string) => void;
  selectedFeedId: string | null;
}

export default function AudioFeedSelector({ feeds, onFeedSelect, selectedFeedId }: AudioFeedSelectorProps) {
  return (
    <div>
      <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3">
        Active Feeds
      </h2>
      <div className="space-y-2">
        {feeds.map((feed) => (
          <button
            key={feed.id}
            onClick={() => onFeedSelect(feed.id)}
            className={`w-full text-left p-2 rounded transition-colors ${
              selectedFeedId === feed.id
                ? 'bg-slate-700 ring-2 ring-emerald-500'
                : 'bg-slate-700/50 hover:bg-slate-700/75'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center space-x-2">
                <Radio className="h-4 w-4 text-emerald-400" />
                <span className="text-sm font-medium">{feed.name}</span>
              </div>
              <Wifi className="h-3 w-3 text-emerald-400" />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">{feed.frequency}</span>
              <span className="text-emerald-400">{feed.strength}% signal</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}