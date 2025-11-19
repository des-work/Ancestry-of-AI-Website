import React from 'react';
import { Figure } from '../types';

interface TimelineCardProps {
  figure: Figure;
  index: number;
}

export const TimelineCard: React.FC<TimelineCardProps> = ({ figure, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`mb-16 flex justify-between items-center w-full ${isEven ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className="order-1 w-5/12 hidden md:block"></div>
      
      {/* Timeline Node */}
      <div className="z-20 flex items-center justify-center order-1 bg-stone-900 shadow-[0_0_15px_rgba(217,119,6,0.3)] w-14 h-14 rounded-full border-4 border-amber-700 relative">
        <h1 className="font-serif font-bold text-xl text-amber-500">{index + 1}</h1>
        {/* Connector line to card */}
        <div className={`absolute top-1/2 w-8 h-1 bg-amber-900/50 -z-10 ${isEven ? 'right-full' : 'left-full'}`}></div>
      </div>
      
      {/* Content Card */}
      <div className={`order-1 w-full md:w-5/12 px-4 md:px-0 ${isEven ? 'text-right md:pr-12' : 'text-left md:pl-12'}`}>
        <div className="relative group">
            {/* Card Background with Texture */}
            <div className="relative bg-stone-900 rounded-sm p-1 border border-stone-700 shadow-2xl hover:border-amber-600/50 transition-colors duration-300">
                <div className="bg-stone-800/50 p-6 relative overflow-hidden">
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-amber-900/20 to-transparent pointer-events-none"></div>

                    {/* Header Section */}
                    <div className={`flex items-center mb-6 gap-5 ${isEven ? 'md:flex-row-reverse' : 'flex-row'}`}>
                        <div className="relative">
                            <div className="absolute inset-0 border border-amber-600/30 transform rotate-3"></div>
                            <img 
                                src={`https://picsum.photos/seed/${figure.name.replace(/\s/g, '')}/150/150`} 
                                alt={figure.name}
                                className="w-20 h-20 relative z-10 grayscale contrast-125 border border-stone-600 object-cover"
                            />
                        </div>
                        <div className={`flex flex-col ${isEven ? 'md:items-end' : 'items-start'}`}>
                            <span className="text-amber-600 font-bold text-xs tracking-widest uppercase mb-1">{figure.contribution}</span>
                            <h3 className="text-2xl md:text-3xl font-serif font-bold text-stone-100 mb-1 leading-none">{figure.name}</h3>
                            <div className="flex items-center text-stone-500 font-mono text-xs gap-2">
                                <span>{figure.country.toUpperCase()}</span>
                                <span className="text-amber-700">•</span>
                                <span>{figure.year}</span>
                            </div>
                        </div>
                    </div>

                    {/* Body Text */}
                    <div className="mb-6">
                        <p className="text-stone-300 leading-relaxed text-sm md:text-base font-light border-t border-stone-700/50 pt-4">
                            {figure.detailedDescription}
                        </p>
                    </div>

                    {/* AI Connection Box */}
                    <div className="bg-orange-950/30 border-l-2 border-orange-600 p-4 mb-6">
                        <h4 className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                            <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                            Path to AI
                        </h4>
                        <p className="text-stone-400 text-sm italic">
                            {figure.aiConnection}
                        </p>
                    </div>

                    {/* Quote */}
                    <div className="relative pl-6 mb-4">
                        <span className="absolute top-0 left-0 text-4xl text-stone-600 font-serif leading-none">"</span>
                        <p className="text-stone-200 font-serif text-sm md:text-lg leading-snug">
                            {figure.quote}
                        </p>
                    </div>

                    {/* Tags */}
                    <div className={`mt-6 flex flex-wrap gap-2 ${isEven ? 'md:justify-end' : 'justify-start'}`}>
                        {figure.tags.map((tag, i) => (
                            <span key={i} className="px-3 py-1 text-[10px] uppercase tracking-wide text-stone-400 bg-stone-900 border border-stone-700">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};