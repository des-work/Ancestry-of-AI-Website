import React, { useState, useEffect } from 'react';

interface HeroProps {
  onStart: () => void;
  loading: boolean;
  hasError: boolean;
}

// Static data for the historical collage with depth and rotation parameters
const collageItems = [
    { 
        id: 1, 
        type: 'image', 
        seed: 'lovelace', 
        caption: 'Ada\'s Notes', 
        date: '1843', 
        position: 'top-[15%] left-[10%]', 
        rotation: '-rotate-6',
        depth: 20
    },
    { 
        id: 2, 
        type: 'fact', 
        title: 'Human Computers',
        content: 'The word "Computer" originally described a job title for humans—mostly women—who performed ballistics calculations by hand.', 
        position: 'top-[25%] right-[12%]', 
        rotation: 'rotate-3',
        depth: 15
    },
    { 
        id: 3, 
        type: 'image', 
        seed: 'eniac', 
        caption: 'ENIAC Wiring', 
        date: '1946', 
        position: 'bottom-[20%] left-[15%]', 
        rotation: 'rotate-2',
        depth: 25
    },
    { 
        id: 4, 
        type: 'fact', 
        title: 'Frequency Hopping',
        content: 'Hollywood star Hedy Lamarr co-invented frequency-hopping spread spectrum technology, the foundation for modern Wi-Fi.', 
        position: 'bottom-[25%] right-[10%]', 
        rotation: '-rotate-2',
        depth: 10
    },
    {
        id: 5,
        type: 'image',
        seed: 'apollo',
        caption: 'Apollo Code',
        date: '1969',
        position: 'hidden xl:block top-[45%] left-[5%]',
        rotation: 'rotate-12',
        depth: 30
    },
    {
        id: 6,
        type: 'fact', 
        title: 'First Bug',
        content: 'Grace Hopper popularized the term "debugging" after finding a moth stuck in a relay of the Harvard Mark II.',
        position: 'hidden xl:block top-[55%] right-[5%]',
        rotation: '-rotate-6',
        depth: 18
    }
];

