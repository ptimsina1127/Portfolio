import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SoundService {
  private ctx: AudioContext | null = null;
  private buffers: Record<string, AudioBuffer> = {};

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  private async loadBuffer(name: string, url: string): Promise<AudioBuffer> {
    if (this.buffers[name]) return this.buffers[name];
    const ctx = this.getContext();
    const resp = await fetch(url);
    const arrayBuf = await resp.arrayBuffer();
    const buf = await ctx.decodeAudioData(arrayBuf);
    this.buffers[name] = buf;
    return buf;
  }

  private playBuffer(buf: AudioBuffer) {
    const ctx = this.getContext();
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start();
  }

  async playLogin() {
    const buf = await this.loadBuffer('logon', 'assets/xp-logon.wav');
    this.playBuffer(buf);
  }

  async playLogoff() {
    const buf = await this.loadBuffer('logoff', 'assets/xp-logoff.wav');
    this.playBuffer(buf);
  }
}
