import { Component, Input, OnChanges } from '@angular/core';

const COLORS = [
  '#ff4d6d',
  '#ffd166',
  '#06d6a0',
  '#4cc9f0',
  '#c77dff',
  '#ff9f1c',
  '#ffffff',
];

function seeded(seed: number): () => number {
  let value = (seed + 1) * 1103515245 + 12345;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

type ConfettiBit = {
  id: number;
  left: number;
  delay: number;
  color: string;
  rotate: number;
  duration: number;
  drift: number;
  shape: 'rect' | 'circle' | 'star';
};

@Component({
  selector: 'app-confetti-burst',
  templateUrl: './confetti-burst.component.html',
  styleUrl: './confetti-burst.component.scss',
})
export class ConfettiBurstComponent implements OnChanges {
  @Input({ required: true }) burstKey = 0;

  bits: ConfettiBit[] = [];

  ngOnChanges(): void {
    if (this.burstKey <= 0) {
      this.bits = [];
      return;
    }

    const random = seeded(this.burstKey);
    this.bits = Array.from({ length: 48 }, (_, id) => ({
      id,
      left: random() * 100,
      delay: random() * 0.25,
      color: COLORS[id % COLORS.length] ?? '#ffd166',
      rotate: random() * 360,
      duration: 0.9 + random() * 0.8,
      drift: -80 + random() * 160,
      shape: id % 5 === 0 ? 'star' : id % 3 === 0 ? 'circle' : 'rect',
    }));
  }
}
