"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Clock } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-surface-400">Loading OTP Verification...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "j.moore@abccapital.com";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(179); // 2:59
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/reset-password");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="h-12 w-12 rounded-2xl bg-brand-600 flex items-center justify-center font-black text-xl text-white shadow-lg">
            HB
          </div>
        </Link>
        <h2 className="text-2xl font-black text-surface-900 dark:text-surface-50 tracking-tight">
          Verify OTP
        </h2>
        <p className="text-xs text-surface-500 max-w-sm mx-auto leading-relaxed">
          We have sent a 6-digit OTP code to your provided email:{" "}
          <span className="font-semibold text-surface-900 dark:text-surface-100">{email}</span>.
          Please input that code below to proceed.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-surface-900 py-8 px-6 shadow-xl border border-surface-200 dark:border-surface-800 rounded-3xl sm:px-10 text-center">
          {/* Live Timer */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-100 dark:bg-surface-800 text-xs font-semibold text-surface-700 dark:text-surface-300 mb-6">
            <Clock className="h-3.5 w-3.5 text-brand-600 animate-pulse" />
            <span>Expires in: {formatTimer(timeLeft)}</span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* 6-box input */}
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => {
                    inputsRef.current[idx] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-11 h-12 text-center text-lg font-bold bg-surface-50 dark:bg-surface-800 border-2 border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:border-brand-600 focus:ring-4 focus:ring-brand-100 text-surface-900 dark:text-surface-50 transition-all"
                />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                className="h-11 text-xs font-bold"
                isLoading={isLoading}
              >
                Verify Code
              </Button>
              <Link href="/login" className="w-full">
                <Button type="button" variant="secondary" className="w-full h-11 text-xs font-bold">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>

          <p className="text-xs text-surface-400 mt-6">
            Didn&apos;t receive code?{" "}
            <button
              type="button"
              onClick={() => setTimeLeft(179)}
              className="text-brand-600 font-bold hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
