
type EventName = 'chat_opened' | 'message_sent' | 'consultation_click' | 'section_navigate' | 'error_occurred';

export const analytics = {
  track: (event: EventName, properties?: Record<string, any>) => {
    // В будущем здесь будет интеграция с GA4, Mixpanel или вашим бэкендом
    console.debug(`[Analytics] ${event}`, properties);
    
    // Пример сохранения локальной статистики
    const stats = JSON.parse(localStorage.getItem('ai_catalyst_stats') || '{}');
    stats[event] = (stats[event] || 0) + 1;
    localStorage.setItem('ai_catalyst_stats', JSON.stringify(stats));
  }
};
