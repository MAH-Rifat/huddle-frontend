"use client";

import React from "react";

interface Step {
  id: number;
  label: string;
}

interface SubmitDealStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
}

export function SubmitDealStepper({
  steps,
  currentStep,
  onStepClick,
}: SubmitDealStepperProps) {
  return (
    <div className="lg:col-span-4 flex items-start justify-between py-2 pr-6 select-none">
      {/* Step Labels List */}
      <div className="flex flex-col gap-6 flex-1">
        {steps.map((step) => {
          const isCurrent = step.id === currentStep;
          const isCompleted = step.id < currentStep;

          return (
            <div
              key={step.id}
              onClick={() => step.id <= currentStep && onStepClick(step.id)}
              className={`transition-all ${isCurrent
                  ? "border border-[rgba(255,191,0,0.5)] bg-[rgba(255,191,0,0.06)] rounded-[8px] px-3.5 py-2 inline-flex self-start"
                  : "px-3.5 py-2"
                } ${step.id <= currentStep ? "cursor-pointer" : "cursor-default"}`}
            >
              <p
                className={`font-['Inter'] font-bold text-[18px] leading-tight ${isCurrent
                    ? "text-[#ffbf00]"
                    : isCompleted
                      ? "text-[#ffbf00]"
                      : "text-[#929292]"
                  }`}
              >
                {step.id}.{step.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Vertical Indicator Circles & Connector Lines */}
      <div className="flex flex-col items-center justify-between relative w-8 shrink-0 py-2">
        {steps.map((step, idx) => {
          const isCompleted = step.id < currentStep;
          const isCurrent = step.id === currentStep;

          return (
            <div
              key={step.id}
              className="relative z-10 flex items-center justify-center my-3.5"
            >
              {/* Connecting Line to next circle */}
              {idx < steps.length - 1 && (
                <div
                  className={`absolute top-6 w-[2px] h-[38px] z-0 ${step.id < currentStep ? "bg-[#ffbf00]" : "bg-[#e2e8f0]"
                    }`}
                />
              )}

              {/* Step Checkmark Circle (size-6 = 24px) */}
              <div className="size-6 flex items-center justify-center bg-white rounded-full relative z-10">
                {isCompleted || isCurrent ? (
                  <svg
                    className="size-6 text-[#ffbf00]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="12" cy="12" r="11" fill="#ffbf00" />
                    <path
                      d="M7.5 12L10.5 15L16.5 9"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    className="size-6 text-[#cbd5e1]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="11"
                      fill="#f1f5f9"
                      stroke="#e2e8f0"
                      strokeWidth="1"
                    />
                    <path
                      d="M7.5 12L10.5 15L16.5 9"
                      stroke="#94a3b8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
