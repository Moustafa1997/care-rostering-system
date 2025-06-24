export interface Staff {
  _id: string;
  manager: string;

  basicDetails: {
    title: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    nationality: string;
    photoUrl: string;
  };
  contactDetails: {
    addressDetails: {
      postalCode: string;
      address: string;
      isManual: boolean;

      location: {
        type: string;
        coordinates: [number, number];
      };
    };
    emergencyContact: {
      fullName: string;
      relationshipToStaff: string;
      primaryPhoneNumber: string;
      email: string;
      addressDetails: {
        postalCode: string;
        address: string;
        isManual: boolean;

        location: {
          type: string;
          coordinates: [number, number];
        };
      };
    };
  };
  employmentDetails: {
    wtrOptOut: boolean;
    optInForPension: boolean;
  };
  active: boolean;
  verified: boolean;
  removed: boolean;
  role: string;
  invitationSent: boolean;
  saveAsDraft: boolean;
  isAvailbilitySkipedByManager: boolean;
  managerCanEditAvailability: boolean;
  managerCanEditStatus: boolean;
  onboardedByManager: boolean;
  skills: Array<{
    skillName: string;
    dateOfExpiry: string;
    certificateUrl: string;
    isExpired: boolean;
  }>;
  documents: Array<{
    documentType: string;
    documentName: string;
    fileUrl: string;
    expiryDate?: string;
  }>;
  paymentDetails: {
    regularPay: number;
    overtimePay: number;
    holidayPay: number;
    maternityPay: number;
    paternityPay: number;
  };
  training: Array<{
    trainingName: string;
    status: string;
    completedDate: string;
    expiryDate: string;
    certificateUrl: string;
    isExpired: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
  availabilityStatus: string;
  progress: number;
  availability: Array<{
    weekday: string;
    shiftType: string;
  }>;
  sectionProgress: {
    basicDetails: {
      name: string;
      isComplete: boolean;
    };
    contactDetails: {
      name: string;
      isComplete: boolean;
    };
    skills: {
      name: string;
      isComplete: boolean;
    };
    employmentDetails: {
      name: string;
      isComplete: boolean;
    };
    documents: {
      name: string;
      isComplete: boolean;
      completed?: number;
      total?: number;
      missing?: string[];
    };
    paymentDetails: {
      name: string;
      isComplete: boolean;
    };
    training: {
      name: string;
      isComplete: boolean;
    };
    availability: {
      name: string;
      isComplete: boolean;
    };
  };
}

export interface StaffFilters {
  role?: string;
  service?: string;
  status?: string;
  availabilityStatus?: string;
  onboardingStatus?: string;
}
