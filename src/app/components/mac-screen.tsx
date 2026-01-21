import { ReactNode } from 'react';

interface MacScreenProps {
  children: ReactNode;
}

export function MacScreen({ children }: MacScreenProps) {
  return (
    <div className="relative w-full max-w-6xl mx-auto perspective-1000">
      {/* MacBook Pro frame */}
      <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg p-3 shadow-2xl">
        {/* Top bar with dots */}
        <div className="flex items-center gap-2 mb-3 px-2">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
        </div>
        
        {/* Screen content */}
        <div className="relative bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 rounded-md overflow-hidden aspect-[16/10] shadow-inner">
          {/* Subtle screen shine effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
          
          {/* Content */}
          <div className="relative h-full flex items-center justify-center p-12">
            {children}
          </div>
        </div>
      </div>
      
      {/* MacBook base shadow */}
      <div className="h-2 bg-gradient-to-b from-gray-900/50 to-transparent rounded-b-xl -mt-1" />
    </div>
  );
}