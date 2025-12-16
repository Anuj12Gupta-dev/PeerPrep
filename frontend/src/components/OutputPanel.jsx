function OutputPanel({ output }) {
  return (
    // Main Container: Dark background, column layout
    <div className="h-full bg-slate-900 flex flex-col rounded-b-xl border border-t-0 border-white/5">
      
      {/* Header Bar */}
      <div className="px-4 py-2 border-b border-white/10 font-semibold text-sm text-white bg-slate-800 rounded-t-xl">
        Output Console
      </div>
      
      {/* Output Content Area */}
      <div className="flex-1 overflow-auto p-4 text-sm font-mono">
        {output === null ? (
          // Default empty state
          <p className="text-slate-500 text-sm italic">Click "Run Code" to see the output here...</p>
        ) : output.success ? (
          // Success State (Green Text)
          <pre className="text-green-400 whitespace-pre-wrap">
            {output.output}
          </pre>
        ) : (
          // Error State
          <div>
            {/* Standard Output (if any, typically from console.log before crash) */}
            {output.output && (
              <pre className="text-slate-300 whitespace-pre-wrap mb-2 border-b border-white/5 pb-2">
                {output.output}
              </pre>
            )}
            {/* Error Message (Red Text) */}
            <pre className="text-red-400 whitespace-pre-wrap">
              {output.error}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
export default OutputPanel;