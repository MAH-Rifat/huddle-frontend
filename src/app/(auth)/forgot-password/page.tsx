"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/common/Button";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verify-otp?email=" + encodeURIComponent(email || "user@example.com"));
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
          Forgot Password!
        </h2>
        <p className="text-xs text-surface-500 max-w-sm mx-auto">
          It&apos;s easy to reset, just provide your email address. We&apos;ll send you an OTP code.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white dark:bg-surface-900 py-8 px-6 shadow-xl border border-surface-200 dark:border-surface-800 rounded-3xl sm:px-10">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-surface-700 dark:text-surface-300">
                Email*
              </label>
              <div className="mt-1 relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-surface-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  className="block w-full pl-10 pr-4 py-2.5 text-xs bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-surface-900 dark:text-surface-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                type="submit"
                variant="primary"
                className="h-11 text-xs font-bold"
                isLoading={isLoading}
              >
                Send OTP
              </Button>
              <Link href="/login" className="w-full">
                <Button type="button" variant="secondary" className="w-full h-11 text-xs font-bold">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
