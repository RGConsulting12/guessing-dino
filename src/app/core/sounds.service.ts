import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundsService {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') {
      return null;
    }
    const AudioCtx =
      window.AudioContext ||
      (window as typeof window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) {
      return null;
    }
    if (!this.audioContext) {
      this.audioContext = new AudioCtx();
    }
    return this.audioContext;
  }

  async unlockAudio(): Promise<void> {
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      await ctx.resume();
    }
  }

  private tone(
    ctx: AudioContext,
    {
      frequency,
      start,
      duration,
      type = 'sine',
      gain = 0.12,
      slideTo,
    }: {
      frequency: number;
      start: number;
      duration: number;
      type?: OscillatorType;
      gain?: number;
      slideTo?: number;
    },
  ): void {
    const oscillator = ctx.createOscillator();
    const envelope = ctx.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    if (slideTo !== undefined) {
      oscillator.frequency.exponentialRampToValueAtTime(
        Math.max(slideTo, 1),
        start + duration,
      );
    }
    envelope.gain.setValueAtTime(0.0001, start);
    envelope.gain.exponentialRampToValueAtTime(gain, start + 0.02);
    envelope.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(envelope);
    envelope.connect(ctx.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  playSuccess(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      this.tone(ctx, {
        frequency,
        start: now + index * 0.09,
        duration: 0.18,
        type: 'triangle',
        gain: 0.1,
      });
    });
  }

  playSilly(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }
    const now = ctx.currentTime;
    this.tone(ctx, {
      frequency: 220,
      start: now,
      duration: 0.28,
      type: 'square',
      gain: 0.05,
      slideTo: 80,
    });
    this.tone(ctx, {
      frequency: 360,
      start: now + 0.08,
      duration: 0.2,
      type: 'sawtooth',
      gain: 0.03,
      slideTo: 140,
    });
  }

  playPageFanfare(): void {
    const ctx = this.getContext();
    if (!ctx) {
      return;
    }
    const now = ctx.currentTime;
    [392, 523.25, 659.25, 783.99, 1046.5].forEach((frequency, index) => {
      this.tone(ctx, {
        frequency,
        start: now + index * 0.08,
        duration: 0.22,
        type: 'triangle',
        gain: 0.11,
      });
    });
  }
}
