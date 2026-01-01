
import React, { useState } from 'react';
import { Cpu, Menu, X } from 'lucide-react';

export const Navbar: React.FC<{ onOpenConsultation: () => void }> = ({ onOpenConsultation }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Cpu className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tighter">AI CATALYST</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#about" className="hover:text-white transition-colors">Почему ИИ?</a>
          <a href="#solutions" className="hover:text-white transition-colors">Решения</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <button onClick={onOpenConsultation} className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-slate-200 transition-all">
            Консультация
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-8 text-2xl font-bold md:hidden">
          <a href="#about" onClick={() => setIsOpen(false)}>Почему ИИ?</a>
          <a href="#solutions" onClick={() => setIsOpen(false)}>Решения</a>
          <a href="#faq" onClick={() => setIsOpen(false)}>FAQ</a>
          <button onClick={() => { onOpenConsultation(); setIsOpen(false); }} className="px-8 py-3 bg-blue-600 rounded-full">
            Консультация
          </button>
          <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6"><X /></button>
        </div>
      )}
    </nav>
  );
};

export const Footer: React.FC = () => (
  <footer className="py-20 px-6 border-t border-white/5 glass">
    <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
      <div className="col-span-2">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center"><Cpu className="text-white w-5 h-5" /></div>
          <span className="text-xl font-bold tracking-tighter">AI CATALYST</span>
        </div>
        <p className="text-slate-500 max-w-sm">Ваш партнер в мире прикладного ИИ. Помогаем бизнесу расти быстрее с помощью технологий будущего.</p>
      </div>
      <div>
        <h4 className="font-bold mb-6">Навигация</h4>
        <ul className="space-y-4 text-slate-500">
          <li><a href="#" className="hover:text-white transition-colors">Главная</a></li>
          <li><a href="#about" className="hover:text-white transition-colors">Почему ИИ?</a></li>
          <li><a href="#solutions" className="hover:text-white transition-colors">Решения</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Контакты</h4>
        <ul className="space-y-4 text-slate-500">
          <li>hi@aicatalyst.ai</li>
          <li>Москва, Сити</li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-20 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-sm text-slate-600">
      <p>© 2024 AI Catalyst. Все права защищены.</p>
    </div>
  </footer>
);
