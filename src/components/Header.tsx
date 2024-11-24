import { Radio } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

export default function Header({ lastUpdate }: { lastUpdate: Date }) {
  return (
    <header className="bg-slate-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Radio className="h-8 w-8 text-green-400" />
          <h1 className="text-2xl font-bold tracking-tight">Intercept Dashboard</h1>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="text-sm">Last update:</span>
          <span className="font-mono bg-slate-800 px-2 py-1 rounded">
            {formatDistanceToNow(lastUpdate, { addSuffix: true })}
          </span>
        </div>
      </div>
    </header>
  );
}