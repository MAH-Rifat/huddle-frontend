"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, PlusCircle, AlertCircle } from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { BorrowerStepper } from "@/components/portal-customer/BorrowerStepper";
import { Button } from "@/components/common/Button";
import { useApp } from "@/context/AppContext";
import { LoanOwner } from "@/types";

export default function BorrowerStep2OwnersPage() {
  const router = useRouter();
  const { loanApplication, updateLoanApplication } = useApp();

  const primaryOwner = loanApplication.owners[0] || {
    id: "owner-1",
    firstName: "Marcus",
    lastName: "Johnson",
    dobMonth: "04",
    dobDay: "12",
    dobYear: "1982",
    citizenship: "US Citizen",
    ssn: "453-33-3355",
    ownershipPercentage: 100,
    title: "Managing Member",
    experienceYears: 14,
    email: "owner@business.com",
    preferredContact: "Mobile",
    mobile: "+1-415-888-5513",
    homePhone: "+1 (555) 000-0000",
    driversLicenseNumber: "DL994104",
    driversLicenseState: "CA",
    addressLine1: "12 Erskine St",
    city: "Port Costa",
    state: "CA",
    zipCode: "94569",
    homeOwnership: "Own",
    otherPropertiesCount: 1,
    gender: "Male",
    race: "Black or African American",
    ethnicity: "Non-Hispanic",
    isVeteran: false,
    smsConsent: true,
  };

  const [currentOwner, setCurrentOwner] = useState<LoanOwner>(primaryOwner);

  const handleOwnerChange = (field: keyof LoanOwner, value: any) => {
    setCurrentOwner((prev) => ({ ...prev, [field]: value }));
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    updateLoanApplication({
      owners: [currentOwner],
      step: 3,
    });
    router.push("/apply/loan");
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-surface-950 flex flex-col justify-between">
      <PublicHeader />

      <main className="max-w-4xl w-full mx-auto px-4 py-8 md:py-12">
        <div className="bg-white dark:bg-surface-900 rounded-3xl shadow-xl border border-surface-200/90 dark:border-surface-800 p-6 md:p-10 space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 dark:bg-brand-950/60 px-3 py-1 rounded-full">
              Business Loan Application
            </span>
            <h1 className="text-2xl md:text-3xl font-black text-surface-900 dark:text-surface-50 tracking-tight">
              Tell Us About the Owners
            </h1>
            <p className="text-xs text-surface-500 max-w-lg mx-auto">
              Please enter all principal owners holding 20% or more equity.
            </p>
          </div>

          {/* Stepper */}
          <BorrowerStepper currentStep={2} />

          <form onSubmit={handleContinue} className="space-y-6 pt-4">
            {/* Owner Details Card */}
            <div className="rounded-2xl border border-surface-200 dark:border-surface-800 p-6 space-y-6 bg-surface-50/40 dark:bg-surface-950/40">
              <div className="flex items-center justify-between border-b border-surface-200 dark:border-surface-800 pb-4">
                <h3 className="text-sm font-bold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                  <span className="h-6 w-6 rounded-full bg-brand-600 text-white text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  Primary Principal Owner (20%+ Equity)
                </h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                  Primary Contact
                </span>
              </div>

              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Legal First Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={currentOwner.firstName}
                    onChange={(e) => handleOwnerChange("firstName", e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={currentOwner.middleName || ""}
                    onChange={(e) => handleOwnerChange("middleName", e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Legal Last Name*
                  </label>
                  <input
                    type="text"
                    required
                    value={currentOwner.lastName}
                    onChange={(e) => handleOwnerChange("lastName", e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>
              </div>

              {/* DOB, Citizenship, SSN, Ownership % */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Date of Birth*
                  </label>
                  <div className="grid grid-cols-3 gap-2 mt-1.5">
                    <input
                      type="text"
                      placeholder="MM"
                      maxLength={2}
                      value={currentOwner.dobMonth}
                      onChange={(e) => handleOwnerChange("dobMonth", e.target.value)}
                      className="px-3 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-center font-medium"
                    />
                    <input
                      type="text"
                      placeholder="DD"
                      maxLength={2}
                      value={currentOwner.dobDay}
                      onChange={(e) => handleOwnerChange("dobDay", e.target.value)}
                      className="px-3 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-center font-medium"
                    />
                    <input
                      type="text"
                      placeholder="YYYY"
                      maxLength={4}
                      value={currentOwner.dobYear}
                      onChange={(e) => handleOwnerChange("dobYear", e.target.value)}
                      className="px-3 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl text-center font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Citizenship Status*
                  </label>
                  <select
                    value={currentOwner.citizenship}
                    onChange={(e) => handleOwnerChange("citizenship", e.target.value as any)}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  >
                    <option value="US Citizen">US Citizen</option>
                    <option value="Permanent Resident">Permanent Resident (Green Card)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Social Security or ITIN Number*
                  </label>
                  <input
                    type="text"
                    required
                    value={currentOwner.ssn}
                    onChange={(e) => handleOwnerChange("ssn", e.target.value)}
                    placeholder="XXX-XX-XXXX"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Ownership Percentage (%)*
                  </label>
                  <input
                    type="number"
                    required
                    min={20}
                    max={100}
                    value={currentOwner.ownershipPercentage}
                    onChange={(e) =>
                      handleOwnerChange("ownershipPercentage", parseFloat(e.target.value) || 0)
                    }
                    placeholder="100"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Title*
                  </label>
                  <input
                    type="text"
                    required
                    value={currentOwner.title}
                    onChange={(e) => handleOwnerChange("title", e.target.value)}
                    placeholder="e.g. Managing Member / CEO"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Years of Industry Experience*
                  </label>
                  <input
                    type="number"
                    required
                    value={currentOwner.experienceYears}
                    onChange={(e) =>
                      handleOwnerChange("experienceYears", parseInt(e.target.value) || 0)
                    }
                    placeholder="14"
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    required
                    value={currentOwner.email}
                    onChange={(e) => handleOwnerChange("email", e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                    Mobile Number*
                  </label>
                  <input
                    type="tel"
                    required
                    value={currentOwner.mobile}
                    onChange={(e) => handleOwnerChange("mobile", e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                  />
                </div>
              </div>

              {/* Residential Address */}
              <div className="pt-4 border-t border-surface-200 dark:border-surface-800 space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-surface-700 dark:text-surface-300">
                  Owner Residential Address
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                      Address Line 1*
                    </label>
                    <input
                      type="text"
                      required
                      value={currentOwner.addressLine1}
                      onChange={(e) => handleOwnerChange("addressLine1", e.target.value)}
                      className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                      City*
                    </label>
                    <input
                      type="text"
                      required
                      value={currentOwner.city}
                      onChange={(e) => handleOwnerChange("city", e.target.value)}
                      className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                      State*
                    </label>
                    <input
                      type="text"
                      required
                      value={currentOwner.state}
                      onChange={(e) => handleOwnerChange("state", e.target.value)}
                      className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                      Zip Code*
                    </label>
                    <input
                      type="text"
                      required
                      value={currentOwner.zipCode}
                      onChange={(e) => handleOwnerChange("zipCode", e.target.value)}
                      className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-surface-700 dark:text-surface-300">
                      Rent or Own Home?*
                    </label>
                    <select
                      value={currentOwner.homeOwnership}
                      onChange={(e) =>
                        handleOwnerChange("homeOwnership", e.target.value as any)
                      }
                      className="mt-1.5 w-full px-3.5 py-2.5 text-xs bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl font-medium"
                    >
                      <option value="Own">Own</option>
                      <option value="Rent">Rent</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Another Owner Button */}
            <button
              type="button"
              onClick={() => alert("Added additional owner slot.")}
              className="w-full py-3 border-2 border-dashed border-surface-300 dark:border-surface-700 rounded-2xl text-xs font-bold text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-800 flex items-center justify-center gap-2 transition-colors"
            >
              <PlusCircle className="h-4 w-4 text-brand-600" />
              <span>Add Another Owner (20%+ Equity)</span>
            </button>

            {/* Important Note Alert */}
            <div className="p-4 rounded-2xl bg-brand-50/70 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
              <div className="text-xs text-surface-700 dark:text-surface-300 space-y-1">
                <p className="font-bold text-surface-900 dark:text-surface-100">
                  Important Note for SBA & Commercial Underwriting:
                </p>
                <ul className="list-disc pl-4 space-y-0.5 text-surface-600 dark:text-surface-400 text-[11px]">
                  <li>Add each owner with 20% or more equity of the business.</li>
                  <li>
                    If no owner has at least 20% ownership, please provide information for key
                    operating officers.
                  </li>
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-surface-100 dark:border-surface-800 flex items-center justify-between">
              <Button
                type="button"
                variant="outline"
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                onClick={() => router.push("/apply")}
              >
                Back
              </Button>
              <Button
                type="submit"
                variant="primary"
                className="px-8"
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
