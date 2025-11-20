import React, { useState, useEffect } from 'react';
import { Figure } from '../types';

interface TimelineCardProps {
  figure: Figure;
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ figure, index }) => {
  const [showVideo, setShowVideo] = useState(false);

  // Generate a search URL for the external link
  const externalLink = `https://www.google.com/search?q=${encodeURIComponent(figure.name + " computing history biography")}`;

  // Handle Escape key and Body Scroll Lock
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowVideo(false);
    };

    if (showVideo) {
      window.addEventListener('keydown', handleEsc);
      // Prevent scrolling the background when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [showVideo]);

  return (
    <div id={figure.id} className="scroll-mt-40 mb-32 flex justify-center items-stretch w-full relative z-10">
      
      {/* LEFT COLUMN: Narrative & Biography */}
      <div className="w-full md:w-[45%] px-4 md:pl-0 md:pr-12 text-right flex flex-col items-end">
        
        {/* Header Info */}
        <div className="mb-4 flex flex-col items-end">
            <span className="text-5xl font-serif font-bold text-amber-500/20 absolute -mt-8 select-none">{figure.year}</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-amber-100 relative z-10 leading-none mb-1 shadow-black drop-shadow-md">
                {figure.name}
            </h2>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-600 bg-stone-900/80 px-2 py-1 border border-amber-900/30 rounded">
                {figure.country}
            </span>
        </div>

        {/* Portrait */}
        <div className="relative w-full max-w-md aspect-[4/3] mb-6 overflow-hidden rounded-sm border border-stone-700 shadow-2xl group">
             <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/20 to-transparent z-10 mix-blend-overlay"></div>
             <img 
                src={`https://picsum.photos/seed/${figure.name.replace(/\s/g, '')}/600/400`} 
                alt={figure.name}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
            />
             <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-950 to-transparent">
                 <p className="text-amber-200 font-serif italic text-sm text-left opacity-80">"{figure.contribution}"</p>
             </div>
        </div>

        {/* Quote */}
        <blockquote className="relative mb-6 border-r-4 border-amber-700 pr-4 mr-[-1px] max-w-lg">
            <p className="text-lg text-stone-300 font-serif italic leading-relaxed">
                "{figure.quote}"
            </p>
        </blockquote>

        {/* Description */}
        <div className="prose prose-invert prose-sm text-stone-400 font-light mb-6 text-justify" dir="rtl">
            {figure.detailedDescription}
        </div>

        {/* AI Connection - Highlighted */}
        <div className="mb-6 p-4 bg-stone-900 border border-amber-900/40 rounded-sm relative overflow-hidden w-full max-w-md">
            <div className="absolute top-0 right-0 w-16 h-16 bg-amber-600/10 rounded-bl-full"></div>
            <h4 className="relative z-10 text-amber-500 text-xs font-bold uppercase tracking-widest mb-2 flex items-center justify-end gap-2">
                Ancestral Link to AI <span className="text-lg">⚡</span>
            </h4>
            <p className="relative z-10 text-stone-300 text-sm italic leading-relaxed">
                {figure.aiConnection}
            </p>
        </div>

        {/* Functional External Link */}
        <a 
            href={externalLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 px-5 py-2 bg-stone-800 hover:bg-stone-700 border border-stone-600 hover:border-amber-500 transition-all rounded-full"
        >
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-amber-400 transition-colors">
                Access External Records
            </span>
            <svg className="w-4 h-4 text-stone-500 group-hover:text-amber-500 transform group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
        </a>

      </div>
      
      {/* CENTER COLUMN: Timeline Node */}
      <div className="hidden md:flex flex-col items-center justify-start w-[10%] relative">
          {/* Circle Node */}
          <div className="sticky top-1/2 transform -translate-y-1/2 z-20 flex items-center justify-center bg-stone-950 w-12 h-12 rounded-full border-4 border-amber-700 shadow-[0_0_20px_rgba(217,119,6,0.6)]">
            <span className="font-serif font-bold text-amber-500 text-sm">{index + 1}</span>
          </div>
          {/* Horizontal Connectors */}
          <div className="absolute top-12 w-full h-px bg-gradient-to-r from-transparent via-amber-900/50 to-transparent md:hidden"></div>
      </div>
      
      {/* RIGHT COLUMN: Media & Archives (Video, Tech, Artifacts) */}
      <div className="w-full md:w-[45%] px-4 md:pr-0 md:pl-12 text-left flex flex-col items-start pt-12 md:pt-0">
        
        <div className="flex items-center gap-2 mb-4 md:mt-2 opacity-60">
             <span className="w-8 h-px bg-amber-500"></span>
             <span className="text-xs font-mono uppercase tracking-widest text-amber-500">Evidence & Archives</span>
        </div>

        {/* Video Player Trigger - Prominent Position */}
        <div className="w-full max-w-lg mb-8 relative group/video">
            <div className="flex items-center justify-between mb-1 px-1">
                <span className="text-[9px] font-mono uppercase text-stone-500">Archival Footage // REC-{figure.year}</span>
            </div>
            <div className="aspect-video bg-black border-2 border-stone-800 rounded-sm overflow-hidden relative shadow-2xl">
                {/* Thumbnail / Trigger */}
                <div 
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer bg-stone-900 hover:bg-stone-800 transition-colors"
                    onClick={() => setShowVideo(true)}
                >
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    <div className="w-16 h-16 rounded-full border border-amber-700/50 flex items-center justify-center bg-black/50 backdrop-blur-sm group-hover/video:scale-110 transition-transform">
                            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-amber-600 border-b-[10px] border-b-transparent ml-1"></div>
                    </div>
                    <p className="mt-3 text-[10px] font-mono uppercase text-amber-700/80 tracking-widest">Play Search Reel</p>
                </div>
                
                {/* Scanlines Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[length:100%_4px] bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] z-20 opacity-30"></div>
            </div>
            <p className="text-[9px] text-stone-600 font-mono mt-1 italic truncate">
                Query: "{figure.speechKeywords}"
            </p>
        </div>

        {/* Technical Archive Box */}
        <div className="w-full max-w-lg bg-stone-900/50 border border-stone-800 p-1 relative">
            {/* Decorative screw heads */}
            <div className="absolute top-1 left-1 w-1 h-1 bg-stone-700 rounded-full"></div>
            <div className="absolute top-1 right-1 w-1 h-1 bg-stone-700 rounded-full"></div>
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-stone-700 rounded-full"></div>
            <div className="absolute bottom-1 right-1 w-1 h-1 bg-stone-700 rounded-full"></div>

            <div className="bg-black/40 border border-stone-800 p-4 flex flex-col gap-4">
                {/* Formula */}
                <div>
                    <h5 className="text-[9px] font-mono uppercase text-stone-500 mb-1">Mathematical Derivation</h5>
                    <div className="font-mono text-amber-500 text-xs md:text-sm bg-stone-950/50 p-2 border-l-2 border-amber-700 break-all">
                        {figure.formula}
                    </div>
                </div>

                {/* Artifact */}
                <div className="flex items-start gap-4 pt-4 border-t border-stone-800/50">
                     <div className="w-16 h-16 shrink-0 border border-stone-700 bg-stone-800 overflow-hidden relative">
                        <div className="absolute inset-0 bg-amber-900/20 mix-blend-color-burn z-10"></div>
                         <img 
                            src={`https://picsum.photos/seed/${figure.artifactName.replace(/\s/g, '')}/200/200`} 
                            alt="Artifact" 
                            className="w-full h-full object-cover grayscale"
                         />
                     </div>
                     <div>
                         <h5 className="text-[9px] font-mono uppercase text-stone-500 mb-1">Key Artifact</h5>
                         <p className="text-stone-300 font-serif font-bold text-sm">{figure.artifactName}</p>
                         <p className="text-[10px] text-stone-500 leading-tight mt-1">
                             Primary physical evidence of contribution.
                         </p>
                     </div>
                </div>
            </div>
        </div>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
            {figure.tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 text-[9px] uppercase tracking-wide text-stone-400 bg-stone-800/50 border border-stone-700 rounded-full">
                    #{tag}
                </span>
            ))}
        </div>

      </div>

      {/* VIDEO MODAL - OVERLAY */}
      {showVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop - Dims the page */}
            <div 
                className="absolute inset-0 bg-stone-950/95 backdrop-blur-md animate-in fade-in duration-300"
                onClick={() => setShowVideo(false)}
            ></div>
            
            {/* Player Container - Centered and Focused */}
            <div className="relative w-full max-w-6xl aspect-video bg-black shadow-[0_0_50px_rgba(0,0,0,0.9)] border border-stone-800 z-[110] animate-in zoom-in-95 duration-300">
                {/* Loading Spinner */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="w-8 h-8 border-2 border-amber-600 border-t-transparent rounded-full animate-spin"></div>
                </div>

                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(figure.speechKeywords)}&autoplay=1`}
                    title={`Archive Footage: ${figure.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="relative z-10 w-full h-full"
                ></iframe>
                
                {/* Close Button */}
                <button 
                    onClick={() => setShowVideo(false)}
                    className="absolute -top-12 right-0 text-stone-400 hover:text-white flex items-center gap-2 group/close transition-colors outline-none"
                    aria-label="Close Video"
                >
                    <span className="text-xs font-mono uppercase tracking-widest group-hover/close:text-amber-500">Close Archive</span>
                    <div className="p-2 bg-stone-800 rounded-full border border-stone-700 group-hover/close:border-amber-500 group-hover/close:bg-stone-900 shadow-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                </button>
            </div>
        </div>
      )}

    </div>
  );
};