export const Hero: React.FC<HeroProps> = ({ onStart, loading, hasError }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
        // Calculate normalized position -1 to 1 for parallax calculation
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-stone-950 text-amber-50 p-6 border-b-8 border-amber-800">
      
      {/* CSS Animations for marquee and scanlines */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scan {
          animation: scan 3s linear infinite;
        }
        @keyframes shine {
          100% { left: 125%; }
        }
        .animate-shine {
          animation: shine 1s;
        }
      `}</style>

      {/* --- NOISE OVERLAY --- */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.03] mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}>
      </div>

      {/* --- ATMOSPHERIC BACKGROUND (Parallax Level 1) --- */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none transition-transform duration-200 ease-out"
           style={{ transform: `translate(${mousePos.x * 10}px, ${mousePos.y * 10}px)` }}>
        {/* Warm Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-orange-900/20 rounded-full mix-blend-screen filter blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-amber-900/20 rounded-full mix-blend-screen filter blur-[100px]"></div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#d97706 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_10%,#1c1917_95%)]"></div>
      </div>

      {/* --- SCROLLING TEXT STRIP --- */}
      <div className="absolute top-24 left-0 w-full h-12 overflow-hidden opacity-10 pointer-events-none select-none hidden md:block rotate-[-2deg]">
          <div className="whitespace-nowrap animate-marquee font-mono text-4xl text-amber-500">
             ALGORITHM LOGIC DATA PROCESSING MEMORY COMPUTATION  ALGORITHM LOGIC DATA PROCESSING MEMORY COMPUTATION ALGORITHM LOGIC DATA PROCESSING MEMORY COMPUTATION
          </div>
      </div>

      {/* --- HISTORICAL COLLAGE LAYER (Parallax Level 2) --- */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {collageItems.map((item) => (
            <div 
                key={item.id} 
                className={`absolute transition-transform duration-100 ease-out ${item.position}`}
                style={{ 
                    transform: `translate(${mousePos.x * -item.depth}px, ${mousePos.y * -item.depth}px) ${item.rotation}`,
                }}
            >
                {item.type === 'image' ? (
                    // Polaroid Style Image Card
                    <div className="relative group perspective-1000">
                         {/* Tape Effect */}
                         <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-amber-100/20 backdrop-blur-[1px] shadow-sm z-20 rotate-1 border-l border-r border-white/10"></div>
                         
                         <div className="bg-[#f0f0eb] p-3 pb-10 shadow-[0_10px_20px_rgba(0,0,0,0.5)] w-48 md:w-60 border border-stone-400/20 transform transition-transform duration-500 hover:scale-105 hover:z-50 hover:rotate-0">
                             <div className="aspect-square bg-stone-800 overflow-hidden filter sepia-[0.4] contrast-110 mb-3 ring-1 ring-stone-900/10 relative">
                                 {/* Dust/Scratch Overlay */}
                                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dust.png')] opacity-40"></div>
                                 <img src={`https://picsum.photos/seed/${item.seed}/400/400`} alt="Historical" className="w-full h-full object-cover opacity-90" />
                             </div>
                             <div className="flex justify-between items-end px-1">
                                <span className="font-serif text-stone-800 text-sm font-bold italic leading-none">{item.caption}</span>
                                <span className="font-mono text-stone-500 text-[10px] tracking-tighter border border-stone-400 px-1 rounded-sm">{item.date}</span>
                             </div>
                             <div className="absolute bottom-2 right-3 w-8 h-8 opacity-10 mix-blend-multiply">
                                 <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-red-900">
                                     <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="5" fill="none"/>
                                     <text x="50" y="55" textAnchor="middle" fontSize="20" fontFamily="serif">ARCHIVE</text>
                                 </svg>
                             </div>
                        </div>
                    </div>
                ) : (
                    // Note Card Style
                    <div className="relative group">
                        <div className="bg-[#fcfbf9] text-stone-800 p-5 w-56 md:w-72 shadow-[0_15px_35px_rgba(0,0,0,0.4)] border-l-4 border-amber-700 transform transition-transform duration-500 hover:scale-105 hover:z-50 hover:rotate-0">
                            {/* Coffee Stain Effect */}
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-amber-900/5 blur-xl mix-blend-multiply pointer-events-none"></div>
                            
                            {/* Pin Effect */}
                            <div className="w-3 h-3 rounded-full bg-red-800 shadow-md absolute -top-1.5 left-1/2 -translate-x-1/2 z-10 border border-red-950"></div>
                            
                            <div className="flex items-center justify-between mb-3 border-b border-stone-300 pb-2 border-dashed">
                                <span className="font-mono text-[9px] uppercase tracking-widest text-amber-700 bg-amber-100 px-2 py-0.5 rounded-sm">Did You Know?</span>
                                <span className="font-serif font-bold text-stone-400 text-xs">REF-{item.id}04</span>
                            </div>
                            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1">{item.title}</h4>
                            <p className="font-serif text-xs leading-relaxed text-stone-700 opacity-90">
                                {item.content}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        ))}
      </div>

      {/* --- MAIN CONTENT (Parallax Level 0 - Static/Centred) --- */}
      <div className="relative z-20 max-w-5xl text-center px-4">
        
        <div className="inline-flex items-center justify-center gap-4 mb-6 relative">
             <div className="h-px w-12 md:w-24 bg-gradient-to-r from-transparent to-amber-600/50"></div>
             <span className="text-amber-500 font-mono tracking-[0.4em] uppercase text-[10px] md:text-xs font-bold px-3 py-1 border border-amber-900/30 bg-stone-900/40 backdrop-blur rounded">
                Confidential Archive
             </span>
             <div className="h-px w-12 md:w-24 bg-gradient-to-l from-transparent to-amber-600/50"></div>
        </div>
        
        <h1 className="text-6xl md:text-9xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-orange-100 to-amber-900 drop-shadow-[0_5px_15px_rgba(0,0,0,1)] font-serif leading-[0.85] mix-blend-hard-light">
          Ancestry<br/><span className="text-5xl md:text-8xl italic text-amber-700/80 relative top-2">of</span> AI
        </h1>
        
        <div className="relative inline-block my-8">
            <div className="absolute -inset-1 bg-amber-700/20 blur-lg rounded-full opacity-50"></div>
            <p className="relative text-lg md:text-2xl text-stone-300 font-light leading-relaxed max-w-3xl mx-auto font-serif italic drop-shadow-md px-6">
            "To understand the <span className="text-amber-400 font-normal">artificial mind</span>, we must remember the forgotten human hands that forged it."
            </p>
        </div>
        
        <div className="bg-stone-950/60 border-y border-amber-900/30 backdrop-blur-md py-4 px-6 mb-12 max-w-2xl mx-auto relative overflow-hidden">
             {/* Scan line */}
             <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-amber-500/5 to-transparent animate-scan pointer-events-none"></div>
             <p className="text-xs md:text-sm text-stone-400 font-mono leading-relaxed text-justify tracking-tight">
              SYSTEM STATUS: <span className="text-green-500">ONLINE</span>. <br className="md:hidden"/>
              INITIATING CHRONOLOGICAL SEQUENCE... <br/>
              LOADING SCHEMATICS... <br/>
              An interactive expedition detailing the schematics, formulas, and global innovators who laid the mathematical foundations for the Age of Artificial Intelligence.
            </p>
        </div>
        
        {hasError && (
           <div className="mb-8 p-4 bg-red-950/90 border-l-4 border-red-600 rounded-r text-red-200 font-mono text-xs md:text-sm shadow-2xl max-w-md mx-auto flex items-center gap-3 animate-pulse">
             <span className="text-xl">⚠️</span>
             <span>CONNECTION FAILURE. RETRY ARCHIVE ACCESS.</span>
           </div>
        )}

        <button
          onClick={onStart}
          disabled={loading}
          className={`
            group relative px-12 py-6 transition-all duration-500 ease-out transform
            ${loading ? 'opacity-70 cursor-not-allowed grayscale' : 'hover:scale-105 hover:-translate-y-1'}
          `}
        >
          {/* Glow Container */}
          <div className="absolute inset-0 h-full w-full bg-amber-600/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Button Body */}
          <div className="relative flex items-center justify-center gap-4 bg-stone-900 border border-amber-700/50 px-10 py-4 shadow-[0_0_0_1px_rgba(0,0,0,1),0_10px_20px_rgba(0,0,0,0.5)] overflow-hidden">
             {/* Tech borders */}
             <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-amber-500"></div>
             <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-amber-500"></div>
             <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-amber-500"></div>
             <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-amber-500"></div>

             {/* Hover Shine */}
             <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-amber-100/10 opacity-0 group-hover:animate-shine" />

            <span className="font-serif font-bold text-lg tracking-[0.2em] text-amber-100 group-hover:text-white transition-colors z-10 uppercase">
              {loading ? 'Decrypting...' : 'Enter Archives'}
            </span>
            
            {!loading && (
                <div className="w-6 h-6 rounded-full border border-amber-500 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-900 transition-all">
                    <svg className="w-3 h-3 transform group-hover:translate-x-px" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </div>
            )}
          </div>
        </button>

        {/* Footer Metadata */}
        <div className="mt-16 opacity-40 hover:opacity-80 transition-opacity duration-500 flex justify-center gap-8 text-[10px] font-mono uppercase tracking-widest text-stone-500">
            <span>Secured Connection</span>
            <span>•</span>
            <span>Encrypted Database</span>
            <span>•</span>
            <span>v2.5.0</span>
        </div>
      </div>
    </div>
  );
};
