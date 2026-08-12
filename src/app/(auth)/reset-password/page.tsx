"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LockSync01Icon,
  EyeIcon,
  EyeOffIcon,
  HuddleBrandLogo,
} from "@/components/common/AuthIcons";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    }, 600);
  };

  return (
    <main className="h-screen w-full bg-[#FFF9E6] flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto lg:overflow-hidden select-text">
      <div className="w-full max-w-[1360px] max-h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 xl:gap-24 2xl:gap-[210px] my-auto py-2">
        
        {/* Left Branding Section (Figma Node 110:8998) */}
        <section className="flex flex-col items-center justify-center text-center shrink-0 max-w-[420px] xl:max-w-[490px] w-full">
          {/* Huddle Logo (Figma Node 110:8999) */}
          <Link href="/" className="group block focus:outline-none" aria-label="Huddle Home">
            <HuddleBrandLogo className="transition-transform group-hover:scale-[1.02] duration-200" />
          </Link>

          {/* Portal Subtitle (Figma Node 110:9000) */}
          <h1 className="font-['Inter'] font-bold text-[24px] sm:text-[28px] lg:text-[32px] xl:text-[36px] text-black text-center leading-[1.3] mt-4 sm:mt-6 xl:mt-[24px] tracking-tight">
            Partner Portal
          </h1>
        </section>

        {/* Right Reset Password Card Section (Figma Node 110:8937) */}
        <section className="bg-white rounded-[20px] shadow-[0px_4px_30px_rgba(0,0,0,0.04)] border border-[#f3ebdc] w-full max-w-[540px] xl:max-w-[601px] 2xl:max-w-[681px] p-6 sm:p-8 xl:p-[40px] shrink-0">
          <div className="w-full max-w-[601px] mx-auto flex flex-col items-center">
            
            {isSuccess ? (
              <div className="text-center py-8 space-y-3">
                <div className="size-14 rounded-full bg-[#FFBF00]/20 text-[#391f10] flex items-center justify-center mx-auto">
                  <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-['Inter'] font-bold text-[24px] text-black">
                  Password Reset Successfully!
                </h3>
                <p className="font-['DM_Sans',sans-serif] text-[14px] text-[#454f5b]">
                  Redirecting you to sign in...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8 xl:gap-[66px] items-center w-full">
                
                {/* Header & Inputs Section (Figma Node 110:8940) */}
                <div className="flex flex-col gap-4 sm:gap-5 xl:gap-[26px] items-center w-full">
                  
                  {/* Title & Description (Figma Node 110:8941) */}
                  <div className="flex flex-col items-center text-center">
                    <h2 className="font-['Inter'] font-bold text-[28px] sm:text-[36px] lg:text-[42px] xl:text-[48px] text-black leading-[1.25] tracking-tight mb-1 sm:mb-2">
                      Reset Password
                    </h2>
                    <div className="font-['DM_Sans',sans-serif] font-normal text-[14px] sm:text-[16px] leading-normal text-[#454f5b] max-w-[427px]">
                      <p className="mb-0">You are all set.</p>
                      <p>Now it’s time to create a new password.</p>
                    </div>
                  </div>

                  {/* Password Inputs Container (Figma Node 110:8944) */}
                  <div className="flex flex-col gap-3 sm:gap-4 xl:gap-[24px] items-start w-full">
                    
                    {/* New Password (Figma Node 110:8945) */}
                    <div className="flex flex-col gap-[6px] items-start w-full">
                      <label
                        htmlFor="newPassword"
                        className="font-['DM_Sans',sans-serif] font-semibold text-[14px] leading-[1.5] text-black"
                      >
                        New Password*
                      </label>
                      <div className="h-[46px] sm:h-[48px] xl:h-[50px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[11.1px] gap-[6px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                        <LockSync01Icon className="w-6 h-6 shrink-0 text-[#637381]" />
                        <input
                          id="newPassword"
                          type={showPassword ? "text" : "password"}
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
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

                    {/* Confirm Password (Figma Node 110:8956) */}
                    <div className="flex flex-col gap-[6px] items-start w-full">
                      <label
                        htmlFor="confirmPassword"
                        className="font-['DM_Sans',sans-serif] font-semibold text-[14px] leading-[1.5] text-black"
                      >
                        Confirm Password*
                      </label>
                      <div className="h-[46px] sm:h-[48px] xl:h-[50px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[11.1px] gap-[6px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                        <LockSync01Icon className="w-6 h-6 shrink-0 text-[#637381]" />
                        <input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Enter password"
                          className="font-['DM_Sans',sans-serif] font-normal text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-[1.4]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="p-1 text-[#3D2513] hover:opacity-80 transition-opacity shrink-0 flex items-center justify-center focus:outline-none"
                          aria-label={
                            showConfirmPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOffIcon className="w-[18px] h-[18px]" />
                          ) : (
                            <EyeIcon className="w-[18px] h-[18px]" />
                          )}
                        </button>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Reset Password Button (Figma Node 110:8967) */}
                <div className="w-full">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-[48px] sm:h-[52px] xl:h-[54px] bg-[#FFBF00] hover:bg-[#fabd00] active:scale-[0.99] rounded-[10px] drop-shadow-[0px_8px_12px_rgba(187,72,61,0.25)] flex items-center justify-center px-[26px] py-[14px] transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    <span className="font-['Inter'] font-bold text-[15px] sm:text-[16px] leading-[26px] text-black text-center tracking-[0.5px]">
                      {isLoading ? "Resetting..." : "Reset Password"}
                    </span>
                  </button>
                </div>

              </form>
            )}

          </div>
        </section>

      </div>
    </main>
  );
}
