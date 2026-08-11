"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Card } from "@/components/common/Card";
import { Button } from "@/components/common/Button";
import { Stepper } from "@/components/common/Stepper";
import { PartnerBrandEditor } from "@/components/portal-admin/PartnerBrandEditor";
import { useApp } from "@/context/AppContext";

export default function CreatePartnerWizardPage() {
  const router = useRouter();
  const { addPartner } = useApp();

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "Harvest Business Capital",
    slug: "harvest",
    primaryContactName: "Angela Reed",
    primaryContactEmail: "a.reed@harvest.com",
    primaryContactPhone: "+1 (415) 555-0500",
    brandColor: "#b45309",
    logoAbbr: "HBC",
    welcomeTitle: "Welcome to Harvest Business Capital Portal",
    adminName: "Angela Reed",
    adminEmail: "a.reed@harvest.com",
    adminRole: "Portal Admin",
  });

  const steps = [
    { id: 0, label: "Organization" },
    { id: 1, label: "Branding & Colors" },
    { id: 2, label: "Admin User" },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      addPartner({
        name: formData.name,
        slug: formData.slug.toLowerCase().replace(/\s+/g, "-"),
        brandColor: formData.brandColor,
        logoAbbr: formData.logoAbbr,
        welcomeTitle: formData.welcomeTitle,
        portalUrl: `https://portal.capflow.io/${formData.slug}`,
        applyBaseUrl: `https://apply.capflow.io/${formData.slug}`,
        primaryContactName: formData.primaryContactName,
        primaryContactEmail: formData.primaryContactEmail,
        primaryContactPhone: formData.primaryContactPhone,
        status: "Active",
      });
      setIsSubmitting(false);
      router.push("/admin/partners");
    }, 700);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/admin/partners">
          <Button variant="outline" size="sm" className="h-9 w-9 p-0">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-xl font-bold text-surface-900 dark:text-surface-50 tracking-tight">
            Create Partner Organization
          </h2>
          <p className="text-xs text-surface-500">
            Onboard a new white-labeled broker partner to the platform
          </p>
        </div>
      </div>

      {/* Stepper */}
      <Card className="p-4 md:p-6">
        <Stepper steps={steps} currentStepIndex={currentStep} />
      </Card>

      {/* Wizard Form */}
      <Card className="p-6 md:p-8">
        {/* Step 0: Org Details */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                Partner Organization Information
              </h3>
              <p className="text-xs text-surface-500">
                Enter legal entity name and vanity portal slug
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  Partner Organization Name*
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Harvest Business Capital"
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  Portal Slug URL Identifier*
                </label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="e.g. harvest"
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-mono text-indigo-600 font-semibold"
                />
                <p className="text-[10px] text-surface-400 mt-1">
                  URL will be: apply.capflow.io/{formData.slug}
                </p>
              </div>

              <div>
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  Primary Contact Name*
                </label>
                <input
                  type="text"
                  required
                  value={formData.primaryContactName}
                  onChange={(e) => setFormData({ ...formData, primaryContactName: e.target.value })}
                  placeholder="Angela Reed"
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  Primary Contact Email*
                </label>
                <input
                  type="email"
                  required
                  value={formData.primaryContactEmail}
                  onChange={(e) => setFormData({ ...formData, primaryContactEmail: e.target.value })}
                  placeholder="a.reed@harvest.com"
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  Primary Phone Number*
                </label>
                <input
                  type="tel"
                  required
                  value={formData.primaryContactPhone}
                  onChange={(e) => setFormData({ ...formData, primaryContactPhone: e.target.value })}
                  placeholder="+1 (415) 555-0500"
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Branding & Preview */}
        {currentStep === 1 && (
          <PartnerBrandEditor
            name={formData.name}
            brandColor={formData.brandColor}
            logoAbbr={formData.logoAbbr}
            welcomeTitle={formData.welcomeTitle}
            onNameChange={(val) => setFormData({ ...formData, name: val })}
            onColorChange={(val) => setFormData({ ...formData, brandColor: val })}
            onLogoChange={(val) => setFormData({ ...formData, logoAbbr: val })}
            onTitleChange={(val) => setFormData({ ...formData, welcomeTitle: val })}
          />
        )}

        {/* Step 2: Admin User Setup */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100">
                Initial Partner Administrator Setup
              </h3>
              <p className="text-xs text-surface-500">
                The designated administrator will receive an invitation email to activate the portal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  Admin Full Name*
                </label>
                <input
                  type="text"
                  required
                  value={formData.adminName}
                  onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                  placeholder="Angela Reed"
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-surface-700 dark:text-surface-300">
                  Admin Email*
                </label>
                <input
                  type="email"
                  required
                  value={formData.adminEmail}
                  onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                  placeholder="a.reed@harvest.com"
                  className="mt-1 w-full px-3.5 py-2.5 bg-surface-50 dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200">
              <p className="font-bold">Automated Dispatch:</p>
              <p className="mt-0.5 text-[11px] text-surface-600 dark:text-surface-400">
                An onboarding link will be dispatched to {formData.adminEmail}. Once activated, they can generate sales rep URLs and submit deals immediately.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="pt-6 mt-6 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            disabled={currentStep === 0}
            onClick={handleBack}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back
          </Button>

          <Button
            type="button"
            variant="primary"
            className="px-8 font-bold"
            isLoading={isSubmitting}
            onClick={handleNext}
            rightIcon={
              currentStep === steps.length - 1 ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )
            }
          >
            {currentStep === steps.length - 1 ? "Complete & Launch Partner" : "Continue"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
