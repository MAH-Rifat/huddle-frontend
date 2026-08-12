"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail01Icon,
  LockSync01Icon,
  EyeIcon,
  EyeOffIcon,
  HuddleBrandLogo,
} from "@/components/common/AuthIcons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/partner/dashboard");
    }, 600);
  };

  return (
    <main className="h-screen w-full bg-[#FFF9E6] flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto lg:overflow-hidden select-text">
      <div className="w-full max-w-[1360px] max-h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24 2xl:gap-[210px] my-auto py-2">
        
        {/* Left Branding Section (Figma Node 110:8986) */}
        <section className="flex flex-col items-center justify-center text-center shrink-0 max-w-[420px] xl:max-w-[490px] w-full">
          {/* Huddle Logo (Figma Node 110:8987) */}
          <Link href="/" className="group block focus:outline-none" aria-label="Huddle Home">
            <HuddleBrandLogo className="transition-transform group-hover:scale-[1.02] duration-200" />
          </Link>

          {/* Portal Subtitle (Figma Node 110:8988) */}
          <h1 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[36px] text-black text-center leading-[1.3] mt-4 sm:mt-6 xl:mt-[24px] tracking-tight">
            Partner Portal
          </h1>
        </section>

        {/* Right Sign In Card Section (Figma Node 110:8710) */}
        <section className="bg-white rounded-[20px] shadow-[0px_4px_30px_rgba(0,0,0,0.04)] border border-[#f3ebdc] w-full max-w-[540px] xl:max-w-[601px] 2xl:max-w-[681px] p-6 sm:p-8 xl:p-[40px] shrink-0">
          <div className="w-full max-w-[601px] mx-auto flex flex-col items-center">
            <div className="flex flex-col gap-[20px] xl:gap-[24px] items-end w-full">
              
              {/* Top Header & Email Container (Figma Node 110:8713) */}
              <div className="flex flex-col gap-[20px] xl:gap-[26px] items-center w-full">
                
                {/* Header (Figma Node 110:8714) */}
                <div className="flex flex-col items-center text-center w-full">
                  <h2 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[36px] text-black leading-[1.3] tracking-tight">
                    Welcome, please sign in
                  </h2>
                </div>

                {/* Email Field Container (Figma Node 110:8716) */}
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

              {/* Password & Forgot Password Container (Figma Node 110:8724) */}
              <div className="flex flex-col gap-[10px] xl:gap-[12px] items-end w-full">
                
                {/* Password Field (Figma Node 110:8725) */}
                <div className="flex flex-col items-start w-full">
                  <div className="flex flex-col gap-[6px] items-start w-full">
                    <label
                      htmlFor="password"
                      className="font-['DM_Sans',sans-serif] font-semibold text-[14px] leading-[1.5] text-black"
                    >
                      Password*
                    </label>
                    <div className="h-[46px] sm:h-[48px] xl:h-[50px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[11.1px] gap-[6px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                      <LockSync01Icon className="w-6 h-6 shrink-0 text-[#637381]" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-[1.4]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 text-[#3D2513] hover:opacity-80 transition-opacity shrink-0 flex items-center justify-center focus:outline-none"
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-[18px] h-[18px]" />
                        ) : (
                          <EyeIcon className="w-[18px] h-[18px]" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Forgot Password Link (Figma Node 110:8737) */}
                <Link
                  href="/forgot-password"
                  className="font-['DM_Sans',sans-serif] font-semibold text-[14px] leading-[1.5] text-[#bb483d] hover:text-[#9e3a30] transition-colors text-right"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button (Figma Node 110:8738) */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full h-[48px] sm:h-[50px] xl:h-[52px] bg-[#FFBF00] hover:bg-[#fabd00] active:scale-[0.99] rounded-[10px] drop-shadow-[0px_8px_12px_rgba(187,72,61,0.25)] flex items-center justify-center px-[26px] py-[14px] transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
              >
                <span className="font-['Inter'] font-bold text-[14px] leading-[24px] text-black text-center">
                  {isLoading ? "Signing in..." : "Login"}
                </span>
              </button>

            </div>

            {/* Bottom Sign Up Navigation */}
            <div className="text-center pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-[#f5efeb] w-full">
              <p className="font-['DM_Sans',sans-serif] text-[13px] text-[#637381]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-black hover:text-[#ffbf00] transition-colors underline decoration-[#ffbf00]"
                >
                  Sign Up
                </Link>
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
