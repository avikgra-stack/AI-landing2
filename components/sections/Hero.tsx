
import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useChatContext } from '../../context/ChatContext';
import { Button } from '../ui/Button';
import { T } from '../../constants/translations';
import { analytics } from '../../services/analyticsService';

export const Hero: React.FC = () => {
  const { toggleChat } = useChatContext();
  
  return (
    <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
      <div className="animate-in fade-in slide-in-from-left duration-700">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
          {T.hero.badge}
        </div>
        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-8">
          {T.hero.title.split(' ').map((word, i) => 
            word === 'автопилоте' 
              ? <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"> {word} </span> 
              : ` ${word} `
          )}
        </h1>
        <p className="text-xl text-slate-400 mb-10 leading-relaxed">
          {T.hero.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => {
              analytics.track('consultation_click', { source: 'hero' });
              toggleChat(true);
            }} 
            size="lg"
            className="group"
          >
            {T.hero.cta} 
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
      <div className="aspect-square glass rounded-3xl overflow-hidden relative group animate-in fade-in zoom-in duration-1000 shadow-2xl shadow-blue-500/5">
        <img 
          src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800" 
          className="object-cover w-full h-full opacity-60 group-hover:scale-110 transition-all duration-1000" 
          alt="AI Visualization" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Floating elements for visual depth */}
        <div className="absolute top-10 right-10 p-4 glass rounded-2xl animate-bounce-slow border border-white/10">
           <div className="text-blue-400 font-bold">ROI +300%</div>
        </div>
      </div>
    </section>
  );
};
