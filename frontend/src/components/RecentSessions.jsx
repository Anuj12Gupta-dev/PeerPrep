import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    // Main Card container: Dark, bordered, full width
    <div className="p-6 rounded-2xl border border-white/5 bg-slate-900 shadow-xl mt-8">
      
      {/* HEADER SECTION */}
      <div className="flex items-center gap-3 pb-4 border-b border-white/5 mb-6">
        <div className="p-2 bg-violet-600/20 rounded-xl">
          <Clock className="size-5 text-violet-400" />
        </div>
        <h2 className="text-xl font-semibold text-white">Your Past Sessions</h2>
      </div>

      {/* SESSIONS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading ? (
          <div className="col-span-full flex items-center justify-center py-20">
            <Loader className="size-10 animate-spin text-blue-500" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className={`relative p-5 rounded-xl border transition-all 
                ${session.status === "active"
                  ? "border-green-500/30 bg-green-900/10 hover:border-green-500/50"
                  : "border-white/5 bg-slate-800 hover:border-violet-500/30"
                }`}
            >
              
              {/* ACTIVE BADGE */}
              {session.status === "active" && (
                <div className="absolute top-4 right-4">
                  <div className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-600/20 text-green-400 flex items-center gap-1">
                    <div className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                    ACTIVE
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                
                {/* Icon Container */}
                <div
                  className={`size-12 rounded-lg flex items-center justify-center flex-shrink-0 
                    ${session.status === "active"
                      ? "bg-green-600/20"
                      : "bg-violet-600/20"
                    }`}
                >
                  <Code2 className={`size-6 ${session.status === "active" ? "text-green-400" : "text-violet-400"}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1 truncate text-white">{session.problem}</h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyBadgeClass(session.difficulty)} flex-shrink-0`}
                  >
                    {session.difficulty.slice(0, 1).toUpperCase() + session.difficulty.slice(1)}
                  </span>
                </div>
              </div>

              {/* STATS */}
              <div className="space-y-2 text-sm text-slate-400 mb-4">
                
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-slate-500" />
                  <span>
                    {formatDistanceToNow(new Date(session.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-slate-500" />
                  <span>
                    {session.participant ? "2" : "1"} participant{session.participant ? "s" : ""}
                  </span>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between pt-3 border-t border-white/5">
                <span className="text-xs font-semibold uppercase text-slate-300">
                  {session.status === "completed" ? "Completed" : "Last Active"}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(session.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <div className="size-20 mx-auto mb-4 bg-violet-600/20 rounded-3xl flex items-center justify-center">
              <Trophy className="size-10 text-violet-400" />
            </div>
            <p className="text-lg font-semibold text-white mb-1">No sessions yet</p>
            <p className="text-sm text-slate-500">Start your coding journey today!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RecentSessions;