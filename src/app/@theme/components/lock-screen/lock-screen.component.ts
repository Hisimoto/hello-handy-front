import { Component } from '@angular/core';

export interface Dot {
  cx: number;
  cy: number;
  id: number;
}

@Component({
  selector: 'app-lock-screen',
  templateUrl: './lock-screen.component.html',
  styleUrls: ['./lock-screen.component.scss']
})
export class LockScreenComponent {
  dots: Dot[] = [
    { cx: 50, cy: 50, id: 1},
    { cx: 150, cy: 50, id: 2},
    { cx: 250, cy: 50, id: 3},
    { cx: 50, cy: 150, id: 4},
    { cx: 150, cy: 150, id:5},
    { cx: 250, cy: 150, id: 6},
    { cx: 50, cy: 250, id: 7},
    { cx: 150, cy: 250, id: 8},
    { cx: 250, cy: 250, id: 9}
  ];

  selectedDots: Dot[] = [];

  lines: string[] = [];
  isView:boolean;

  selectDot(dot: Dot) {
    
    this.selectedDots.push(dot);
    if (this.selectedDots.length > 1) {
      const lastDot = this.selectedDots[this.selectedDots.length - 2];
      const currentDot = this.selectedDots[this.selectedDots.length - 1];
      this.lines.push(`M ${lastDot.cx},${lastDot.cy} L ${currentDot.cx},${currentDot.cy}`);
      if (typeof lastDot.cx === 'number' && typeof lastDot.cy === 'number') {
        // this.lines.push(`M ${lastDot.cx },${lastDot.cy} L ${lastDot.cx},${lastDot.cy}`);
        // this.lines.push(`M ${lastDot.cx},${lastDot.cy} L ${lastDot.cx + 10},${lastDot.cy + 10}`);
      }
    }
  }

  reset() {
    this.selectedDots = [];
    this.lines = [];
  }
}
