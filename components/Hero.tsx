import React from 'react';

interface HeroProps {
  onStart: () => void;
  loading: boolean;
  hasError: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onStart, loading, hasError }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-stone-950 text-amber-50 p-6 border-b-8 border-amber-700">
      {/* Background Decor - Warm Tones */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-orange-900 rounded-full mix-blend-screen filter blur-[100px] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-amber-700 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
        <div className="absolute top-[40%] left-[30%] w-64 h-64 bg-yellow-900 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        {/* Grid texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      </div>

      <div className="relative z-10 max-w-4xl text-center">
        <div className="inline-block mb-4 border-b-2 border-amber-600 pb-1">
            <span className="text-amber-500 tracking-[0.3em] uppercase text-sm font-bold">The Untold History</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-amber-100 to-orange-200 drop-shadow-lg font-serif">
          Ancestry of AI
        </h1>
        
        <p className="text-lg md:text-2xl text-stone-400 mb-12 font-light leading-relaxed max-w-2xl mx-auto font-serif italic">
          "To understand the artificial mind, we must remember the forgotten human hands that forged it."
        </p>
        
        <p className="text-md md:text-lg text-stone-300 mb-10 max-w-3xl mx-auto border-l-4 border-orange-700 pl-6 text-left">
          A chronological expedition detailing how women, minorities, and global innovators laid the mathematical and physical foundations for the Age of Artificial Intelligence.
        </p>
        
        {hasError && (
           <div className="mb-8 p-4 bg-red-950/80 border border-red-800 rounded text-red-200 font-mono text-sm">
             [ERROR]: Connection to Archives Failed. Please retry.
           </div>
        )}

        <button
          onClick={onStart}
          disabled={loading}
          className={`
            group relative px-10 py-4 font-bold text-white transition-all duration-300 ease-out
            ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}
          `}
        >
          {/* Button Glow */}
          <div className="absolute inset-0 h-full w-full transform rounded bg-orange-600 blur opacity-40 transition-opacity duration-300 group-hover:opacity-60"></div>
          
          {/* Button Content */}
          <div className="relative flex items-center justify-center rounded border border-amber-500/50 bg-gradient-to-b from-stone-800 to-stone-900 px-8 py-4 shadow-2xl">
            <span className="bg-gradient-to-r from-amber-200 to-orange-100 bg-clip-text text-transparent group-hover:text-white transition-colors uppercase tracking-widest text-sm font-serif">
              {loading ? 'Decrypting Archives...' : 'Enter the Archives'}
            </span>
            {!loading && (
                <svg className="ml-3 w-4 h-4 text-amber-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};