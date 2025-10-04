// AudioService - Underwater Ambient Music & Sound Effects
class AudioService {
  constructor() {
    this.audioContext = null;
    this.musicGainNode = null;
    this.sfxGainNode = null;
    this.musicEnabled = true;
    this.sfxEnabled = true;
    this.musicNodes = [];
    this.isPlaying = false;
    
    // Load preferences from localStorage
    const savedMusicPref = localStorage.getItem('seaweedSwimmerMusic');
    const savedSfxPref = localStorage.getItem('seaweedSwimmerSfx');
    
    this.musicEnabled = savedMusicPref !== null ? savedMusicPref === 'true' : true;
    this.sfxEnabled = savedSfxPref !== null ? savedSfxPref === 'true' : true;
  }

  // Initialize Web Audio API
  initialize() {
    if (this.audioContext) return;
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create gain nodes for volume control
      this.musicGainNode = this.audioContext.createGain();
      this.musicGainNode.connect(this.audioContext.destination);
      this.musicGainNode.gain.value = this.musicEnabled ? 0.3 : 0;
      
      this.sfxGainNode = this.audioContext.createGain();
      this.sfxGainNode.connect(this.audioContext.destination);
      this.sfxGainNode.gain.value = this.sfxEnabled ? 0.4 : 0;
    } catch (error) {
      console.log('Web Audio API not supported');
    }
  }

  // Start underwater ambient music
  startMusic() {
    if (!this.audioContext || this.isPlaying) return;
    
    // Resume audio context (required for user interaction)
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    
    this.isPlaying = true;
    this.createUnderwaterAmbience();
  }

  // Stop all music
  stopMusic() {
    if (!this.audioContext) return;
    
    this.isPlaying = false;
    this.musicNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch (e) {}
    });
    this.musicNodes = [];
  }

  // Create underwater ambient soundscape
  createUnderwaterAmbience() {
    if (!this.audioContext || !this.musicEnabled) return;

    const now = this.audioContext.currentTime;

    // Bass line (rhythmic foundation)
    this.createBassLine(now);
    
    // Melodic lead (main melody)
    this.createMelodicLayer(now);
    
    // Harmony layer (chord progression)
    this.createHarmonyLayer(now);
    
    // Rhythmic percussion (upbeat)
    this.createRhythmLayer(now);
    
    // Hi-hat/cymbal layer (energy)
    this.createHiHatLayer(now);
    
    // Bubble sounds (ambience)
    this.scheduleBubbles();
    
    // Water movement ambience
    this.createWaterAmbience(now);
  }

  // Rhythmic bass line (funky, energetic)
  createBassLine(startTime) {
    if (!this.audioContext) return;
    
    const bassPattern = [
      { note: 110, duration: 0.3 },   // A2
      { note: 0, duration: 0.1 },     // Rest
      { note: 110, duration: 0.2 },   // A2
      { note: 146.83, duration: 0.3 }, // D3
      { note: 0, duration: 0.1 },     // Rest
      { note: 164.81, duration: 0.3 }, // E3
      { note: 0, duration: 0.1 },     // Rest
      { note: 130.81, duration: 0.2 }  // C3
    ];
    
    let currentTime = startTime;
    
    const playBassPattern = (time) => {
      if (!this.isPlaying) return;
      
      bassPattern.forEach((step, index) => {
        if (step.note === 0) {
          currentTime += step.duration;
          return;
        }
        
        const osc = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        osc.type = 'sawtooth';
        osc.frequency.value = step.note;
        
        filter.type = 'lowpass';
        filter.frequency.value = 300;
        filter.Q.value = 3;
        
        gainNode.gain.value = 0.2;
        gainNode.gain.exponentialRampToValueAtTime(0.001, time + currentTime + step.duration);
        
        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.musicGainNode);
        
        osc.start(time + currentTime);
        osc.stop(time + currentTime + step.duration);
        
        currentTime += step.duration;
      });
      
      const patternDuration = bassPattern.reduce((sum, step) => sum + step.duration, 0);
      const nextTime = time + patternDuration;
      
      if (nextTime - this.audioContext.currentTime < 60) {
        setTimeout(() => playBassPattern(nextTime), (patternDuration - 0.1) * 1000);
      }
    };
    
    playBassPattern(startTime);
  }

  // Bubble sound effects (for ambience)
  scheduleBubbles() {
    if (!this.audioContext || !this.isPlaying) return;
    
    const bubbleInterval = 2000 + Math.random() * 3000; // 2-5 seconds
    
    setTimeout(() => {
      this.createBubbleSound();
      this.scheduleBubbles();
    }, bubbleInterval);
  }

  // Single bubble sound
  createBubbleSound(isSwimSound = false) {
    if (!this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = 800 + Math.random() * 400;
    osc.frequency.exponentialRampToValueAtTime(
      1200 + Math.random() * 400, 
      now + 0.1
    );
    
    const targetGain = isSwimSound ? this.sfxGainNode : this.musicGainNode;
    const volume = isSwimSound ? 0.2 : 0.05;
    
    gainNode.gain.value = volume;
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    
    osc.connect(gainNode);
    gainNode.connect(targetGain);
    
    osc.start(now);
    osc.stop(now + 0.2);
  }

  // Melodic lead layer (catchy, energetic melody)
  createMelodicLayer(startTime) {
    if (!this.audioContext) return;
    
    // Catchy melodic pattern
    const melody = [
      { note: 659, duration: 0.3 },   // E5
      { note: 554, duration: 0.3 },   // C#5
      { note: 494, duration: 0.4 },   // B4
      { note: 554, duration: 0.3 },   // C#5
      { note: 659, duration: 0.5 },   // E5
      { note: 740, duration: 0.3 },   // F#5
      { note: 659, duration: 0.3 },   // E5
      { note: 554, duration: 0.6 },   // C#5
    ];
    
    const playMelody = (time) => {
      if (!this.isPlaying) return;
      
      let currentTime = 0;
      
      melody.forEach((note) => {
        const osc1 = this.audioContext.createOscillator();
        const osc2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();
        
        osc1.type = 'triangle';
        osc1.frequency.value = note.note;
        osc2.type = 'sine';
        osc2.frequency.value = note.note * 2; // Octave up for brightness
        
        filter.type = 'bandpass';
        filter.frequency.value = 2000;
        filter.Q.value = 1;
        
        gainNode.gain.value = 0;
        gainNode.gain.linearRampToValueAtTime(0.15, time + currentTime + 0.05);
        gainNode.gain.linearRampToValueAtTime(0.1, time + currentTime + note.duration - 0.05);
        gainNode.gain.linearRampToValueAtTime(0, time + currentTime + note.duration);
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(filter);
        filter.connect(this.musicGainNode);
        
        osc1.start(time + currentTime);
        osc1.stop(time + currentTime + note.duration);
        osc2.start(time + currentTime);
        osc2.stop(time + currentTime + note.duration);
        
        currentTime += note.duration;
      });
      
      const patternDuration = melody.reduce((sum, note) => sum + note.duration, 0);
      const nextTime = time + patternDuration;
      
      if (nextTime - this.audioContext.currentTime < 60) {
        setTimeout(() => playMelody(nextTime), (patternDuration - 0.1) * 1000);
      }
    };
    
    playMelody(startTime);
  }

  // Rhythmic percussion layer (lively beat)
  createRhythmLayer(startTime) {
    if (!this.audioContext) return;
    
    const beatInterval = 0.4; // Fast beat - every 0.4 seconds
    
    const playBeat = (time, isAccent) => {
      if (!this.isPlaying) return;
      
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      osc.type = 'sine';
      osc.frequency.value = isAccent ? 150 : 100;
      osc.frequency.exponentialRampToValueAtTime(50, time + 0.05);
      
      filter.type = 'highpass';
      filter.frequency.value = 80;
      
      const volume = isAccent ? 0.15 : 0.08;
      gainNode.gain.value = volume;
      gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.musicGainNode);
      
      osc.start(time);
      osc.stop(time + 0.1);
      
      // Schedule next beat
      const nextTime = time + beatInterval;
      const nextIsAccent = !isAccent; // Alternate between accent and non-accent
      
      if (nextTime - this.audioContext.currentTime < 60) {
        setTimeout(() => playBeat(nextTime, nextIsAccent), (beatInterval - 0.05) * 1000);
      }
    };
    
    playBeat(startTime, true);
  }

  // Water movement ambience (subtle noise)
  createWaterAmbience(startTime) {
    if (!this.audioContext) return;
    
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Generate filtered noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    
    const source = this.audioContext.createBufferSource();
    const filter = this.audioContext.createBiquadFilter();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = buffer;
    source.loop = true;
    
    filter.type = 'lowpass';
    filter.frequency.value = 500;
    
    gainNode.gain.value = 0.05;
    
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.musicGainNode);
    
    source.start(startTime);
    
    this.musicNodes.push(source);
  }

  // Swim sound effect (when player taps)
  playSwimSound() {
    if (!this.sfxEnabled || !this.audioContext) return;
    
    this.createBubbleSound(true);
    
    // Add splash sound
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.value = 200;
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
    
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    
    gainNode.gain.value = 0.15;
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.sfxGainNode);
    
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Collision sound effect
  playCollisionSound() {
    if (!this.sfxEnabled || !this.audioContext) return;
    
    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.value = 100;
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.2);
    
    gainNode.gain.value = 0.2;
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.connect(gainNode);
    gainNode.connect(this.sfxGainNode);
    
    osc.start(now);
    osc.stop(now + 0.3);
  }

  // Toggle music on/off
  setMusicEnabled(enabled) {
    this.musicEnabled = enabled;
    localStorage.setItem('seaweedSwimmerMusic', enabled.toString());
    
    if (this.musicGainNode) {
      this.musicGainNode.gain.value = enabled ? 0.3 : 0;
    }
    
    if (enabled && !this.isPlaying) {
      this.startMusic();
    } else if (!enabled && this.isPlaying) {
      this.stopMusic();
    }
  }

  // Toggle sound effects on/off
  setSfxEnabled(enabled) {
    this.sfxEnabled = enabled;
    localStorage.setItem('seaweedSwimmerSfx', enabled.toString());
    
    if (this.sfxGainNode) {
      this.sfxGainNode.gain.value = enabled ? 0.4 : 0;
    }
  }

  // Get current settings
  getMusicEnabled() {
    return this.musicEnabled;
  }

  getSfxEnabled() {
    return this.sfxEnabled;
  }
}

export default AudioService;
