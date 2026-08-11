"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  ShieldCheck,
  Building2,
  ArrowRight,
  TrendingUp,
  FileCheck,
  ExternalLink,
  Sparkles,
  Layers,
  KeyRound,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/common/Badge";

export default function HomePage() {
  const portals = [
    {
      id: "partner",
      title: "Partner Portal",
      subtitle: "For Brokers, Originators & Sales Reps",
      desc: "Submit loan applications with AI OCR extraction, manage your team, generate trackable sales rep URLs, and track deals in real-time.",
      badge: "Broker Suite",
      badgeVariant: "blue" as const,
      icon: <Building2 className="h-6 w-6 text-brand-600" />,
      href: "/partner/dashboard",
      accent: "border-brand-200 hover:border-brand-500 hover:shadow-brand-500/10",
      features: [
        "Interactive Deals Pipeline & KPI Metrics",
        "5-Step Deal Wizard (Method A & B)",
        "Sales Rep Unique Application URLs",
        "Role & Permission Matrix",
      ],
    },
    {
      id: "admin",
      title: "Admin & Underwriting Portal",
      subtitle: "For Platform Admins & Underwriters",
      desc: "Review underwriting queues, inspect deep cashflow analytics, configure multi-tenant partner branding, and auto-match lenders.",
      badge: "Enterprise Underwriting",
      badgeVariant: "purple" as const,
      icon: <ShieldCheck className="h-6 w-6 text-indigo-600" />,
      href: "/admin/dashboard",
      accent: "border-indigo-200 hover:border-indigo-500 hover:shadow-indigo-500/10",
      features: [
        "Cashflow Reports & 30-Day Forecasts",
        "Bank Transaction Coverage (PDF/Plaid)",
        "Multi-Tenant Partner Creation Wizard",
        "P&L EBITDA Statement & Excel Export",
      ],
    },
    {
      id: "customer",
      title: "Customer & Borrower Portal",
      subtitle: "For Small Business Loan Applicants",
      desc: "5-step white-labeled loan origination process with company info, principal ownership, loan purpose pills, e-signature, and doc uploads.",
      badge: "Borrower Flow",
      badgeVariant: "success" as const,
      icon: <FileCheck className="h-6 w-6 text-emerald-600" />,
      href: "/apply",
      accent: "border-emerald-200 hover:border-emerald-500 hover:shadow-emerald-500/10",
      features: [
        "Step 1: Tell Us About Your Business",
        "Step 2: Owners (20%+ Principals)",
        "Step 3: Loan Purpose & Estimates",
        "Step 4: Digital E-Signature & Consent",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-surface-50 via-white to-surface-100 dark:from-surface-950 dark:to-surface-900">
      {/* Top Banner */}
      <header className="border-b border-surface-200 dark:border-surface-800 bg-white/70 dark:bg-surface-900/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-md">
              HB
            </div>
            <div>
              <span className="font-extrabold text-lg text-surface-900 dark:text-white tracking-tight">
                Huddle <span className="text-brand-600 font-semibold">(CapFlow)</span>
              </span>
              <p className="text-[11px] text-surface-500">Business Lending & Underwriting Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="outline" size="sm" leftIcon={<KeyRound className="h-3.5 w-3.5" />}>
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">
                Register
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-16 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Badge variant="blue" className="px-3 py-1 font-semibold text-xs">
            <Sparkles className="h-3.5 w-3.5" /> Production Ready Next.js Ecosystem
          </Badge>
          <h1 className="text-3xl md:text-5xl font-black text-surface-900 dark:text-surface-50 tracking-tight leading-tight">
            Unified Multi-Portal Lending & AI Underwriting Platform
          </h1>
          <p className="text-sm md:text-base text-surface-600 dark:text-surface-400">
            Select one of the three portals below to experience the complete workflow as designed in Figma.
          </p>
        </div>

        {/* 3 Portals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portals.map((portal) => (
            <div
              key={portal.id}
              className={`rounded-2xl p-6 bg-white dark:bg-surface-900 border transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between ${portal.accent}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-surface-100 dark:bg-surface-800">
                    {portal.icon}
                  </div>
                  <Badge variant={portal.badgeVariant}>{portal.badge}</Badge>
                </div>

                <div>
                  <h2 className="text-lg font-bold text-surface-900 dark:text-surface-50">
                    {portal.title}
                  </h2>
                  <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
                    {portal.subtitle}
                  </p>
                  <p className="text-xs text-surface-500 dark:text-surface-400 mt-2 leading-relaxed">
                    {portal.desc}
                  </p>
                </div>

                <div className="pt-2 border-t border-surface-100 dark:border-surface-800 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-surface-400">
                    Included Modules:
                  </p>
                  <ul className="space-y-1.5">
                    {portal.features.map((feat, idx) => (
                      <li key={idx} className="text-xs text-surface-600 dark:text-surface-300 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-surface-100 dark:border-surface-800">
                <Link href={portal.href} className="w-full">
                  <Button variant="primary" className="w-full justify-between group">
                    <span>Enter {portal.title}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Demo Deep Links Box */}
        <div className="rounded-2xl p-6 bg-gradient-to-r from-surface-900 to-brand-950 text-white border border-surface-800 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-brand-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="h-4 w-4" /> Live Dynamic Routing & Co-Branding Demo
              </span>
              <h3 className="text-base font-bold text-white mt-1">
                Trackable Sales Rep Referral Link Simulation
              </h3>
              <p className="text-xs text-surface-300 mt-0.5">
                Test how borrowers arrive at a custom branded application pre-attributed to a specific partner & rep:
              </p>
            </div>
            <Link href="/apply/abc-capital/jennifer-moore">
              <Button variant="brand" size="sm" rightIcon={<ExternalLink className="h-3.5 w-3.5" />}>
                Test Rep URL (/abc-capital/jennifer-moore)
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
