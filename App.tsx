
import React from 'react';
import { Zap, Users, LineChart, Calendar, CheckCircle2 } from 'lucide-react';
import { Navbar, Footer } from './components/Layout';
import { ChatModal } from './components/ChatSystem';
import { Hero } from './components/sections/Hero';
import { FAQ } from './components/sections/FAQ';
import { useChatContext } from './context/ChatContext';
import { Feature, Benefit } from './types';

const App: React.FC = () => {
  const { 
    isChatOpen, toggleChat, chatHistory, isLoading, 
    sendMessage, clearHistory, isSoundEnabled, 
    toggleSound, navigateToSection 
  } = useChatContext();

  const features: Feature[] = [
    { id: '1', title: 'Автоматизация 2.0', description: 'ИИ берет на себя рутину, освобождая сотрудников для творческих и стратегических задач.', icon: <Zap className="text-blue-400" /> },
    { id: '2', title: 'Предиктивная аналитика', description: 'Узнавайте тренды раньше рынка. Предсказывайте спрос с точностью до 95%.', icon: <LineChart className="text-purple-400" /> },
    { id: '3', title: 'Гипер-персонализация', description: 'Каждый ваш клиент получает уникальное предложение, созданное алгоритмами.', icon: <Users className="text-pink-400" /> }
  ];

  const benefits: Benefit[] = [
    { title: 'Рост выручки', value: '+35%', subtext: 'В среднем за первый год' },
    { title: 'Экономия времени', value: '40ч+', subtext: 'На каждого менеджера' },
    { title: 'Точность решений', value: '99%', subtext: 'Минимум ошибок' }
  ];

  return (
    <div className="min-h-screen relative text-slate-200">
      <Navbar onOpenConsultation={() => toggleChat(true)} />

      <Hero />

      {/* Stats Section */}
      <section id="about" className="py-20 px-6 glass border-y border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12 text-center">
          {benefits.map((b, i) => (
            <div key={i} className="group cursor-default">
              <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 mb-2 group-hover:to-blue-400 transition-all duration-500">
                {b.value}
              </div>
              <div className="text-xl font-bold">{b.title}</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest mt-1">{b.subtext}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-4">Инструменты нового поколения</h2>
          <p className="text-slate-400 max-w-2xl">Мы строим интеллектуальные системы, которые становятся мозгом вашего бизнеса.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(f => (
            <div key={f.id} className="glass p-8 rounded-3xl border border-white/5 hover:border-blue-500/20 hover:bg-blue-500/5 transition-all group">
              <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{f.title}</h3>
              <p className="text-slate-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      <FAQ />

      {/* CTA Section */}
      <section id="results" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="rounded-[3.5rem] bg-gradient-to-br from-[#050a15] to-[#0a1025] p-12 lg:p-20 border border-white/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-blue-600/20 transition-all duration-1000"></div>
          
          <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-6xl font-bold leading-tight">
                Запишитесь на <span className="text-blue-400">бесплатную</span> консультацию
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-green-500 w-5 h-5" /> 
                  <span className="font-medium">Персональный расчет ROI для вашей ниши</span>
                </li>
                <li className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="text-green-500 w-5 h-5" /> 
                  <span className="font-medium">Аудит текущих процессов</span>
                </li>
              </ul>
              <button 
                onClick={() => toggleChat(true)} 
                className="px-10 py-5 bg-white text-black rounded-2xl font-bold text-xl hover:bg-blue-600 hover:text-white transition-all shadow-2xl hover:scale-105"
              >
                Начать обсуждение
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="glass p-10 rounded-[2.5rem] border border-white/10 text-center hover:border-white/20 transition-all">
                <Calendar className="mx-auto mb-6 text-blue-400 w-16 h-16" />
                <div className="text-3xl font-bold mb-2">Ближайшее окно</div>
                <div className="text-slate-400 text-lg uppercase tracking-widest">Сегодня в 16:30</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <ChatModal 
        isOpen={isChatOpen} 
        onClose={() => toggleChat(false)} 
        history={chatHistory} 
        isLoading={isLoading} 
        onSend={sendMessage} 
        onClear={clearHistory} 
        isSoundEnabled={isSoundEnabled} 
        onToggleSound={toggleSound} 
        onNavigate={navigateToSection} 
      />
    </div>
  );
};

export default App;
