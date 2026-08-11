"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  Deal,
  Partner,
  DealStage,
  LoanApplicationState,
  UserRole,
} from "@/types";
import { mockDeals, mockPartners } from "@/mock/data";

interface AppContextType {
  // Active context
  activePortal: "customer" | "partner" | "admin";
  setActivePortal: (portal: "customer" | "partner" | "admin") => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;

  // Active Partner Theme
  activePartner: Partner;
  setActivePartner: (partner: Partner) => void;

  // Deals
  deals: Deal[];
  addDeal: (newDeal: Omit<Deal, "id" | "dealNumber" | "submittedDate">) => Deal;
  updateDealStage: (dealId: string, stage: DealStage) => void;
  addDealNote: (dealId: string, content: string, authorName?: string, authorRole?: string) => void;
  getDealById: (id: string) => Deal | undefined;

  // Partners
  partners: Partner[];
  addPartner: (partner: Omit<Partner, "id" | "createdAt" | "totalDeals" | "inWorkDeals" | "fundedDeals" | "totalFundedVolume" | "totalUsers" | "salesRepsCount" | "users" | "salesReps">) => Partner;
  getPartnerBySlug: (slug: string) => Partner | undefined;

  // Borrower Loan Application Form State
  loanApplication: LoanApplicationState;
  updateLoanApplication: (updates: Partial<LoanApplicationState>) => void;
  resetLoanApplication: () => void;
  submitLoanApplication: () => Deal;
}

