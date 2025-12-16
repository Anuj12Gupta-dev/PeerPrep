import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden bg-slate-950 pt-20"> 
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div>
            <div className="flex items-center gap-4 mb-4">
              
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-900/50">
                <SparklesIcon className="w-5 h-5 text-white fill-white/50" />
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
                Welcome back, 
                <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                  {user?.firstName || "there"}!
                </span>
              </h1>
            </div>
            
            <p className="text-lg text-slate-400 ml-14 max-w-xl">
              Ready to collaborate, practice, and level up your coding skills?
            </p>
          </div>
          
          <button
            onClick={onCreateSession}
            className="h-12 px-8 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all hover:scale-[1.02] flex items-center gap-2 flex-shrink-0"
          >
            <ZapIcon className="w-5 h-5 mr-1" />
            <span>Create New Session</span>
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;