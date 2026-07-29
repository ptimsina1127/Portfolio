import { Component, input, output, HostListener } from '@angular/core';

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  component: string;
  active: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

@Component({
  selector: 'xp-window',
  standalone: true,
  template: `
    <div
      class="xp-window"
      [class.maximized]="state().maximized"
      [style.left.px]="state().maximized ? 0 : state().x"
      [style.top.px]="state().maximized ? 0 : state().y"
      [style.width.px]="state().maximized ? undefined : state().width"
      [style.height.px]="state().maximized ? undefined : state().height"
      [style.width.%]="state().maximized ? 100 : undefined"
      [style.height.%]="state().maximized ? 100 : undefined"
      [style.z-index]="state().zIndex"
      (mousedown)="focusWindow()"
    >
      <div
        class="xp-window-titlebar"
        [class.inactive]="!state().active"
        (mousedown)="startDrag($event)"
      >
        <span class="xp-window-title">
          {{ state().icon }} {{ state().title }}
        </span>
        <div class="xp-window-controls">
          <button class="xp-window-btn" (mousedown)="$event.stopPropagation()" (click)="onMinimize()">_</button>
          <button class="xp-window-btn" (mousedown)="$event.stopPropagation()" (click)="onToggleMaximize()">
            {{ state().maximized ? '❐' : '□' }}
          </button>
          <button class="xp-window-btn close" (mousedown)="$event.stopPropagation()" (click)="onClose()">✕</button>
        </div>
      </div>

      <div class="xp-window-body" [style.display]="state().minimized ? 'none' : 'block'">
        <ng-content />
      </div>

      @if (showStatus()) {
        <div class="xp-window-statusbar"></div>
      }

      @if (!state().maximized) {
        <div class="xp-window-resize" (mousedown)="startResize($event)"></div>
      }
    </div>
  `,
})
export class XpWindowComponent {
  readonly state = input.required<WindowState>();
  readonly showStatus = input(false);
  readonly close = output<void>();
  readonly minimize = output<void>();
  readonly toggleMaximize = output<void>();
  readonly focus = output<void>();
  readonly move = output<{ x: number; y: number }>();
  readonly resize = output<{ width: number; height: number }>();

  onClose() { this.close.emit(); }
  onMinimize() { this.minimize.emit(); }
  onToggleMaximize() { this.toggleMaximize.emit(); }

  private dragging = false;
  private resizing = false;
  private dragStartX = 0;
  private dragStartY = 0;
  private dragOrigX = 0;
  private dragOrigY = 0;
  private resizeOrigW = 0;
  private resizeOrigH = 0;

  focusWindow() {
    this.focus.emit();
  }

  startDrag(e: MouseEvent) {
    if (this.state().maximized) return;
    this.dragging = true;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
    this.dragOrigX = this.state().x;
    this.dragOrigY = this.state().y;
  }

  startResize(e: MouseEvent) {
    e.stopPropagation();
    this.resizing = true;
    this.resizeOrigW = this.state().width;
    this.resizeOrigH = this.state().height;
    this.dragStartX = e.clientX;
    this.dragStartY = e.clientY;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    if (this.dragging) {
      const dx = e.clientX - this.dragStartX;
      const dy = e.clientY - this.dragStartY;
      this.move.emit({ x: this.dragOrigX + dx, y: this.dragOrigY + dy });
    }
    if (this.resizing) {
      const dw = e.clientX - this.dragStartX;
      const dh = e.clientY - this.dragStartY;
      this.resize.emit({
        width: Math.max(250, this.resizeOrigW + dw),
        height: Math.max(150, this.resizeOrigH + dh),
      });
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.dragging = false;
    this.resizing = false;
  }
}
