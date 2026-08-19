/* ═══════════════════════════════════════════════════════════════
   useAudioEngine — Procedural Web Audio API Ambient Synthesizer
   ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';
import { useMuseumStore } from './useMuseumStore';

class ProceduralSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isRunning: boolean = false;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Lowpass filter for deep architectural sound
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Sub-bass drone oscillator 1 (Root)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sine';
    this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
    this.droneOsc1.connect(this.filter);
    this.droneOsc1.start();

    // Harmonic drone oscillator 2 (Fifth above)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(82.4, this.ctx.currentTime); // E2 note
    const osc2Gain = this.ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    this.droneOsc2.connect(osc2Gain);
    osc2Gain.connect(this.filter);
    this.droneOsc2.start();

    this.isRunning = true;
  }

  public setVolume(enabled: boolean) {
    if (!this.ctx) {
      if (enabled) this.init();
      else return;
    }

    if (this.ctx && this.ctx.state === 'suspended' && enabled) {
      this.ctx.resume();
    }

    if (this.masterGain && this.ctx) {
      const targetGain = enabled ? 0.18 : 0.0001;
      this.masterGain.gain.setTargetAtTime(targetGain, this.ctx.currentTime, 0.5);
    }
  }

  public updateEnvironmentFrequency(baseFreq: number) {
    if (!this.ctx || !this.droneOsc1 || !this.droneOsc2) return;
    this.droneOsc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 1.2);
    this.droneOsc2.frequency.setTargetAtTime(baseFreq * 1.5, this.ctx.currentTime, 1.2);
  }

  public playChime(freq = 440, type: OscillatorType = 'sine', duration = 0.8) {
    if (!this.ctx || !this.isRunning) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }
}

export const synth = new ProceduralSynthesizer();

export function useAudioEngine() {
  const soundEnabled = useMuseumStore((s) => s.soundEnabled);
  const audioFreq = useMuseumStore((s) => s.computedEnvironment.audioFrequencyBase);
  const initialized = useRef(false);

  useEffect(() => {
    if (soundEnabled && !initialized.current) {
      synth.init();
      initialized.current = true;
    }
    synth.setVolume(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    if (soundEnabled) {
      synth.updateEnvironmentFrequency(audioFreq);
    }
  }, [audioFreq, soundEnabled]);
}
