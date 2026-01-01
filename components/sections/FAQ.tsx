
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from '../../types';

const FAQS: FAQItem[] = [
  { 
    question: "Насколько безопасно использование ИИ?", 
    answer: "Мы используем изолированные инстансы корпоративного уровня. Ваши данные не используются для обучения публичных моделей. Все процессы соответствуют стандартам GDPR и локальным требованиям безопасности." 
  },
  { 
    question: "Как быстро окупается внедрение?", 
    answer: "В среднем ROI достигается в течение первых 4-6 месяцев работы за счет роста конверсии на 15-30% и сокращения операционных расходов на автоматизацию рутины." 
  },
  { 
    question: "Нужна ли замена текущих систем?", 
    answer: "Нет, наши решения работают через API и интегрируются в ваш текущий стек: CRM, ERP, Telegram или веб-сайт." 
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 px-6 max-w-4xl mx-auto">
      <h2 className="text-4xl font-bold mb-16 text-center">Часто задаваемые вопросы</h2>
      <div className="space-y-4">
        {FAQS.map((faq, i) => (
          <div 
            key={i} 
            className={`glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 ${openIndex === i ? 'bg-white/5 border-white/20' : 'hover:border-white/10'}`}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)} 
              className="w-full px-8 py-6 flex items-center justify-between text-left group"
            >
              <span className={`text-lg font-semibold transition-colors ${openIndex === i ? 'text-blue-400' : 'group-hover:text-white'}`}>
                {faq.question}
              </span>
              <ChevronDown className={`transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-blue-400' : 'text-slate-500'}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="px-8 pb-8 text-slate-400 leading-relaxed border-t border-white/5 pt-4">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
