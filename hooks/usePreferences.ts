
import { useState, useEffect } from 'react';

const SOUND_PREF_KEY = 'ai_catalyst_sound_enabled';

export function usePreferences() {
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem(SOUND_PREF_KEY);
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem(SOUND_PREF_KEY, JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]);

  const toggleSound = () => setIsSoundEnabled(!isSoundEnabled);

  const playNotificationSound = (type: 'user' | 'assistant') => {
    if (!isSoundEnabled) return;
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      const frequency = type === 'assistant' ? 880 : 660;
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.05, audioContext.currentTime + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.15);

      oscillator.start();
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (e) {
      console.warn("Audio Context failed:", e);
    }
  };

  return { isSoundEnabled, toggleSound, playNotificationSound };
}
