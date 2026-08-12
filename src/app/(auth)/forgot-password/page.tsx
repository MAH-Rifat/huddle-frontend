"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail01Icon,
  HuddleBrandLogo,
} from "@/components/common/AuthIcons";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-otp?email=" + encodeURIComponent(email || "example@email.com"));
    }, 600);
  };

  return (
    <main className="h-screen w-full bg-[#FFF9E6] flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto lg:overflow-hidden select-text">
      <div className="w-full max-w-[1360px] max-h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24 2xl:gap-[210px] my-auto py-2">
        
        {/* Left Branding Section (Figma Node 110:8990) */}
        <section className="flex flex-col items-center justify-center text-center shrink-0 max-w-[420px] xl:max-w-[490px] w-full">
          {/* Huddle Logo (Figma Node 110:8991) */}
          <Link href="/" className="group block focus:outline-none" aria-label="Huddle Home">
            <HuddleBrandLogo className="transition-transform group-hover:scale-[1.02] duration-200" />
          </Link>

          {/* Portal Subtitle (Figma Node 110:8992) */}
          <h1 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[36px] text-black text-center leading-[1.3] mt-4 sm:mt-6 xl:mt-[24px] tracking-tight">
            Partner Portal
          </h1>
        </section>

        {/* Right Forgot Password Card Section (Figma Node 110:8777) */}
        <section className="bg-white rounded-[20px] shadow-[0px_4px_30px_rgba(0,0,0,0.04)] border border-[#f3ebdc] w-full max-w-[540px] xl:max-w-[601px] 2xl:max-w-[681px] p-6 sm:p-8 xl:p-[40px] shrink-0">
          <div className="w-full max-w-[601px] mx-auto flex flex-col items-center">
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 xl:gap-[66px] items-center w-full">
              
              {/* Header & Email Section (Figma Node 110:8782) */}
              <div className="flex flex-col gap-4 sm:gap-5 xl:gap-[26px] items-center w-full">
                
                {/* Title & Description (Figma Node 110:8783) */}
                <div className="flex flex-col items-center text-center">
                  <h2 className="font-['Inter'] font-bold text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] text-black leading-[1.25] tracking-tight mb-1 sm:mb-2">
                    Forgot Password!
                  </h2>
                  <p className="font-['DM_Sans',sans-serif] font-normal text-[13px] sm:text-[14px] leading-[1.4] text-[#454f5b] max-w-[427px]">
                    Do you forgot your password. It’s ease to reset, just provide your email address. We’ll send you a OTP code.
                  </p>
                </div>

                {/* Email Input Field (Figma Node 110:8786) */}
                <div className="flex flex-col items-start w-full">
                  <div className="flex flex-col gap-[6px] items-start w-full">
                    <label
                      htmlFor="email"
                      className="font-['DM_Sans',sans-serif] font-semibold text-[14px] leading-[1.5] text-black"
                    >
                      Email*
                    </label>
                    <div className="h-[46px] sm:h-[48px] xl:h-[50px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[11.1px] gap-[7px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                      <Mail01Icon className="w-6 h-6 shrink-0 text-[#637381]" />
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-[1.4]"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons Row (Figma Node 110:8794) */}
              <div className="flex gap-[11px] items-center w-full">
                {/* Send OTP Button (Figma Node 110:8795) */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 h-[48px] sm:h-[52px] xl:h-[55px] bg-[#FFBF00] hover:bg-[#fabd00] active:scale-[0.99] rounded-[10px] drop-shadow-[0px_8px_12px_rgba(244,210,66,0.18)] flex items-center justify-center px-[26px] py-[14px] transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <span className="font-['Inter'] font-bold text-[15px] sm:text-[16px] leading-[26px] text-black text-center tracking-[0.5px]">
                    {isLoading ? "Sending..." : "Send OTP"}
                  </span>
                </button>

                {/* Cancel Button (Figma Node 110:8797) */}
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
