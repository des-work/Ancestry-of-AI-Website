import React, { useState, useCallback, useRef } from 'react';
import { Hero } from './components/Hero';
import { TimelineCard } from './components/TimelineCard';
import { fetchHistoryData } from './services/geminiService';
import { Figure } from './types';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Figure[]>([]);
  const [error, setError] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const handleStart = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const historyData = await fetchHistoryData();
      setData(historyData);
      setStarted(true);
      // Small delay to allow render before scrolling
      setTimeout(() => {
        timelineRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleRestart = () => {
    setStarted(false);
    setData([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!started && data.length === 0) {
    return <Hero onStart={handleStart} loading={loading} hasError={error} />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-orange-900 selection:text-white">
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-stone-950/90 backdrop-blur-sm border-b border-amber-900/30 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={handleRestart}>
             <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-orange-800 flex items-center justify-center text-white font-serif font-bold text-xl shadow-inner border border-amber-600/50 group-hover:border-amber-400 transition-all">
               AI
             </div>
             <div className="flex flex-col">
                <span className="font-serif font-bold text-stone-200 tracking-wide leading-none group-hover:text-amber-500 transition-colors">HIDDEN ANCESTRY</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500">Of Artificial Intelligence</span>
             </div>
          </div>
          <button 
            onClick={handleRestart}
            className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-amber-500 transition-colors flex items-center gap-2"
          >
            <span>← Return to Start</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-4 relative bg-stone-950" ref={timelineRef}>
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-200 via-amber-100 to-stone-200 mb-6">
                    Timeline of Innovation
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-700 to-transparent mx-auto mb-6"></div>
                <p className="text-stone-400 max-w-2xl mx-auto text-lg leading-relaxed font-light italic">
                    Tracing the threads of logic, data, and vision from around the world that wove the fabric of today's machine intelligence.
                </p>
            </div>

            <div className="relative wrap overflow-hidden p-2 md:p-10 h-full">
                {/* Vertical Golden Thread */}
                <div className="absolute border border-amber-800/30 h-full left-1/2 transform -translate-x-1/2 hidden md:block shadow-[0_0_10px_rgba(180,83,9,0.2)]"></div>
                <div className="absolute w-px bg-gradient-to-b from-transparent via-amber-600 to-transparent h-full left-1/2 transform -translate-x-1/2 hidden md:block opacity-50"></div>
                
                {/* Mobile Vertical Line */}
                <div className="absolute border-l border-amber-800/30 h-full left-9 md:hidden"></div>

                {data.map((figure, index) => (
                    <TimelineCard key={figure.id || index} figure={figure} index={index} />
                ))}
            </div>
        </div>
      </main>

      <footer className="bg-stone-900 border-t border-amber-900/20 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="mb-6 flex justify-center items-center gap-4">
                 <span className="h-px w-12 bg-stone-700"></span>
                 <span className="text-amber-600 font-serif italic">Est. 2024</span>
                 <span className="h-px w-12 bg-stone-700"></span>
            </div>
            <p className="text-stone-500 text-sm mb-2 font-mono">Curated by Gemini 2.5 Flash</p>
            <p className="text-stone-600 text-xs">Honoring the diverse architects of our digital future.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;