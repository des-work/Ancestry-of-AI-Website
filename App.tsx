import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Hero } from './components/Hero';
import { TimelineCard } from './components/TimelineCard';
import { SidebarNav } from './components/SidebarNav';
import { EraBlock } from './components/EraBlock';
import { SummarySection } from './components/SummarySection';
import { WorksCited } from './components/WorksCited';
import { fetchHistoryData } from './services/geminiService';
import { Figure } from './types';

const App: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [data, setData] = useState<Figure[]>([]);
  const [error, setError] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const timelineRef = useRef<HTMLDivElement>(null);

  // We store the fetch promise to handle the race condition where the user clicks
  // "Enter" before the pre-fetch has finished.
  const fetchPromise = useRef<Promise<Figure[]> | null>(null);

  const initiateFetch = useCallback(() => {
    setError(false);
    const promise = fetchHistoryData();
    fetchPromise.current = promise;

    promise
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        console.error("Background fetch failed:", err);
        // We trigger the error state, which will be reflected in the Hero if visible
        setError(true);
      });
  }, []);

  // PRE-FETCH: Start loading data immediately when the app mounts
  useEffect(() => {
    initiateFetch();
  }, [initiateFetch]);

  // Scroll observer to update active ID in sidebar
  useEffect(() => {
    if (!started || data.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
      }
    );

    data.forEach((figure) => {
      const element = document.getElementById(figure.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [started, data]);

  const handleStart = async () => {
    setIsButtonLoading(true);

    // Scenario 1: Data is already pre-fetched and ready.
    if (data.length > 0) {
      // Add a small cinematic delay so the loading state on the button is visible for a moment
      await new Promise(resolve => setTimeout(resolve, 800));
      setStarted(true);
      setIsButtonLoading(false);
      setTimeout(() => timelineRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }

    // Scenario 2: Data is currently fetching (User clicked early).
    if (fetchPromise.current) {
      try {
        await fetchPromise.current;
        setStarted(true);
        setTimeout(() => timelineRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      } catch (e) {
        // Error is handled in the promise chain, but we ensure button stops loading
        setError(true);
      }
    } else {
      // Scenario 3: Fetch failed or never started (retry).
      initiateFetch();
      try {
        if (fetchPromise.current) {
           await fetchPromise.current;
           setStarted(true);
           setTimeout(() => timelineRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
        }
      } catch (e) {
         setError(true);
      }
    }
    setIsButtonLoading(false);
  };

  const handleRestart = () => {
    setStarted(false);
    // Note: We do NOT clear the data, so the next "Enter" is instant.
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const scrollToId = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (!started) {
    return <Hero onStart={handleStart} loading={isButtonLoading} hasError={error} />;
  }

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 font-sans selection:bg-orange-900 selection:text-white overflow-x-hidden">
      
      {/* Sidebar Navigation */}
      <SidebarNav figures={data} activeId={activeId} onSelect={scrollToId} />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-stone-950/90 backdrop-blur-md border-b border-amber-900/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3 cursor-pointer group" onClick={handleRestart}>
             <div className="w-10 h-10 bg-gradient-to-br from-amber-700 to-orange-800 flex items-center justify-center text-white font-serif font-bold text-xl shadow-inner border border-amber-600/50 group-hover:border-amber-400 transition-all rounded-sm">
               AI
             </div>
             <div className="flex flex-col">
                <span className="font-serif font-bold text-stone-200 tracking-wide leading-none group-hover:text-amber-500 transition-colors">HIDDEN ANCESTRY</span>
                <span className="text-[10px] uppercase tracking-widest text-stone-500">Of Artificial Intelligence</span>
             </div>
          </div>
          <button 
            onClick={handleRestart}
            className="text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-amber-500 transition-colors flex items-center gap-2 border border-stone-800 px-3 py-1 rounded hover:border-amber-700"
          >
            <span>← Start Over</span>
          </button>
        </div>
      </header>

      {/* Main Content - Added extra bottom padding for fixed footer */}
      <main className="pt-32 pb-32 px-4 relative bg-stone-950 w-full" ref={timelineRef}>
        <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24 relative">
                <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[100px] text-stone-800/20 font-serif font-bold z-0 select-none">HISTORY</span>
                <h2 className="relative z-10 text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-orange-100 to-amber-200 mb-6 drop-shadow-sm">
                    Timeline of Innovation
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-600 to-transparent mx-auto mb-6"></div>
                <p className="relative z-10 text-stone-400 max-w-2xl mx-auto text-lg leading-relaxed font-light italic">
                    Tracing the golden threads of logic, data, and vision from around the world that wove the fabric of today's machine intelligence.
                </p>
            </div>

            {/* Timeline Container */}
            <div className="relative flex flex-col p-2 md:p-0">
                {/* Vertical Golden Thread (Background) - Stretches full height of flex container */}
                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 border-r border-amber-800/20 shadow-[0_0_15px_rgba(180,83,9,0.1)] hidden md:block"></div>
                <div className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-amber-700/50 to-transparent hidden md:block"></div>
                
                {/* Mobile Vertical Line */}
                <div className="absolute top-0 bottom-0 left-8 border-l-2 border-stone-800 md:hidden"></div>

                {data.map((figure, index) => {
                    // Determine if we should show an Era Block
                    // Show if it's the first item, or if the era title differs from the previous item
                    const showEra = index === 0 || figure.era.title !== data[index - 1].era.title;
                    
                    return (
                        <React.Fragment key={figure.id || index}>
                            {showEra && <EraBlock era={figure.era} />}
                            <TimelineCard figure={figure} index={index} />
                        </React.Fragment>
                    );
                })}
            </div>
            
            {/* Epilogue Section - Distinctly separated from timeline */}
            <div className="mt-12 relative z-20">
               <SummarySection />
            </div>

            {/* Works Cited Section */}
            <div className="mt-0 relative z-20">
                <WorksCited figures={data} />
            </div>
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 bg-stone-950/95 border-t border-amber-900/30 py-3 backdrop-blur-md shadow-[0_-5px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-0">
            <div className="flex items-center gap-4">
                 <span className="text-amber-600 font-serif italic text-sm">Est. 2024</span>
                 <span className="hidden md:block h-3 w-px bg-stone-800"></span>
                 <p className="text-stone-500 text-[10px] font-mono uppercase tracking-wider">Curated by Gemini 2.5 Flash</p>
            </div>
            <p className="text-stone-600 text-[10px] md:text-xs italic text-center md:text-right">Honoring the diverse architects of our digital future.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;