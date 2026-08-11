"use client";

import React from "react";
import { CheckCircle2, Circle } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

interface SubmitDealVerticalStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

export function SubmitDealVerticalStepper({
  steps,
  currentStep,
  onStepClick,
}: SubmitDealVerticalStepperProps) {
  return (
    <div className="flex gap-6 w-full">
      {/* Step Labels */}
      <div className="flex flex-col justify-between py-2 space-y-8 flex-1">
        {steps.map((step) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick && onStepClick(step.id)}
              className={`cursor-pointer transition-all ${
                isCurrent
                  ? "bg-[rgba(255,191,0,0.08)] border border-[rgba(255,191,0,0.32)] px-4 py-2.5 rounded-[8px] shadow-xs"
                  : "px-4 py-2.5"
              }`}
            >
              <p
                className={`font-['Inter'] font-bold text-[18px] leading-tight ${
                  isCurrent
                    ? "text-[#ffbf00]"
                    : isCompleted
                    ? "text-black"
                    : "text-[#929292]"
                }`}
              >
                {step.id}.{step.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Vertical Indicator Line & Icons */}
      <div className="flex flex-col items-center justify-between py-4 relative w-10 shrink-0">
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div key={step.id} className="relative z-10 flex items-center justify-center">
              {isCompleted ? (
                <div className="size-6 rounded-full bg-[#00d492] text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="size-4" />
                </div>
              ) : isCurrent ? (
                <div className="size-6 rounded-full bg-[#ffbf00] text-black font-bold text-xs flex items-center justify-center shadow-xs">
                  {step.id}
                </div>
              ) : (
                <div className="size-6 rounded-full bg-neutral-200 text-neutral-500 font-bold text-xs flex items-center justify-center">
                  {step.id}
                </div>
              )}

              {/* Connecting Line to next step */}
              {idx < steps.length - 1 && (
                <div
                  className={`absolute top-6 w-[2px] h-[52px] ${
                    step.id < currentStep ? "bg-[#00d492]" : "bg-neutral-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
