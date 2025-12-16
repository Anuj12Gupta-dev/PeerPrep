import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  
  // Helper to apply text color based on difficulty for better contrast
  const getDifficultyTextColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    // Main Container: Dark background, scrollable
    <div className="h-full overflow-y-auto bg-slate-950 text-slate-100">
      
      {/* HEADER SECTION (Sticky/Fixed Appearance) */}
      <div className="sticky top-0 z-10 p-6 bg-slate-900 border-b border-white/5 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl font-bold text-white tracking-tight">{problem.title}</h1>
          <span className={`px-3 py-1 text-sm font-semibold rounded-full flex-shrink-0 ${getDifficultyBadgeClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </div>
        
        <p className="text-base text-slate-400 mb-4">{problem.category}</p>

        {/* Problem selector */}
        <div className="mt-4">
          <select
            className="w-full h-10 px-4 rounded-lg border border-white/10 bg-slate-800 text-white text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none"
            value={currentProblemId}
            onChange={(e) => onProblemChange(e.target.value)}
          >
            {allProblems.map((p) => (
              <option key={p.id} value={p.id} className="bg-slate-800 text-white">
                {p.title} - {p.difficulty}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="p-6 space-y-8">
        
        {/* PROBLEM DESCRIPTION */}
        <div className="p-6 rounded-xl border border-white/5 bg-slate-900 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/5 pb-2">Description</h2>

          <div className="space-y-4 text-base text-slate-300 leading-relaxed">
            <p>{problem.description.text}</p>
            {problem.description.notes.map((note, idx) => (
              <p key={idx} className="text-slate-400 italic">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* EXAMPLES SECTION */}
        <div className="p-6 rounded-xl border border-white/5 bg-slate-900 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/5 pb-2">Examples</h2>
          <div className="space-y-6">
            {problem.examples.map((example, idx) => (
              <div key={idx} className="p-4 rounded-lg border border-white/10 bg-slate-800/50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-blue-600/20 text-blue-400">
                    {idx + 1}
                  </span>
                  <p className="font-semibold text-white">Example {idx + 1}</p>
                </div>
                <div className="font-mono text-sm space-y-2">
                  <div className="flex gap-2">
                    <span className="font-bold min-w-[70px] text-blue-400">Input:</span>
                    <span className="text-slate-200">{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-bold min-w-[70px] text-violet-400">Output:</span>
                    <span className="text-slate-200">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="pt-3 border-t border-white/10 mt-3">
                      <span className="text-slate-500 font-sans text-xs">
                        <span className="font-semibold text-slate-300">Explanation:</span> {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div className="p-6 rounded-xl border border-white/5 bg-slate-900 shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-white border-b border-white/5 pb-2">Constraints</h2>
          <ul className="space-y-2 text-slate-300">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex gap-2 items-start">
                <span className="text-blue-500 text-lg leading-none">•</span>
                <code className="text-sm bg-slate-800/50 rounded px-1 text-slate-200 py-[1px] leading-relaxed block">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProblemDescription;