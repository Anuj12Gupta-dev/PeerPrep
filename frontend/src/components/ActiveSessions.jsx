import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
  LockIcon,
  GlobeIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    // Main Card container: Dark, bordered, full height
    <div className="lg:col-span-2 p-6 rounded-2xl border border-white/5 bg-slate-900 shadow-xl h-full flex flex-col">
      
      {/* HEADERS SECTION */}
      <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-4">
        
        {/* TITLE AND ICON */}
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600/20 rounded-xl">
            <ZapIcon className="size-5 text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold text-white">Live Sessions</h2>
        </div>

        {/* Active Count */}
        <div className="flex items-center gap-2">
          <div className="size-2 bg-green-500 rounded-full" />
          <span className="text-sm font-medium text-green-400">{sessions.length} active</span>
        </div>
      </div>

      {/* SESSIONS LIST */}
      <div className="space-y-3 overflow-y-auto flex-grow pr-2">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <LoaderIcon className="size-10 animate-spin text-blue-500" />
          </div>
        ) : sessions.length > 0 ? (
          sessions.map((session) => (
            <div
              key={session._id}
              className="p-4 rounded-xl border border-white/5 bg-slate-800 transition-all hover:border-blue-500/30"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                {/* LEFT SIDE: Problem Info */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative size-12 rounded-lg bg-violet-600/20 flex items-center justify-center flex-shrink-0">
                    <Code2Icon className="size-6 text-violet-400" />
                    <div className="absolute -top-1 -right-1 size-3 bg-green-500 rounded-full border-2 border-slate-800" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg truncate text-white">{session.problem}</h3>
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyBadgeClass(
                          session.difficulty
                        )} flex-shrink-0`}
                      >
                        {session.difficulty.slice(0, 1).toUpperCase() +
                          session.difficulty.slice(1)}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
                      
                      {/* Host */}
                      <div className="flex items-center gap-1.5">
                        <CrownIcon className="size-4 text-amber-500" />
                        <span className="font-medium">{session.host?.name || 'Host'}</span>
                      </div>
                      
                      {/* Participants */}
                      <div className="flex items-center gap-1.5">
                        <UsersIcon className="size-4 text-blue-400" />
                        <span className="text-xs">{session.participant ? "2/2" : "1/2"}</span>
                      </div>
                      
                      {/* Status Badges */}
                      <div className="flex items-center gap-2">
                        {session.participant && !isUserInSession(session) ? (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-red-600/20 text-red-400">FULL</span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-green-600/20 text-green-400">OPEN</span>
                        )}
                        
                        {/* Public/Private Badge */}
                        {session.password ? (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-600/20 text-amber-400 flex items-center gap-1">
                            <LockIcon className="size-3" />
                            Protected
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-600/20 text-blue-400 flex items-center gap-1">
                            <GlobeIcon className="size-3" />
                            Public
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: Action Button */}
                <div className="flex-shrink-0 w-full sm:w-auto pt-2 sm:pt-0">
                  {session.participant && !isUserInSession(session) ? (
                    <button className="w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-full bg-slate-700 text-slate-500 cursor-not-allowed">
                      Full
                    </button>
                  ) : (
                    <Link 
                      to={`/session/${session._id}`} 
                      className="w-full sm:w-auto px-6 py-2 text-sm font-medium rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-2 transition-colors"
                    >
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-4" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-4 bg-blue-600/20 rounded-3xl flex items-center justify-center">
              <Code2Icon className="w-10 h-10 text-blue-400" />
            </div>
            <p className="text-lg font-semibold text-white mb-1">No active sessions</p>
            <p className="text-sm text-slate-500">Be the first to create one!</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default ActiveSessions;