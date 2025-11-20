import React from 'react';
import { Figure } from '../types';

interface SidebarNavProps {
  figures: Figure[];
  activeId: string;
  onSelect: (id: string) => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({ figures, activeId, onSelect }) => {
  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden 2xl:flex flex-col gap-4 items-end">
      <div className="absolute right-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-800/40 to-transparent -z-10"></div>
      
      {figures.map((figure) => {
        const isActive = activeId === figure.id;
        return (
          <button
            key={figure.id}
            onClick={() => onSelect(figure.id)}
            className={`group relative flex items-center justify-end transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-60 hover:opacity-100'}`}
            aria-label={`Jump to ${figure.name}`}
          >
            {/* Tooltip Label */}
            <div className={`
              absolute right-14 bg-stone-900 text-amber-50 px-3 py-1 rounded border border-amber-900/50 shadow-xl 
              text-xs font-serif whitespace-nowrap transition-all duration-300 origin-right
              ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}
            `}>
              <span className="text-amber-500 font-bold mr-1">{figure.year}</span>
              {figure.name}
            </div>

            {/* Indicator Dot / Avatar */}
            <div className={`
              relative rounded-full overflow-hidden border-2 transition-all duration-300 bg-stone-950
              ${isActive ? 'w-12 h-12 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.4)]' : 'w-8 h-8 border-stone-600 group-hover:border-amber-400'}
            `}>
               <img 
                  src={`https://picsum.photos/seed/${figure.name.replace(/\s/g, '')}/100/100`} 
                  alt={figure.name}
                  className="w-full h-full object-cover grayscale"
               />
            </div>
            
            {/* Active connector line */}
            {isActive && <div className="absolute right-0 w-4 h-0.5 bg-amber-500 -mr-6"></div>}
          </button>
        );
      })}
    </div>
  );
};
