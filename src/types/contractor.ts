// Type for contractor data
export interface Contractor {
  _id: string;
  adminId: string;
  companyName: string;
  tradingName: string;
  registrationNumber: string;
  careType: string;
  branchCount: number;
  cqcRegistrationNumber: string;
  contactPerson: {
    name: string;
    designation: string;
    email: string;
    phone: string;
  };
  contract: {
    startDate: string;
    endDate: string;
    isOngoing: boolean;
    trial: {
      enabled: boolean;
      startDate: string;
      endDate: string;
    };
    autoRenewal: boolean;
    noticePeriod: string;
    paymentFrequency: string;
    status: "Active" | "Pending" | "Inactive";
  };
  pricing: {
    plan: string;
    userLicenses: number;
    setupFee: number;
    discount: number;
    paymentMethod: string;
    billing: {
      contactName: string;
      email: string;
    };
  };
  modules: {
    rostering: boolean;
  };
  internalNotes: string;
  active: boolean;
  removed: boolean;
  role: string;
  documents: any[];
  createdAt: string;
  updatedAt: string;
  passwordChangedAt: string;
}

export interface DashboardSummary {
  total: number;
  Active: number;
  Pending: number;
  Inactive: number;
}

export interface ContactPerson {
  name: string;
}

export interface Contract {
  startDate: string;
  status: string;
}

export interface RecentContract {
  companyName: string;
  contactPerson: ContactPerson;
  contract: Contract;
  createdAt: string;
}

export interface DashboardData {
  summary: DashboardSummary;
  recentContracts: RecentContract[];
}
