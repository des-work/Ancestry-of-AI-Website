import React from 'react';

export const SummarySection: React.FC = () => {
  return (
    <section className="relative py-32 px-6 bg-stone-950 overflow-hidden border-t border-amber-900/30 mt-24">
      {/* Background texture matching the Hero */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/stardust.png")' }}>
      </div>
      
      {/* Decorative vertical line connecting from the timeline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-amber-700/50 to-transparent"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block mb-10">
             <span className="font-mono text-amber-600 text-xs uppercase tracking-[0.3em] border-b border-amber-800 pb-2">Epilogue</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-serif font-bold text-stone-200 mb-12 leading-[1.1]">
          The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-orange-400 italic">Human</span> Equation
        </h2>

        <div className="prose prose-invert prose-lg mx-auto text-stone-400 font-light leading-loose space-y-8 text-justify md:text-center selection:bg-amber-900/30 selection:text-amber-100">
          <p>
            Technology is often taught as a sterile progression of machines—faster processors, smaller transistors, smarter algorithms. But the history of computing is not merely a catalog of inventions; it is an anthology of human lives.
          </p>
          <p>
            The individuals featured in this archive did not just write code or build circuits. They chased <span className="text-amber-200 font-serif italic font-bold">dreams</span>. They poured their passions, their resilience, and their entire life's work into solving problems that the world had not yet realized existed. Often working from the margins, facing systemic barriers, their intellectual courage laid the invisible rails upon which our modern digital world runs.
          </p>
          <p>
            To understand Artificial Intelligence, we must understand the natural intelligence that birthed it. Every line of code in a modern neural network carries the DNA of these pioneers. Their stories remind us that science is not just about data—it is a deeply human endeavor, fueled by the relentless pursuit of the impossible.
          </p>
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 opacity-60">
            <div className="w-16 h-1 bg-amber-800 rounded-full"></div>
            <div className="w-1 h-1 bg-amber-600 rounded-full"></div>
            <div className="font-serif italic text-stone-600 text-sm">End of Archive Records</div>
        </div>
      </div>
    </section>
  );
};
