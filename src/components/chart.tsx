import { useRef } from 'react';

interface Point {
  x: number;
  y: number;
}

interface Vector {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

interface CanvasChartProps {
  canvasRef?: any;
  width?: number;
  height?: number;
  domain?: Vector;
}

export const useCanvasChart = (props?: CanvasChartProps) => {
  const canvasRef = useRef<any>();
  const canvasContextRef = useRef<CanvasRenderingContext2D>();
  let { width, height, domain } = props || {};
  if (!width) width = 1024;
  if (!height) height = 300;
  if (!domain) domain = { x1: 0, y1: 0, x2: width, y2: height };

  const scaleX = (pos: number) => {
    if (!domain || !width) throw new Error();
    return ((pos - domain.x1) / (domain.x2 - domain.x1)) * width;
  };
  const scaleY = (pos: number) => {
    if (!domain || !height) throw new Error();
    return ((pos - domain.y1) / (domain.y2 - domain.y1)) * height;
  };

  const getCanvasContext = () => {
    if (!canvasContextRef.current && canvasRef.current) canvasContextRef.current = canvasRef.current.getContext('2d');
    return canvasContextRef.current;
  };

  return {
    canvasRef,
    width,
    height,
    getCanvasContext,
    setDomain: (newDomain: Vector) => {
      domain = newDomain;
    },
    clear: () => {
      const ctx = getCanvasContext();
      if (!ctx || !width || !height) return;
      ctx.clearRect(0, 0, width, height);
    },
    line: (line: Vector, color = 'gray') => {
      const ctx = getCanvasContext();
      if (!ctx) return;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(scaleX(line.x1), scaleY(line.y1));
      ctx.lineTo(scaleX(line.x2), scaleY(line.y2));
      ctx.stroke();
    },
    rect: (rect: Vector, color = 'gray') => {
      const ctx = getCanvasContext();
      if (!ctx) return;
      ctx.fillStyle = color;
      ctx.fillRect(
        scaleX(rect.x1),
        scaleY(rect.y1),
        scaleX(rect.x2) - scaleX(rect.x1),
        scaleY(rect.y2) - scaleY(rect.y1),
      );
    },
    circle: (center: Point, radius = 5, color = 'gray') => {
      const ctx = getCanvasContext();
      if (!ctx) return;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(scaleX(center.x), scaleY(center.y), radius, 0, 2 * Math.PI);
      ctx.stroke();
    },
    text: (start: Point, text: string, color = 'gray', font = '8px Arial') => {
      const ctx = getCanvasContext();
      if (!ctx) return;
      ctx.fillStyle = color;
      ctx.font = font;

      ctx.fillText(text, scaleX(start.x), scaleY(start.y));
    },
  };
};

export const CanvasChart = ({ width, height, canvasRef }: CanvasChartProps) => {
  return <canvas ref={canvasRef} width={width} height={height} style={{ border: '1px dashed gray' }} />;
};
