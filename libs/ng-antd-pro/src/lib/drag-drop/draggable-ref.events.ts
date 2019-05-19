import { DraggableRef } from './draggable-ref';

interface Point {
  x: number;
  y: number;
}

export interface DragRefStartEvent {
  source: DraggableRef,
  pointerPosition: Point,
}

export interface DragRefMoveEvent {
  source: DraggableRef;
  pointerPosition: Point;
  event: MouseEvent | TouchEvent;
  delta: { x: -1 | 0 | 1, y: -1 | 0 | 1 };
}

export interface DragRefEndEvent {
  source: DraggableRef
}