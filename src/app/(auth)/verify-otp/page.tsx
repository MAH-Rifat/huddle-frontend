"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { HuddleBrandLogo } from "@/components/common/AuthIcons";

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full bg-[#FFF9E6] flex items-center justify-center text-xs text-[#637381]">
          Loading OTP Verification...
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "example@email.com";

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
    const cleaned = value.replace(/\D/g, "");
    if (cleaned.length > 1) {
      // Handle multi-character paste or input
      const newOtp = [...otp];
      const chars = cleaned.slice(0, 6).split("");
      chars.forEach((char, i) => {
        if (index + i < 6) newOtp[index + i] = char;
      });
      setOtp(newOtp);
      const nextIndex = Math.min(index + chars.length, 5);
      inputsRef.current[nextIndex]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleaned;
    setOtp(newOtp);

    // Auto-focus next input
    if (cleaned && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const focusIdx = Math.min(pasted.length, 5);
    inputsRef.current[focusIdx]?.focus();
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/reset-password?email=" + encodeURIComponent(email));
    }, 600);
  };

  return (
    <main className="h-screen w-full bg-[#FFF9E6] flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto lg:overflow-hidden select-text">
      <div className="w-full max-w-[1360px] max-h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24 2xl:gap-[210px] my-auto py-2">
        
        {/* Left Branding Section (Figma Node 110:8994) */}
        <section className="flex flex-col items-center justify-center text-center shrink-0 max-w-[420px] xl:max-w-[490px] w-full">
          {/* Huddle Logo (Figma Node 110:8995) */}
          <Link href="/" className="group block focus:outline-none" aria-label="Huddle Home">
            <HuddleBrandLogo className="transition-transform group-hover:scale-[1.02] duration-200" />
          </Link>

          {/* Portal Subtitle (Figma Node 110:8996) */}
          <h1 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[36px] text-black text-center leading-[1.3] mt-4 sm:mt-6 xl:mt-[24px] tracking-tight">
            Partner Portal
          </h1>
        </section>

        {/* Right Verify OTP Card Section (Figma Node 110:8863) */}
        <section className="bg-white rounded-[20px] shadow-[0px_4px_30px_rgba(0,0,0,0.04)] border border-[#f3ebdc] w-full max-w-[540px] xl:max-w-[601px] 2xl:max-w-[681px] p-6 sm:p-8 xl:p-[40px] shrink-0">
          <div className="w-full max-w-[601px] mx-auto flex flex-col items-center">
            
            <form onSubmit={handleVerify} className="flex flex-col gap-6 sm:gap-8 xl:gap-[66px] items-center w-full">
              
              {/* Header & OTP Input Section (Figma Node 110:8866) */}
              <div className="flex flex-col gap-4 sm:gap-5 xl:gap-[26px] items-center w-full">
                
                {/* Title & Description (Figma Node 110:8867) */}
                <div className="flex flex-col items-center text-center">
                  <h2 className="font-['Inter'] font-bold text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] text-black leading-[1.25] tracking-tight mb-1 sm:mb-2">
                    Verify OTP
                  </h2>
                  <p className="font-['DM_Sans',sans-serif] font-normal text-[13px] sm:text-[14px] leading-[1.4] text-[#454f5b] max-w-[427px]">
                    We have sent you a 6 digit OTP code to your provided{" "}
                    <span className="text-[#c5765b] font-medium">Email:{email}</span>
                    {" "}please input that code here to proceed.
                  </p>
                </div>

                {/* Timer & Input Boxes (Figma Node 110:8870) */}
                <div className="flex flex-col gap-3 sm:gap-4 xl:gap-[20px] items-center w-full">
                  {/* Timer Display (Figma Node 110:8871) */}
                  <p className="font-['Inter'] font-normal text-[15px] sm:text-[16px] text-[#fe2929] text-center leading-[1.5]">
                    {formatTimer(timeLeft)}
                  </p>

                  {/* 6 Digit Input Group (Figma Node 110:8872) */}
                  <div className="flex gap-2 sm:gap-[8px] items-center justify-center">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={(el) => {
                          inputsRef.current[idx] = el;
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        onPaste={handlePaste}
                        placeholder="-"
                        className="size-[38px] sm:size-[44px] xl:size-[46px] bg-[#fff8ee] border border-[#624d3b] rounded-[8px] text-center font-['Public_Sans',sans-serif] font-semibold text-[16px] sm:text-[18px] text-black placeholder-[#919eab] outline-none transition-all focus:ring-2 focus:ring-[#ffbf00]/50 focus:border-[#624d3b]"
                      />
                    ))}
                  </div>
                </div>

              </div>

              {/* Action Buttons Row (Figma Node 110:8885) */}
              <div className="flex gap-[11px] items-center w-full">
                {/* Verify Button (Figma Node 110:8886) */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-[48px] sm:h-[52px] xl:h-[55px] bg-[#FFBF00] hover:bg-[#fabd00] active:scale-[0.99] rounded-[10px] drop-shadow-[0px_8px_12px_rgba(244,210,66,0.18)] flex items-center justify-center px-[26px] py-[14px] transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <span className="font-['Inter'] font-bold text-[15px] sm:text-[16px] leading-[26px] text-black text-center tracking-[0.5px]">
                    {isLoading ? "Verifying..." : "Verify"}
                  </span>
                </button>

                {/* Cancel Button (Figma Node 110:8888) */}
                <Link
                  href="/login"
                  className="flex-1 h-[48px] sm:h-[52px] xl:h-[55px] bg-[#f4f6f8] hover:bg-[#eaecef] active:scale-[0.99] border border-[#897766] rounded-[10px] flex items-center justify-center px-[27px] py-[15px] transition-all duration-200"
                >
                  <span className="font-['Inter'] font-bold text-[15px] sm:text-[16px] leading-[26px] text-[#637381] text-center tracking-[0.5px]">
                    Cancel
                  </span>
                </Link>
              </div>

            </form>

          </div>
        </section>

      </div>
    </main>
  );
}