const defaultLoanApplication: LoanApplicationState = {
  step: 1,
  legalBusinessName: "Johnson Supply Co.",
  dba: "Johnson Wholesale Direct",
  entityType: "LLC",
  businessPhone: "+1 (404) 555-0192",
  naicsCode: "541611 – Business Management Consulting",
  website: "https://johnsonsupply.com",
  establishedMonth: "06",
  establishedDay: "15",
  establishedYear: "2017",
  stateOfFormation: "GA",
  hasEin: "Yes",
  einOrSsn: "58-1234567",
  isFranchise: "No",
  taxYearFiled: "2023",
  annualGrossReceipts: 1250000,
  propertyOwnership: "Lease",
  businessAddressLine1: "4821 Commerce Dr",
  businessAddressLine2: "Suite 400",
  businessCity: "Atlanta",
  businessState: "GA",
  businessZip: "30301",
  owners: [
    {
      id: "owner-1",
      firstName: "Marcus",
      lastName: "Johnson",
      dobMonth: "04",
      dobDay: "12",
      dobYear: "1982",
      citizenship: "US Citizen",
      ssn: "***-**-4589",
      ownershipPercentage: 100,
      title: "Managing Member & CEO",
      experienceYears: 14,
      email: "m.johnson@johnsonsupply.com",
      preferredContact: "Mobile",
      mobile: "(404) 555-0192",
      homePhone: "(404) 555-0190",
      driversLicenseNumber: "DL8892104",
      driversLicenseState: "GA",
      addressLine1: "12 Erskine St",
      city: "Port Costa",
      state: "GA",
      zipCode: "30302",
      homeOwnership: "Own",
      otherPropertiesCount: 1,
      gender: "Male",
      race: "Black or African American",
      ethnicity: "Non-Hispanic",
      isVeteran: false,
      smsConsent: true,
    },
  ],
  requestedAmount: 125000,
  selectedPurposes: ["Working Capital", "Inventory Purchase"],
  estimates: [
    { purpose: "Working Capital", totalNeed: 75000, estimatedDownPayment: 0 },
    { purpose: "Inventory Purchase", totalNeed: 50000, estimatedDownPayment: 5000 },
  ],
  legalFirstNameConsent: "Marcus",
  legalLastNameConsent: "Johnson",
  consentAgreed: true,
  uploadedTaxReturn: true,
  uploadedBankStatements: true,
  uploadedGovtId: true,
  uploadedFinancials: true,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activePortal, setActivePortal] = useState<"customer" | "partner" | "admin">("partner");
  const [currentRole, setCurrentRole] = useState<UserRole>("Portal Admin");
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [activePartner, setActivePartner] = useState<Partner>(mockPartners[0]);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [loanApplication, setLoanApplication] = useState<LoanApplicationState>(defaultLoanApplication);

  // Sync loan app state with localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem("huddle_loan_app");
      if (saved) {
        setLoanApplication(JSON.parse(saved));
      }
    } catch {
      // Ignore fallback
    }
  }, []);

  const updateLoanApplication = (updates: Partial<LoanApplicationState>) => {
    setLoanApplication((prev) => {
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem("huddle_loan_app", JSON.stringify(updated));
      } catch {
        // Ignore fallback
      }
      return updated;
    });
  };

  const resetLoanApplication = () => {
    setLoanApplication(defaultLoanApplication);
    try {
      localStorage.removeItem("huddle_loan_app");
    } catch {
      // Ignore fallback
    }
  };

  const addDeal = (newDealData: Omit<Deal, "id" | "dealNumber" | "submittedDate">): Deal => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newDeal: Deal = {
      ...newDealData,
      id: `deal-${Date.now()}`,
      dealNumber: `DL-${randomNum}`,
      submittedDate: new Date().toISOString().split("T")[0],
    };
    setDeals((prev) => [newDeal, ...prev]);
    return newDeal;
  };

  const updateDealStage = (dealId: string, stage: DealStage) => {
    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === dealId || deal.dealNumber === dealId
          ? { ...deal, stage }
          : deal
      )
    );
  };

  const addDealNote = (
    dealId: string,
    content: string,
    authorName: string = "Andrew Smith",
    authorRole: string = "Partner Admin"
  ) => {
    const newNote = {
      id: `note-${Date.now()}`,
      authorName,
      authorRole,
      content,
      timestamp: "Just now",
    };

    setDeals((prev) =>
      prev.map((deal) =>
        deal.id === dealId || deal.dealNumber === dealId
          ? { ...deal, notes: [newNote, ...deal.notes] }
          : deal
      )
    );
  };

  const getDealById = (id: string): Deal | undefined => {
    return deals.find(
      (d) => d.id === id || d.dealNumber.toLowerCase() === id.toLowerCase()
    );
  };

  const addPartner = (
    partnerData: Omit<
      Partner,
      | "id"
      | "createdAt"
      | "totalDeals"
      | "inWorkDeals"
      | "fundedDeals"
      | "totalFundedVolume"
      | "totalUsers"
      | "salesRepsCount"
      | "users"
      | "salesReps"
    >
  ): Partner => {
    const newPartner: Partner = {
      ...partnerData,
      id: `partner-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
      totalDeals: 0,
      inWorkDeals: 0,
      fundedDeals: 0,
      totalFundedVolume: 0,
      totalUsers: 1,
      salesRepsCount: 1,
      users: [],
      salesReps: [],
    };
    setPartners((prev) => [...prev, newPartner]);
    return newPartner;
  };

  const getPartnerBySlug = (slug: string): Partner | undefined => {
    return partners.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
  };

  const submitLoanApplication = (): Deal => {
    const primaryOwner = loanApplication.owners[0];
    const newDeal = addDeal({
      clientName: `${primaryOwner?.firstName || "Applicant"} ${primaryOwner?.lastName || ""}`.trim(),
      businessName: loanApplication.legalBusinessName || "New Business Application",
      dba: loanApplication.dba,
      entityType: (loanApplication.entityType as any) || "LLC",
      industry: "Business Services",
      address: `${loanApplication.businessAddressLine1}, ${loanApplication.businessCity}, ${loanApplication.businessState} ${loanApplication.businessZip}`,
      email: primaryOwner?.email || "applicant@example.com",
      phone: loanApplication.businessPhone || "(555) 000-0000",
      requestedAmount: loanApplication.requestedAmount || 100000,
      fundingPurpose: loanApplication.selectedPurposes.join(", ") || "Working Capital",
      productType: "Term Loan",
      stage: "Submitted",
      underwritingStatus: "New",
      partnerId: activePartner.id,
      partnerName: activePartner.name,
      financialMetrics: {
        annualRevenue: loanApplication.annualGrossReceipts || 800000,
        monthlyExpenses: 45000,
        monthlyCashFlow: 22000,
        existingDebt: 40000,
        creditScore: 720,
        timeInBusinessYears: 4,
        dscr: 1.35,
      },
      documents: [
        {
          id: `doc-${Date.now()}-1`,
          name: "Online_Application_Summary.pdf",
          category: "Application",
          uploadedAt: new Date().toISOString().split("T")[0],
          fileSize: "2.1 MB",
          status: "verified",
          fileType: "pdf",
        },
        {
          id: `doc-${Date.now()}-2`,
          name: "Uploaded_Bank_Statements.pdf",
          category: "Bank Statement",
          uploadedAt: new Date().toISOString().split("T")[0],
          fileSize: "8.5 MB",
          status: "verified",
          fileType: "pdf",
        },
      ],
      notes: [
        {
          id: `note-${Date.now()}`,
          authorName: "System",
          authorRole: "Automated Origination",
          content: "Application received and submitted through Borrower Online Portal.",
          timestamp: "Just now",
          isSystemEvent: true,
        },
      ],
    });

    return newDeal;
  };

  return (
    <AppContext.Provider
      value={{
        activePortal,
        setActivePortal,
        currentRole,
        setCurrentRole,
        activePartner,
        setActivePartner,
        deals,
        addDeal,
        updateDealStage,
        addDealNote,
        getDealById,
        partners,
        addPartner,
        getPartnerBySlug,
        loanApplication,
        updateLoanApplication,
        resetLoanApplication,
        submitLoanApplication,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
