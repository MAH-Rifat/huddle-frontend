"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserCircleIcon,
  Mail01Icon,
  LockSync01Icon,
  EyeIcon,
  EyeOffIcon,
  HuddleBrandLogo,
} from "@/components/common/AuthIcons";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    consent: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData({ ...formData, mobile: val });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push(
        "/verify-otp?email=" +
          encodeURIComponent(formData.email || "partner@huddlebiz.com")
      );
    }, 600);
  };

  return (
    <main className="h-screen w-full bg-[#FFF9E6] flex items-center justify-center p-3 sm:p-4 lg:p-6 overflow-y-auto lg:overflow-hidden select-text">
      <div className="w-full max-w-[1360px] max-h-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12 xl:gap-20 2xl:gap-28 my-auto py-2">
        
        {/* Left Branding Section (Figma Node 110:8389) */}
        <section className="flex flex-col items-center justify-center text-center shrink-0 max-w-[420px] xl:max-w-[480px] w-full">
          {/* Huddle Logo */}
          <Link href="/" className="group block focus:outline-none" aria-label="Huddle Home">
            <HuddleBrandLogo className="transition-transform group-hover:scale-[1.02] duration-200" />
          </Link>

          {/* Portal Subtitle */}
          <h1 className="font-['Inter'] font-bold text-[22px] sm:text-[26px] lg:text-[30px] xl:text-[36px] text-black text-center leading-[1.25] mt-3 sm:mt-4 xl:mt-6 tracking-tight">
            Partner Portal
          </h1>
        </section>

        {/* Right Signup Card Section (Figma Node 102:2826) */}
        <section className="bg-white rounded-[20px] shadow-[0px_4px_30px_rgba(0,0,0,0.04)] border border-[#f3ebdc] w-full max-w-[540px] xl:max-w-[600px] 2xl:max-w-[640px] px-5 py-4 sm:px-8 sm:py-6 xl:px-10 xl:py-7 shrink-0">
          <div className="w-full flex flex-col gap-3 sm:gap-4 xl:gap-5">
            
            {/* Header (Figma Node 102:2830) */}
            <div className="flex flex-col items-center text-center">
              <h2 className="font-['Inter'] font-bold text-[22px] sm:text-[26px] lg:text-[28px] xl:text-[32px] text-black leading-[1.25] tracking-tight">
                Welcome! Sign Up!
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-2.5 xl:gap-3 w-full">
              
              {/* First Name (Figma Node 102:2834) */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="firstName"
                  className="font-['DM_Sans',sans-serif] font-semibold text-[13px] xl:text-[14px] leading-tight text-black"
                >
                  First name*
                </label>
                <div className="h-[40px] sm:h-[44px] xl:h-[48px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[10px] sm:px-[11px] gap-[7px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                  <UserCircleIcon className="w-5 h-5 xl:w-6 xl:h-6 shrink-0 text-[#637381]" />
                  <input
                    id="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    placeholder="Enter your first name"
                    className="font-['DM_Sans',sans-serif] font-normal text-[13px] xl:text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-normal"
                  />
                </div>
              </div>

              {/* Last Name (Figma Node 102:2878) */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="lastName"
                  className="font-['DM_Sans',sans-serif] font-semibold text-[13px] xl:text-[14px] leading-tight text-black"
                >
                  Last name*
                </label>
                <div className="h-[40px] sm:h-[44px] xl:h-[48px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[10px] sm:px-[11px] gap-[7px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                  <UserCircleIcon className="w-5 h-5 xl:w-6 xl:h-6 shrink-0 text-[#637381]" />
                  <input
                    id="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    placeholder="Enter your last name"
                    className="font-['DM_Sans',sans-serif] font-normal text-[13px] xl:text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-normal"
                  />
                </div>
              </div>

              {/* Email (Figma Node 102:2951) */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="email"
                  className="font-['DM_Sans',sans-serif] font-semibold text-[13px] xl:text-[14px] leading-tight text-black"
                >
                  Email*
                </label>
                <div className="h-[40px] sm:h-[44px] xl:h-[48px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[10px] sm:px-[11px] gap-[7px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                  <Mail01Icon className="w-5 h-5 xl:w-6 xl:h-6 shrink-0 text-[#637381]" />
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="Enter your email address"
                    className="font-['DM_Sans',sans-serif] font-normal text-[13px] xl:text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-normal"
                  />
                </div>
              </div>

              {/* Password (Figma Node 102:2842) */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="password"
                  className="font-['DM_Sans',sans-serif] font-semibold text-[13px] xl:text-[14px] leading-tight text-black"
                >
                  Password*
                </label>
                <div className="h-[40px] sm:h-[44px] xl:h-[48px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[10px] sm:px-[11px] gap-[6px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                  <LockSync01Icon className="w-5 h-5 xl:w-6 xl:h-6 shrink-0 text-[#637381]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="Choose a strong password"
                    className="font-['DM_Sans',sans-serif] font-normal text-[13px] xl:text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-normal"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-[#3D2513] hover:opacity-80 transition-opacity shrink-0 flex items-center justify-center focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOffIcon className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
                    ) : (
                      <EyeIcon className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password (Figma Node 102:2971) */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="confirmPassword"
                  className="font-['DM_Sans',sans-serif] font-semibold text-[13px] xl:text-[14px] leading-tight text-black"
                >
                  Confirm Password*
                </label>
                <div className="h-[40px] sm:h-[44px] xl:h-[48px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[10px] sm:px-[11px] gap-[6px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                  <LockSync01Icon className="w-5 h-5 xl:w-6 xl:h-6 shrink-0 text-[#637381]" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    placeholder="Retype password"
                    className="font-['DM_Sans',sans-serif] font-normal text-[13px] xl:text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-normal"
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
                      <EyeOffIcon className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
                    ) : (
                      <EyeIcon className="w-4 h-4 xl:w-[18px] xl:h-[18px]" />
                    )}
                  </button>
                </div>
              </div>

              {/* Mobile Number (Figma Node 102:2987) */}
              <div className="flex flex-col gap-1 w-full">
                <label
                  htmlFor="mobile"
                  className="font-['DM_Sans',sans-serif] font-semibold text-[13px] xl:text-[14px] leading-tight text-black"
                >
                  Mobile Number*
                </label>
                <div className="h-[40px] sm:h-[44px] xl:h-[48px] w-full rounded-[10px] border-[1.108px] border-[#391f10] bg-white flex items-center px-[10px] sm:px-[11px] transition-all focus-within:ring-2 focus-within:ring-[#ffbf00]/50 focus-within:border-[#391f10]">
                  <input
                    id="mobile"
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={handleMobileChange}
                    placeholder="+1-___-___-____"
                    className="font-['DM_Sans',sans-serif] font-normal text-[13px] xl:text-[14px] text-black placeholder-[#637381] bg-transparent outline-none w-full leading-normal"
                  />
                </div>
              </div>

              {/* Consent Checkbox (Figma Node 102:2853) */}
              <div className="pt-1 flex items-start gap-2 cursor-pointer">
                <input
                  id="consent"
                  type="checkbox"
                  required
                  checked={formData.consent}
                  onChange={(e) =>
                    setFormData({ ...formData, consent: e.target.checked })
                  }
                  className="mt-0.5 size-[15px] xl:size-[16px] rounded-[4px] border-[1.108px] border-[#655042] text-[#ffbf00] accent-[#ffbf00] cursor-pointer shrink-0"
                />
                <label
                  htmlFor="consent"
                  className="font-['DM_Sans',sans-serif] font-normal text-[11.5px] sm:text-[12.5px] xl:text-[13.5px] text-black leading-[1.35] cursor-pointer select-none"
                >
                  I Agree to huddle’s Consent for Documents, Terms of Use, and
                  Privacy Policy.
                </label>
              </div>

              {/* Submit Button (Figma Node 102:2859) */}
              <div className="pt-1 xl:pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-[44px] sm:h-[48px] xl:h-[50px] 2xl:h-[52px] bg-[#FFBF00] hover:bg-[#fabd00] active:scale-[0.99] rounded-[10px] drop-shadow-[0px_8px_12px_rgba(187,72,61,0.25)] flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  <span className="font-['Inter'] font-bold text-[13.5px] xl:text-[14px] leading-[24px] text-black text-center">
                    {isLoading ? "Signing up..." : "Login"}
                  </span>
                </button>
              </div>
            </form>

            {/* Bottom Sign In Navigation */}
            <div className="text-center pt-1 border-t border-[#f5efeb]">
              <p className="font-['DM_Sans',sans-serif] text-[12px] xl:text-[13px] text-[#637381]">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-black hover:text-[#ffbf00] transition-colors underline decoration-[#ffbf00]"
                >
                  Sign In
                </Link>
              </p>
            </div>

          </div>
        </section>

      </div>
    </main>
  );
}
