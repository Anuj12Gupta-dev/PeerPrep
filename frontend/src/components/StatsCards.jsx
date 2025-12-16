import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    // Responsive grid: 1 column on all screens, but uses the lg:col-span-1 context from the parent
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
      
      {/* Active Sessions Card (Primary Accent: Blue) */}
      <div className="p-6 rounded-xl border border-white/5 bg-slate-900 shadow-xl transition-all hover:border-blue-500/50">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-blue-600/20 rounded-lg">
            <UsersIcon className="size-6 text-blue-400" />
          </div>
          <div className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500/20 text-blue-400">
            Live
          </div>
        </div>
        <div className="text-5xl font-bold mb-1 text-white">{activeSessionsCount}</div>
        <div className="text-sm text-slate-400 font-medium">Active Sessions</div>
      </div>

      {/* Recent Sessions Card (Secondary Accent: Violet) */}
      <div className="p-6 rounded-xl border border-white/5 bg-slate-900 shadow-xl transition-all hover:border-violet-500/50">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-violet-600/20 rounded-lg">
            <TrophyIcon className="size-6 text-violet-400" />
          </div>
        </div>
        <div className="text-5xl font-bold mb-1 text-white">{recentSessionsCount}</div>
        <div className="text-sm text-slate-400 font-medium">Total Sessions Completed</div>
      </div>
    </div>
  );
}

export default StatsCards;