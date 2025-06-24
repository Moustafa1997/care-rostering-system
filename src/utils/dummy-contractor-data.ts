export const generateDummyContractorData = () => {
  return {
    companyName: "Care Solutions Ltd",
    tradingName: "Care Solutions",
    registrationNumber: "12345678",
    careType: "Residential",
    branchCount: 3,
    cqcRegistrationNumber: "CQC-123456",
    contactPerson: {
      name: "John Smith",
      designation: "Operations Manager",
      email: "john2.smith@caresolutions.com",
      phone: "+44 7123 456789"
    },
    contract: {
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year from now
      isOngoing: true,
      trial: {
        enabled: true,
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
      },
      autoRenewal: true,
      noticePeriod: "1 month",
      paymentFrequency: "Monthly"
    },
    pricing: {
      plan: "premium",
      userLicenses: 25,
      setupFee: 1500,
      discount: 10,
      paymentMethod: "Invoice",
      billing: {
        contactName: "Sarah Johnson",
        email: "finance@caresolutions.com"
      }
    },
    modules: {
      rostering: true
    },
    internalNotes:
      "Test account for demonstration purposes. This is a premium client with multiple branches.",
    documents: []
  };
};
