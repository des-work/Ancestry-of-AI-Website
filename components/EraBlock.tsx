import React from 'react';
import { Era } from '../types';

interface EraBlockProps {
  era: Era;
}

export const EraBlock: React.FC<EraBlockProps> = ({ era }) => {
  return (
    <div className="relative z-20 w-full my-32 py-16 px-6 md:px-12 bg-gradient-to-b from-stone-900 to-stone-950 border-y border-amber-900/30 backdrop-blur-sm shadow-2xl">
        {/* Decorative Corners */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-amber-700/50"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-amber-700/50"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-amber-700/50"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-amber-700/50"></div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left: Title */}
            <div className="md:col-span-4 text-center md:text-right">
                 <div className="inline-block mb-2 px-3 py-1 bg-amber-950/50 border border-amber-900 rounded-full">
                    <span className="text-amber-600 text-[10px] font-bold uppercase tracking-[0.25em]">Historical Era</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-stone-200 leading-tight">
                    {era.title}
                </h2>
            </div>

            {/* Center: Vertical Separator */}
            <div className="hidden md:flex md:col-span-1 justify-center h-32">
                <div className="w-px bg-gradient-to-b from-transparent via-amber-700 to-transparent"></div>
            </div>

            {/* Right: Context */}
            <div className="md:col-span-7 text-left">
                <div className="mb-6">
                    <h3 className="text-amber-600 font-serif italic text-lg mb-2">The World Stage</h3>
                    <p className="text-stone-400 text-sm leading-relaxed font-light">
                        {era.description}
                    </p>
                </div>

                <div className="pl-4 border-l-2 border-amber-600/30">
                    <h3 className="text-stone-300 font-serif font-bold text-sm mb-1 uppercase tracking-wide">Major Advancement</h3>
                    <p className="text-stone-300 text-sm">
                        {era.advancement}
                    </p>
                </div>
            </div>
        </div>
    </div>
  );
};
