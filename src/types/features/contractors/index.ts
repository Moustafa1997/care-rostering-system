// Contractor-specific types
export interface Contractor {
  id: string;
  companyName: string;
  contract: {
    status: "Active" | "Pending" | "Inactive";
  };
  createdAt: string;
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
