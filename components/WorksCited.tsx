import React from 'react';
import { Figure } from '../types';

interface WorksCitedProps {
  figures: Figure[];
}

export const WorksCited: React.FC<WorksCitedProps> = ({ figures }) => {
  if (!figures || figures.length === 0) return null;

  return (
    <section className="relative py-24 px-6 bg-[#181615] border-t border-stone-800">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-stone-800 pb-6">
            <div>
                <h2 className="text-3xl font-serif font-bold text-stone-300 mb-2">Appendix A: Works Cited</h2>
                <p className="text-stone-500 text-sm font-mono">Verified references and historical records used in this archive.</p>
            </div>
            <div className="mt-4 md:mt-0">
                <div className="px-3 py-1 border border-stone-700 rounded text-[10px] uppercase tracking-widest text-stone-500">
                    Ref: BIB-{new Date().getFullYear()}
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {figures.map((figure) => (
                <div key={figure.id} className="group">
                    <div className="flex items-baseline justify-between mb-2">
                        <h3 className="text-amber-600 font-serif font-bold text-lg group-hover:text-amber-500 transition-colors">
                            {figure.name}
                        </h3>
                        <span className="text-stone-600 font-mono text-xs">{figure.year}</span>
                    </div>
                    <ul className="space-y-2">
                        {figure.sources.map((source, idx) => (
                            <li key={idx} className="text-stone-400 text-sm font-light leading-relaxed pl-4 border-l border-stone-800 group-hover:border-amber-900/50 transition-colors">
                                {source}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-stone-800 text-center">
            <p className="text-stone-600 text-xs italic">
                Disclaimer: This timeline is generated using AI based on historical records. While sources are provided for verification, we encourage cross-referencing with primary academic texts.
            </p>
        </div>
      </div>
    </section>
  );
};