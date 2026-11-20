/**
 * Self-contained Web Audio API Music Box Synthesizer
 * Plays a gentle, nostalgic music-box rendition of "Happy Birthday"
 * Zero external MP3 files required.
 */

interface NoteItem {
  freq: number;
  duration: number; // in seconds
  delay: number;    // delay before playing next note
}

// Standard musical frequencies in Hz (Octave 4 & 5)
const C4 = 261.63;
const D4 = 293.66;
const E4 = 329.63;
const F4 = 349.23;
const G4 = 392.00;
const A4 = 440.00;
const B4 = 493.88;
const C5 = 523.25;
const D5 = 587.33;
const E5 = 659.25;
const F5 = 698.46;
const G5 = 783.99;
const A5 = 880.00;

// Happy Birthday melody notes and gentle music-box timings
const BIRTHDAY_MELODY: NoteItem[] = [
  // Phrase 1: "Happy Birthday to you"
  { freq: G4, duration: 0.35, delay: 0.4 },
  { freq: G4, duration: 0.25, delay: 0.3 },
  { freq: A4, duration: 0.5, delay: 0.6 },
  { freq: G4, duration: 0.5, delay: 0.6 },
  { freq: C5, duration: 0.6, delay: 0.7 },
  { freq: B4, duration: 0.9, delay: 1.1 },

  // Phrase 2: "Happy Birthday to you"
  { freq: G4, duration: 0.35, delay: 0.4 },
  { freq: G4, duration: 0.25, delay: 0.3 },
  { freq: A4, duration: 0.5, delay: 0.6 },
  { freq: G4, duration: 0.5, delay: 0.6 },
  { freq: D5, duration: 0.6, delay: 0.7 },
  { freq: C5, duration: 0.9, delay: 1.1 },

  // Phrase 3: "Happy Birthday dear [Name]"
  { freq: G4, duration: 0.35, delay: 0.4 },
  { freq: G4, duration: 0.25, delay: 0.3 },
  { freq: G5, duration: 0.6, delay: 0.7 },
  { freq: E5, duration: 0.6, delay: 0.7 },
  { freq: C5, duration: 0.5, delay: 0.6 },
  { freq: B4, duration: 0.5, delay: 0.6 },
  { freq: A4, duration: 0.8, delay: 1.0 },

  // Phrase 4: "Happy Birthday to you"
  { freq: F5, duration: 0.35, delay: 0.4 },
  { freq: F5, duration: 0.25, delay: 0.3 },
  { freq: E5, duration: 0.6, delay: 0.7 },
  { freq: C5, duration: 0.6, delay: 0.7 },
  { freq: D5, duration: 0.6, delay: 0.7 },
  { freq: C5, duration: 1.2, delay: 2.2 }, // ending bell chime
];

class MusicBoxPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private timerId: number | null = null;
  private currentNoteIndex: number = 0;
  private onStateChangeCallbacks: Set<() => void> = new Set();

  constructor() {
    // AudioContext will be lazily created on user gesture
  }

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.32, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(callback: () => void) {
    this.onStateChangeCallbacks.add(callback);
    return () => {
      this.onStateChangeCallbacks.delete(callback);
    };
  }

  private notify() {
    this.onStateChangeCallbacks.forEach((cb) => cb());
  }

  /**
   * Synthesizes a music-box chime:
   * - Fundamental sine wave
   * - Overtone overtone (harmonic frequency)
   * - Very fast attack + long gentle exponential decay
   */
  private playMusicBoxNote(freq: number, duration: number) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;

    // Primary chime oscillator (Sine)
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic sparkle oscillator (Soft metallic overtone)
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2.01, now); // slight detune creates authentic metal comb shimmer

    // High shimmer oscillator (higher octave, very quiet)
    const osc3 = this.ctx.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(freq * 3.02, now);

    // Envelope gain nodes
    const noteGain1 = this.ctx.createGain();
    const noteGain2 = this.ctx.createGain();
    const noteGain3 = this.ctx.createGain();

    // Pluck attack & exponential ring
    noteGain1.gain.setValueAtTime(0.0001, now);
    noteGain1.gain.exponentialRampToValueAtTime(0.65, now + 0.006);
    noteGain1.gain.exponentialRampToValueAtTime(0.0001, now + duration + 1.2);

    noteGain2.gain.setValueAtTime(0.0001, now);
    noteGain2.gain.exponentialRampToValueAtTime(0.25, now + 0.004);
    noteGain2.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.8);

    noteGain3.gain.setValueAtTime(0.0001, now);
    noteGain3.gain.exponentialRampToValueAtTime(0.12, now + 0.004);
    noteGain3.gain.exponentialRampToValueAtTime(0.0001, now + duration + 0.5);

    // Connect nodes
    osc1.connect(noteGain1);
    osc2.connect(noteGain2);
    osc3.connect(noteGain3);

    noteGain1.connect(this.masterGain);
    noteGain2.connect(this.masterGain);
    noteGain3.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);

    const stopTime = now + duration + 1.4;
    osc1.stop(stopTime);
    osc2.stop(stopTime);
    osc3.stop(stopTime);
  }

  private scheduleNextNote() {
    if (!this.isPlaying) return;

    if (this.currentNoteIndex >= BIRTHDAY_MELODY.length) {
      // Loop after a gentle rest
      this.currentNoteIndex = 0;
      this.timerId = window.setTimeout(() => {
        this.scheduleNextNote();
      }, 1600);
      return;
    }

    const note = BIRTHDAY_MELODY[this.currentNoteIndex];
    this.playMusicBoxNote(note.freq, note.duration);
    this.currentNoteIndex++;

    this.timerId = window.setTimeout(() => {
      this.scheduleNextNote();
    }, note.delay * 1000);
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.scheduleNextNote();
    this.notify();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.32, this.ctx.currentTime);
    }
    this.notify();
    return this.isMuted;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.32, this.ctx.currentTime);
    }
    this.notify();
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }
}

export const musicBox = new MusicBoxPlayer();
