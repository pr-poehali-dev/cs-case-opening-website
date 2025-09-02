// Упрощенные но надежные звуки CS2
export const playCS2Sound = (type: 'case_open' | 'roll_tick' | 'item_drop' | 'case_unlock', volume = 0.3) => {
  try {
    // Создаем новый AudioContext для каждого звука чтобы избежать конфликтов
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    // Возобновляем AudioContext если он приостановлен
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }
    
    if (type === 'case_open') {
      // Глубокий звук открытия кейса
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.type = 'sawtooth';
      osc.frequency.value = 120;
      
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
      
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 1.5);
      
    } else if (type === 'case_unlock') {
      // Щелчок разблокировки
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.type = 'sine';
      osc.frequency.value = 1200;
      
      gain.gain.setValueAtTime(volume, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
      
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 0.1);
      
    } else if (type === 'roll_tick') {
      // Улучшенный тик похожий на CS:GO - механический клик
      const osc1 = audioContext.createOscillator();
      const osc2 = audioContext.createOscillator();
      const gain = audioContext.createGain();
      const filter = audioContext.createBiquadFilter();
      
      // Создаем композитный звук из двух осцилляторов
      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(filter);
      filter.connect(audioContext.destination);
      
      // Основной клик - высокая частота
      osc1.type = 'sawtooth';
      osc1.frequency.value = 1400;
      
      // Дополнительная гармоника - средняя частота
      osc2.type = 'square';
      osc2.frequency.value = 700;
      
      // Фильтр для металлического звучания
      filter.type = 'bandpass';
      filter.frequency.value = 1000;
      filter.Q.value = 4;
      
      // Короткий резкий звук как в CS:GO
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.05);
      
      osc1.start(audioContext.currentTime);
      osc1.stop(audioContext.currentTime + 0.05);
      osc2.start(audioContext.currentTime);
      osc2.stop(audioContext.currentTime + 0.05);
      
    } else if (type === 'item_drop') {
      // Звук выпадения
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      
      osc.connect(gain);
      gain.connect(audioContext.destination);
      
      osc.type = 'sine';
      osc.frequency.value = 660;
      
      gain.gain.setValueAtTime(0, audioContext.currentTime);
      gain.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);
      
      osc.start(audioContext.currentTime);
      osc.stop(audioContext.currentTime + 1.5);
    }
  } catch (e) {
    console.log(`CS2 ${type} audio failed:`, e);
  }
};