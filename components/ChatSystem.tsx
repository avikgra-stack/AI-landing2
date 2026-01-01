
import React, { useState, useEffect, useRef } from 'react';
import { Bot, Trash2, Volume2, VolumeX, X, Send, ArrowRight, Check } from 'lucide-react';
import { ChatMessage } from '../types';
import { Button } from './ui/Button';
import { T } from '../constants/translations';
import { analytics } from '../services/analyticsService';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  history: ChatMessage[];
  isLoading: boolean;
  onSend: (content: string) => void;
  onClear: () => void;
  isSoundEnabled: boolean;
  onToggleSound: () => void;
  onNavigate: (sectionId: string) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({ 
  isOpen, onClose, history, isLoading, onSend, onClear, isSoundEnabled, onToggleSound, onNavigate 
}) => {
  const [input, setInput] = useState('');
  const [showToast, setShowToast] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      endRef.current?.scrollIntoView({ behavior: 'smooth' });
      analytics.track('chat_opened');
    }
  }, [history, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSend(input);
    analytics.track('message_sent', { length: input.length });
    setInput('');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="chat-title"
    >
      <div className="w-full max-w-3xl h-[80vh] glass rounded-[2.5rem] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300 shadow-2xl border border-white/10 relative">
        
        {showToast && (
          <div className="absolute top-24 left-1/2 -translate-x-1/2 z-[110] bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-lg animate-in fade-in slide-in-from-top-4 duration-300">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Отправлено</span>
          </div>
        )}

        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 id="chat-title" className="font-bold text-lg">{T.chat.header}</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                {T.chat.status}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={onToggleSound} 
              className={`p-2 rounded-full transition-all ${isSoundEnabled ? 'text-blue-400 bg-blue-500/10' : 'text-slate-500 hover:bg-white/5'}`}
              aria-label={isSoundEnabled ? "Выключить звук" : "Включить звук"}
            >
              {isSoundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
            {history.length > 0 && (
              <button 
                onClick={onClear} 
                className="p-2 hover:bg-red-500/10 text-slate-400 hover:text-red-400 rounded-full transition-all"
                title={T.chat.clear}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Закрыть чат"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
          {history.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
              <Bot className="w-12 h-12 mb-4 animate-bounce-slow" />
              <p className="max-w-xs">{T.chat.welcome}</p>
            </div>
          )}
          {history.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-5 rounded-3xl relative animate-in slide-in-from-bottom-2 duration-300 ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'glass border border-white/10 shadow-lg rounded-tl-none'
              }`}>
                <div className="prose prose-invert max-w-none text-sm lg:text-base whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </div>
                {msg.suggestion && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <Button 
                      variant="glass" 
                      size="sm" 
                      className="w-full"
                      onClick={() => {
                        analytics.track('section_navigate', { sectionId: msg.suggestion!.sectionId });
                        onNavigate(msg.suggestion!.sectionId);
                      }}
                    >
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                      {msg.suggestion.reason}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="glass p-5 rounded-3xl rounded-tl-none flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <form onSubmit={handleSubmit} className="p-6 border-t border-white/5 bg-white/5 flex gap-4">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)}
            placeholder={T.chat.placeholder} 
            className="flex-1 bg-black/50 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 transition-colors"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            isLoading={isLoading} 
            disabled={!input.trim()}
            className="!px-6"
          >
            {!isLoading && <Send className="w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
};
