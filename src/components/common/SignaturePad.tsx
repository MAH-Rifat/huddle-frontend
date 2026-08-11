"use client";

import React, { useRef, useState, useEffect } from "react";
import { Eraser, Check } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface SignaturePadProps {
  label: string;
  onSave?: (dataUrl: string) => void;
  className?: string;
}

export function SignaturePad({ label, onSave, className }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, []);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (canvasRef.current && hasSignature && onSave) {
      onSave(canvasRef.current.toDataURL());
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-surface-700 dark:text-surface-300">
          {label}
        </label>
        {hasSignature && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
            <Check className="h-3 w-3" /> Signed
          </span>
        )}
      </div>

      <div className="relative rounded-xl border-2 border-dashed border-surface-300 dark:border-surface-700 bg-surface-50/70 dark:bg-surface-900 overflow-hidden group">
        {!hasSignature && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-surface-400 text-xs font-medium tracking-wide">
            ✍️ Click or touch here to sign
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={400}
          height={120}
          className="w-full h-28 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {hasSignature && (
          <button
            type="button"
            onClick={clear}
            className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-white/90 dark:bg-surface-800 shadow-sm border border-surface-200 text-surface-500 hover:text-rose-600 transition-colors"
            title="Clear signature"
          >
            <Eraser className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
