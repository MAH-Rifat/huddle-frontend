export type DealStage =
  | "Submitted"
  | "Processing"
  | "Under Review"
  | "Underwriting"
  | "Validation"
  | "Approved"
  | "Funded"
  | "Declined"
  | "Action Required";

export type UnderwritingStatus =
  | "New"
  | "In Review"
  | "Action Required"
  | "Approved"
  | "Funded"
  | "Declined";

export type ProductType =
  | "Term Loan"
  | "Working Capital"
  | "SBA Loan"
  | "Line of Credit"
  | "Equipment Financing";

export type EntityType =
  | "Corporation"
  | "LLC"
  | "Sole Proprietorship"
  | "Partnership"
  | "Other";

export type UserRole =
  | "Portal Admin"
  | "Sales Rep"
  | "Viewer"
  | "Underwriter"
  | "Super Admin";

export interface DocumentItem {
  id: string;
  name: string;
  category: "Bank Statement" | "Tax Return" | "Financial Statement" | "Application" | "ID" | "Other";
  uploadedAt: string;
  fileSize: string;
  status: "verified" | "pending" | "missing" | "rejected";
  downloadUrl?: string;
  fileType: string;
}

export interface DealNote {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
  isSystemEvent?: boolean;
}

export interface Deal {
  id: string;
  dealNumber: string; // e.g. "UW-2024-001" or "DL-2406"
  clientName: string; // e.g. "Marcus Johnson"
  businessName: string; // e.g. "Johnson Supply Co."
  dba?: string;
  entityType: EntityType;
  industry: string; // e.g. "Wholesale", "Bakery", "Construction"
  address: string;
  email: string;
  phone: string;
  requestedAmount: number;
  fundingPurpose: string;
  productType: ProductType;
  submittedDate: string;
  stage: DealStage;
  underwritingStatus: UnderwritingStatus;
  partnerId: string;
  partnerName: string;
  salesRepId?: string;
  salesRepName?: string;
  assignedUnderwriter?: string;
  financialMetrics: {
    annualRevenue: number;
    monthlyExpenses: number;
    monthlyCashFlow: number;
    existingDebt: number;
    creditScore: number;
    timeInBusinessYears: number;
    dscr?: number;
  };
  documents: DocumentItem[];
  notes: DealNote[];
  missingDocuments?: string[];
}

export interface SalesRep {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  customSlug: string; // e.g. "jennifer-moore"
  trackableUrl: string; // e.g. "https://apply.capflow.io/abc-capital/jennifer-moore"
  dealsSubmitted: number;
  attributionPercent: number; // e.g. 43
  isActive: boolean;
  lastLogin: string;
  avatarUrl?: string;
}

export interface PartnerUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: {
    submitDeals: boolean;
    viewAllDeals: boolean;
    manageUsers: boolean;
    viewReports: boolean;
    managePortalSettings: boolean;
    viewOwnDeals: boolean;
    viewOwnReports: boolean;
  };
  customSlug?: string;
  trackableUrl?: string;
  lastLogin: string;
  avatarUrl?: string;
  isActive: boolean;
}

export interface Partner {
  id: string;
  name: string; // e.g. "ABC Capital Bank"
  slug: string; // e.g. "abc-capital"
  brandColor: string; // e.g. "#1d4ed8"
  logoAbbr: string; // e.g. "ABC"
  welcomeTitle: string; // e.g. "Welcome to ABC Capital Bank Portal"
  portalUrl: string; // e.g. "https://portal.capflow.io/abc-capital"
  applyBaseUrl: string; // e.g. "https://apply.capflow.io/abc-capital"
  primaryContactName: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  status: "Active" | "Inactive" | "Suspended";
  totalDeals: number;
  inWorkDeals: number;
  fundedDeals: number;
  totalFundedVolume: number;
  totalUsers: number;
  salesRepsCount: number;
  users: PartnerUser[];
  salesReps: SalesRep[];
  createdAt: string;
}

export interface LoanOwner {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  dobMonth: string;
  dobDay: string;
  dobYear: string;
  citizenship: string;
  ssn: string;
  ownershipPercentage: number;
  title: string;
  experienceYears: number;
  email: string;
  preferredContact: string;
  mobile: string;
  homePhone?: string;
  driversLicenseNumber?: string;
  driversLicenseState?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  zipCode: string;
  homeOwnership: "Own" | "Rent";
  otherPropertiesCount: number;
  gender?: string;
  race?: string;
  ethnicity?: string;
  isVeteran?: boolean;
  smsConsent: boolean;
}

export interface LoanEstimateItem {
  purpose: string;
  totalNeed: number;
  estimatedDownPayment: number;
}

export interface LoanApplicationState {
  step: number;
  // Step 1: Company
  legalBusinessName: string;
  dba: string;
  entityType: string;
  businessPhone: string;
  naicsCode: string;
  website: string;
  establishedMonth: string;
  establishedDay: string;
  establishedYear: string;
  stateOfFormation: string;
  hasEin: string;
  einOrSsn: string;
  isFranchise: string;
  taxYearFiled: string;
  annualGrossReceipts: number;
  propertyOwnership: "Own" | "Lease";
  businessAddressLine1: string;
  businessAddressLine2?: string;
  businessCity: string;
  businessState: string;
  businessZip: string;
  // Step 2: Owners
  owners: LoanOwner[];
  // Step 3: Loan
  requestedAmount: number;
  selectedPurposes: string[];
  estimates: LoanEstimateItem[];
  // Step 4: E-sign
  ownerSignature?: string;
  coOwnerSignature?: string;
  legalFirstNameConsent: string;
  legalLastNameConsent: string;
  consentAgreed: boolean;
  // Step 5: Docs
  uploadedTaxReturn?: boolean;
  uploadedBankStatements?: boolean;
  uploadedGovtId?: boolean;
  uploadedFinancials?: boolean;
  // Referral metadata
  partnerSlug?: string;
  repSlug?: string;
}

export interface CashflowOverviewMetrics {
  netOperatingDailyAvg: number;
  revenueSourcesCount: number;
  balanceAvg90Days: number;
  predictedBalanceDailyAvg: number;
  negativeBalanceDays: number;
  nsfDays: number;
  debtInvestmentCount: number;
  debtRepaymentDailyAvg: number;
  dscr: number | null;
  unconnectedAccountRatio: number;
  dataFreshnessDays: number;
  confidenceScore: number;
}

export interface BankStatementMonthSummary {
  month: string; // e.g. "Apr 2026"
  beginningBalance: number;
  totalDeposits: number;
  totalWithdrawals: number;
  endingBalance: number;
  avgDailyBalance: number;
  nsfCount: number;
}

export interface ProfitLossRow {
  category: string;
  year2025: number;
  year2026: number;
  isSubheader?: boolean;
  isTotal?: boolean;
}

export interface ActivityEvent {
  id: string;
  user: string;
  action: string;
  targetId: string;
  timestamp: string;
  type: "status_change" | "document_upload" | "ai_extraction" | "note_added" | "deal_submitted";
}
