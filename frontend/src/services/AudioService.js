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

    // Deep ocean drone (low frequency)
    this.createDeepDrone(now);
    
    // Bubble sounds (random, periodic)
    this.scheduleBubbles();
    
    // Gentle melodic tones (peaceful)
    this.createMelodicLayer(now);
    
    // Water movement ambience
    this.createWaterAmbience(now);
    
    // Rhythmic percussion (upbeat)
    this.createRhythmLayer(now);
  }

  // Deep ocean drone sound
  createDeepDrone(startTime) {
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    osc1.type = 'sine';
    osc1.frequency.value = 55; // Low A
    osc2.type = 'sine';
    osc2.frequency.value = 82.5; // E
    
    filter.type = 'lowpass';
    filter.frequency.value = 200;
    
    gainNode.gain.value = 0;
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + 2);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.musicGainNode);
    
    osc1.start(startTime);
    osc2.start(startTime);
    
    this.musicNodes.push(osc1, osc2);
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

  // Melodic layer (lively, upbeat)
  createMelodicLayer(startTime) {
    if (!this.audioContext) return;
    
    const notes = [330, 370, 415, 494, 554, 659, 740]; // Extended pentatonic scale
    const noteDuration = 0.8; // Much faster - 0.8 seconds per note
    
    const playNote = (noteIndex, time) => {
      if (!this.isPlaying) return;
      
      const osc = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      osc.type = 'sine';
      osc.frequency.value = notes[noteIndex];
      
      filter.type = 'lowpass';
      filter.frequency.value = 3000;
      filter.Q.value = 2;
      
      gainNode.gain.value = 0;
      gainNode.gain.linearRampToValueAtTime(0.12, time + 0.1);
      gainNode.gain.linearRampToValueAtTime(0.12, time + noteDuration - 0.1);
      gainNode.gain.linearRampToValueAtTime(0, time + noteDuration);
      
      osc.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(this.musicGainNode);
      
      osc.start(time);
      osc.stop(time + noteDuration);
      
      this.musicNodes.push(osc);
      
      // Schedule next note
      const nextIndex = (noteIndex + 1) % notes.length;
      const nextTime = time + noteDuration;
      
      if (nextTime - this.audioContext.currentTime < 60) { // Schedule up to 60 seconds ahead
        setTimeout(() => playNote(nextIndex, nextTime), (noteDuration - 1) * 1000);
      }
    };
    
    playNote(0, startTime);
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
