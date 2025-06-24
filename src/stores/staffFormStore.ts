import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Staff } from "@/types/staff";

// UK Phone Number Validation Function
const validateUKPhoneNumber = (phoneNumber: string): boolean => {
  // Remove all non-digit characters except + for international format
  const cleaned = phoneNumber.replace(/[^\d+]/g, "");

  // UK phone number patterns:
  // 1. International format: +44 followed by 9-10 digits (e.g., +447123456789)
  // 2. UK mobile: 07xxx xxxxxx (11 digits starting with 07, e.g., 07123456789)
  // 3. UK landline: 01xxx xxxxxx or 02xxx xxxxxx (11 digits starting with 01 or 02)
  // 4. UK special numbers: 03xx xxxxxx, 05xx xxxxxx, 08xx xxxxxx, 09xx xxxxxx
  // 5. Short codes: 1xx, 11x, 12x, 13x, 14x, 15x, 16x, 17x, 18x, 19x (3 digits)

  // Check for international format (+44)
  if (cleaned.startsWith("+44")) {
    const withoutCountryCode = cleaned.substring(3);
    // After +44, should have 9-10 digits
    return /^\d{9,10}$/.test(withoutCountryCode);
  }

  // Check for UK mobile numbers (07xxx xxxxxx)
  if (cleaned.startsWith("07")) {
    return /^07\d{9}$/.test(cleaned);
  }

  // Check for UK landline numbers (01xxx xxxxxx or 02xxx xxxxxx)
  if (cleaned.startsWith("01") || cleaned.startsWith("02")) {
    return /^0[12]\d{9}$/.test(cleaned);
  }

  // Check for UK special numbers (03xx, 05xx, 08xx, 09xx)
  if (
    cleaned.startsWith("03") ||
    cleaned.startsWith("05") ||
    cleaned.startsWith("08") ||
    cleaned.startsWith("09")
  ) {
    return /^0[3589]\d{9}$/.test(cleaned);
  }

  // Check for short codes (1xx, 11x, 12x, etc.)
  if (cleaned.startsWith("1")) {
    return /^1\d{2}$/.test(cleaned);
  }

  return false;
};

export interface StaffFormData {
  saveAsDraft: boolean;
  isAvailbilitySkipedByManager: boolean;

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
        isManual: boolean;

        postalCode: string;
        address: string;
        location: {
          type: string;
          coordinates: [number, number];
        };
      };
    };
  };
  availability?: Array<{
    weekday: string;
    shiftType: string;
  }>;
  skills: Array<{
    skillName: string;
    dateOfExpiry: string;
    certificateUrl: string;
    isExpired: boolean;
  }>;
  employmentDetails: {
    interviewDate: string;
    startDate: string;
    niNumber: string;
    socialWorkNumber: string;
    employeeNumber: string;
    workingRole: string;
    contractType: string;
    weeklyContractedHours: number;
    wtrOptOut: boolean;
    bankDetails: {
      bankName: string;
      accountNumber: string;
      sortCode: string;
    };
    optInForPension: boolean;
  };
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
}

interface FormStep {
  id: string;
  path: string;
  label: string;
  isCompleted: boolean;
  isEnabled: boolean;
}

interface StaffFormStore {
  // Form Data
  formData: StaffFormData;
  // Form Flow
  currentStep: number;
  steps: FormStep[];
  // UI State
  isLoading: boolean;
  errors: Record<string, string>;
  formMode: "create" | "edit-draft" | "edit" | "view";
  staffId?: string;
  sendAvilability: boolean;
  isVerified: boolean;
  progress: number;
  active: boolean;
  managerCanEditAvailability: boolean;
  managerCanEditStatus: boolean;

  // Actions
  setField: (section: string, field: string, value: any) => void;
  setRootField: (field: string, value: any) => void;
  setArrayField: (section: string, value: any[]) => void;
  setCurrentStep: (step: number) => void;
  updateStepStatus: (stepId: string, isCompleted: boolean) => void;
  validateStep: (stepId: string) => boolean;
  saveAsDraft: () => Partial<StaffFormData>;
  submitForm: (
    createStaff: (formData: StaffFormData) => Promise<void>
  ) => Promise<void>;
  resetForm: () => void;
  getFilledFormData: () => Partial<StaffFormData>;
  initializeFormFromStaff: (staff: Staff, mode: "edit" | "view") => void;
  getInitialFormData: () => StaffFormData;
  handleEdit: (staff: Staff) => void;
  handleView: (staff: Staff) => void;
  switchToEditMode: () => void;
  validateSkill: (
    skill: { skillName: string; dateOfExpiry: string; certificateUrl: string },
    index: number
  ) => boolean;
  validateTraining: (
    trainingItem: {
      trainingName: string;
      status: string;
      completedDate: string;
      expiryDate: string;
      certificateUrl: string;
    },
    index: number
  ) => boolean;
  resetFormAfterDraftSave: () => void;
  setIsVerified: (isVerified: boolean) => void;
  setActive: (active: boolean) => void;
  setProgress: (progress: number) => void;
}

const initialFormData: StaffFormData = {
  saveAsDraft: false,
  isAvailbilitySkipedByManager: false,

  basicDetails: {
    title: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    nationality: "",
    photoUrl: ""
  },
  contactDetails: {
    addressDetails: {
      postalCode: "",
      address: "",
      isManual: false,
      location: {
        type: "Point",
        coordinates: [0, 0]
      }
    },
    emergencyContact: {
      fullName: "",
      relationshipToStaff: "",
      primaryPhoneNumber: "",
      email: "",
      addressDetails: {
        postalCode: "",
        address: "",
        isManual: false,
        location: {
          type: "Point",
          coordinates: [0, 0]
        }
      }
    }
  },
  availability: [],
  skills: [],
  employmentDetails: {
    interviewDate: "",
    startDate: "",
    niNumber: "",
    socialWorkNumber: "",
    employeeNumber: "",
    workingRole: "",
    contractType: "",
    weeklyContractedHours: 0,
    wtrOptOut: false,
    bankDetails: {
      bankName: "",
      accountNumber: "",
      sortCode: ""
    },
    optInForPension: false
  },
  documents: [],
  paymentDetails: {
    regularPay: 0,
    overtimePay: 0,
    holidayPay: 0,
    maternityPay: 0,
    paternityPay: 0
  },
  training: []
};

export { initialFormData };

const formSteps: FormStep[] = [
  {
    id: "basic-details",
    path: "/dashboard/admin/team/staff-detail",
    label: "Basic Profile",
    isCompleted: false,
    isEnabled: true
  },
  {
    id: "contact-details",
    path: "/dashboard/admin/team/staff-detail/contact-detail",
    label: "Contact Details",
    isCompleted: false,
    isEnabled: false
  },
  {
    id: "skills",
    path: "/dashboard/admin/team/staff-detail/skills",
    label: "Skills",
    isCompleted: false,
    isEnabled: false
  },
  {
    id: "availability",
    path: "/dashboard/admin/team/staff-detail/availability",
    label: "Availability",
    isCompleted: false,
    isEnabled: false
  },
  {
    id: "employment-details",
    path: "/dashboard/admin/team/staff-detail/employment-detail",
    label: "Employment Details",
    isCompleted: false,
    isEnabled: false
  },
  {
    id: "documents",
    path: "/dashboard/admin/team/staff-detail/document-management",
    label: "Documents",
    isCompleted: false,
    isEnabled: false
  },
  {
    id: "payment",
    path: "/dashboard/admin/team/staff-detail/payment",
    label: "Payment",
    isCompleted: false,
    isEnabled: false
  },
  {
    id: "training",
    path: "/dashboard/admin/team/staff-detail/training",
    label: "Training",
    isCompleted: false,
    isEnabled: false
  }
];

// Helper function to create steps based on sectionProgress
const createStepsFromProgress = (
  sectionProgress: Staff["sectionProgress"]
): FormStep[] => {
  return formSteps.map((step) => {
    let isCompleted = false;
    let isEnabled = true;

    switch (step.id) {
      case "basic-details":
        isCompleted = sectionProgress.basicDetails.isComplete;
        isEnabled = true; // Always enabled as it's the first step
        break;
      case "contact-details":
        isCompleted = sectionProgress.contactDetails.isComplete;
        isEnabled = isCompleted;
        break;
      case "skills":
        isCompleted = sectionProgress.skills.isComplete;
        isEnabled = isCompleted;
        break;
      case "availability":
        isCompleted = sectionProgress.availability.isComplete;
        isEnabled = isCompleted;
        break;
      case "employment-details":
        isCompleted = sectionProgress.employmentDetails.isComplete;
        isEnabled = isCompleted;
        break;
      case "documents":
        isCompleted = sectionProgress.documents.isComplete;
        isEnabled = isCompleted;
        break;
      case "payment":
        isCompleted = sectionProgress.paymentDetails.isComplete;
        isEnabled = isCompleted;
        break;
      case "training":
        isCompleted = sectionProgress.training.isComplete;
        isEnabled = isCompleted;
        break;
    }

    return {
      ...step,
      isCompleted,
      isEnabled
    };
  });
};

// Helper function to convert Staff to StaffFormData
const convertStaffToFormData = (staff: Staff): StaffFormData => {
  // Start with the complete initial form data structure
  const result: StaffFormData = {
    ...initialFormData,
    saveAsDraft: staff.saveAsDraft,
    isAvailbilitySkipedByManager: staff.isAvailbilitySkipedByManager
  };

  // Merge basicDetails if it exists
  if (staff.basicDetails) {
    result.basicDetails = {
      ...result.basicDetails,
      ...staff.basicDetails
    };
  }

  if (staff.contactDetails) {
    result.contactDetails = {
      ...result.contactDetails,
      ...staff.contactDetails
    };
  }

  // Merge contactDetails if it exists
  // if (staff.contactDetails) {
  //   if (staff.contactDetails.addressDetails) {
  //     result.contactDetails.addressDetails = {
  //       ...result.contactDetails.addressDetails,
  //       ...staff.contactDetails.addressDetails,
  //       location: {
  //         ...result.contactDetails.addressDetails.location,
  //         ...staff.contactDetails.addressDetails.location
  //       }
  //     };
  //   }

  //   if (staff.contactDetails.emergencyContact) {
  //     result.contactDetails.emergencyContact = {
  //       ...result.contactDetails.emergencyContact,
  //       ...staff.contactDetails.emergencyContact,
  //       addressDetails: {
  //         ...result.contactDetails.emergencyContact.addressDetails,
  //         ...staff.contactDetails.emergencyContact.addressDetails,
  //         location: {
  //           ...result.contactDetails.emergencyContact.addressDetails.location,
  //           ...staff.contactDetails.emergencyContact.addressDetails.location
  //         }
  //       }
  //     };
  //   }
  // }

  // Merge availability if it exists
  if (staff.availability) {
    result.availability = staff.availability.map((day) => ({
      weekday: day.weekday,
      shiftType: day.shiftType
    }));
  }

  // Merge skills if it exists
  if (staff.skills) {
    result.skills = staff.skills.map((skill) => ({
      skillName: skill.skillName,
      dateOfExpiry: skill.dateOfExpiry,
      certificateUrl: skill.certificateUrl,
      isExpired: skill.isExpired
    }));
  }

  // Merge employmentDetails if it exists
  if (staff.employmentDetails) {
    result.employmentDetails = {
      ...result.employmentDetails,
      ...staff.employmentDetails
    };
  }

  // Merge documents if it exists
  if (staff.documents) {
    result.documents = staff.documents.map((document) => ({
      documentName: document.documentName,
      documentType: document.documentType,
      fileUrl: document.fileUrl,
      expiryDate: document.expiryDate
    }));
  }

  // Merge paymentDetails if it exists
  if (staff.paymentDetails) {
    result.paymentDetails = {
      ...result.paymentDetails,
      ...staff.paymentDetails
    };
  }

  // Merge training if it exists
  if (staff.training) {
    result.training = staff.training.map((training) => ({
      certificateUrl: training.certificateUrl,
      completedDate: training.completedDate,
      expiryDate: training.expiryDate,
      isExpired: training.isExpired,
      status: training.status,
      trainingName: training.trainingName
    }));
  }

  return result;
};

export const useStaffFormStore = create<StaffFormStore>()(
  persist(
    (set, get) => ({
      formData: initialFormData,
      currentStep: 0,
      steps: formSteps,
      isLoading: false,
      errors: {},
      formMode: "create",
      staffId: undefined,
      sendAvilability: true,
      isVerified: false,
      progress: 0,
      active: false,
      managerCanEditStatus: false,
      managerCanEditAvailability: true,
      setIsVerified: (isVerified: boolean) => {
        set({ isVerified });
      },
      setActive: (active: boolean) => {
        set({ active });
      },
      setProgress: (progress: number) => {
        set({ progress });
      },
      setField: (section: string, field: string, value: any) => {
        set((state) => {
          const newErrors = { ...state.errors };

          // Clear the specific field error using both possible patterns
          // Some validation errors use just the field name, others use section.field
          delete newErrors[field];
          delete newErrors[`${section}.${field}`];

          const sectionData = state.formData[section as keyof StaffFormData];
          if (typeof sectionData !== "object" || sectionData === null) {
            return state;
          }

          // Handle nested fields
          if (field.includes(".")) {
            const parts = field.split(".");
            let current: any = sectionData;
            let parent: any = sectionData;
            let parentKey = "";

            // Navigate to the nested object
            for (let i = 0; i < parts.length - 1; i++) {
              parent = current;
              parentKey = parts[i];
              current = current[parentKey];

              if (typeof current !== "object" || current === null) {
                return state;
              }
            }

            // Update the nested value
            const lastKey = parts[parts.length - 1];
            parent[parentKey] = {
              ...current,
              [lastKey]: value
            };

            return {
              formData: {
                ...state.formData,
                [section]: sectionData
              },
              errors: newErrors
            };
          }

          return {
            formData: {
              ...state.formData,
              [section]: {
                ...sectionData,
                [field]: value
              }
            },
            errors: newErrors
          };
        });
      },

      setRootField: (field: string, value: any) => {
        set((state) => {
          const newErrors = { ...state.errors };
          delete newErrors[field];

          return {
            formData: {
              ...state.formData,
              [field]: value
            },
            errors: newErrors
          };
        });
      },

      setArrayField: (section: string, value: any[]) => {
        set((state) => {
          const newErrors = { ...state.errors };
          // Clear any errors related to this section using both patterns
          Object.keys(newErrors).forEach((key) => {
            if (key.startsWith(`${section}.`) || key === section) {
              delete newErrors[key];
            }
          });

          return {
            formData: {
              ...state.formData,
              [section]: value
            },
            errors: newErrors
          };
        });
      },

      setCurrentStep: (step: number) => {
        set((state) => ({
          currentStep: step,
          steps: state.steps.map((s, index) => ({
            ...s,
            isEnabled: s.isCompleted || index <= step
          }))
        }));
      },

      updateStepStatus: (stepId: string, isCompleted: boolean) => {
        set((state) => ({
          steps: state.steps.map((step) =>
            step.id === stepId ? { ...step, isCompleted } : step
          )
        }));
      },

      validateStep: (stepId: string) => {
        const { formData, errors } = get();
        let isValid = true;
        const newErrors: Record<string, string> = { ...errors };

        switch (stepId) {
          case "basic-details": {
            const {
              title,
              firstName,
              lastName,
              phoneNumber,
              email,
              nationality,
              photoUrl
            } = formData.basicDetails;

            if (!title) {
              newErrors.title = "Please select a title";
              isValid = false;
            }

            if (!firstName?.trim()) {
              newErrors.firstName = "First name is required";
              isValid = false;
            }

            if (!lastName?.trim()) {
              newErrors.lastName = "Last name is required";
              isValid = false;
            }

            if (!phoneNumber?.trim()) {
              newErrors.phoneNumber = "Phone number is required";
              isValid = false;
            } else if (!validateUKPhoneNumber(phoneNumber)) {
              newErrors.phoneNumber = "Please enter a valid UK phone number";
              isValid = false;
            }

            if (!email?.trim()) {
              newErrors.email = "Email is required";
              isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              newErrors.email = "Please enter a valid email address";
              isValid = false;
            }

            if (!nationality?.trim()) {
              newErrors.nationality = "Nationality is required";
              isValid = false;
            }

            if (!photoUrl?.trim()) {
              newErrors.photoUrl = "Profile photo is required";
              isValid = false;
            }
            break;
          }

          case "contact-details": {
            const { addressDetails, emergencyContact } =
              formData.contactDetails;

            // Validate address details
            if (!addressDetails.postalCode?.trim()) {
              newErrors["addressDetails.postalCode"] =
                "Postal code is required";
              isValid = false;
            }

            if (!addressDetails.address?.trim()) {
              newErrors["addressDetails.address"] = "Address is required";
              isValid = false;
            }

            // Validate emergency contact
            if (!emergencyContact.fullName?.trim()) {
              newErrors["emergencyContact.fullName"] = "Full name is required";
              isValid = false;
            }

            if (!emergencyContact.relationshipToStaff?.trim()) {
              newErrors["emergencyContact.relationshipToStaff"] =
                "Relationship is required";
              isValid = false;
            }

            if (!emergencyContact.primaryPhoneNumber?.trim()) {
              newErrors["emergencyContact.primaryPhoneNumber"] =
                "Phone number is required";
              isValid = false;
            } else if (
              !validateUKPhoneNumber(emergencyContact.primaryPhoneNumber)
            ) {
              newErrors["emergencyContact.primaryPhoneNumber"] =
                "Please enter a valid UK phone number";
              isValid = false;
            }

            if (!emergencyContact.email?.trim()) {
              newErrors["emergencyContact.email"] = "Email is required";
              isValid = false;
            } else if (
              !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emergencyContact.email)
            ) {
              newErrors["emergencyContact.email"] =
                "Please enter a valid email address";
              isValid = false;
            }

            // Validate emergency contact address
            if (!emergencyContact.addressDetails.postalCode?.trim()) {
              newErrors["emergencyContact.addressDetails.postalCode"] =
                "Postal code is required";
              isValid = false;
            }

            if (!emergencyContact.addressDetails.address?.trim()) {
              newErrors["emergencyContact.addressDetails.address"] =
                "Address is required";
              isValid = false;
            }
            break;
          }

          case "skills": {
            const { skills } = formData;
            if (!skills || skills.length === 0) {
              newErrors["skills"] = "At least one skill is required";
              isValid = false;
              break;
            }

            skills.forEach((skill, index) => {
              if (!skill.skillName?.trim()) {
                newErrors[`skills.${index}.skillName`] =
                  "Skill name is required";
                isValid = false;
              }

              if (!skill.dateOfExpiry?.trim()) {
                newErrors[`skills.${index}.dateOfExpiry`] =
                  "Expiry date is required";
                isValid = false;
              } else {
                const expiryDate = new Date(skill.dateOfExpiry);
                const today = new Date();
                if (expiryDate < today) {
                  newErrors[`skills.${index}.dateOfExpiry`] =
                    "Expiry date cannot be in the past";
                  isValid = false;
                }
              }

              if (!skill.certificateUrl?.trim()) {
                newErrors[`skills.${index}.certificateUrl`] =
                  "Certificate is required";
                isValid = false;
              }
            });
            break;
          }

          case "availability": {
            const { availability, isAvailbilitySkipedByManager } = formData;

            // If availability is skipped, validation passes
            if (isAvailbilitySkipedByManager) {
              break;
            }

            if (!availability || availability.length === 0) {
              newErrors["availability"] =
                "At least one day of availability is required";
              isValid = false;
              break;
            }

            availability.forEach((item, index) => {
              if (!item.weekday?.trim()) {
                newErrors[`availability.${index}.weekday`] =
                  "Weekday is required";
                isValid = false;
              }

              if (!item.shiftType?.trim()) {
                newErrors[`availability.${index}.shiftType`] =
                  "Shift type is required";
                isValid = false;
              } else if (!["Morning", "Night"].includes(item.shiftType)) {
                newErrors[`availability.${index}.shiftType`] =
                  "Invalid shift type";
                isValid = false;
              }
            });
            break;
          }

          case "employment-details": {
            const { employmentDetails } = formData;
            if (!employmentDetails.interviewDate?.trim()) {
              newErrors["employmentDetails.interviewDate"] =
                "Interview date is required";
              isValid = false;
            }
            if (!employmentDetails.startDate?.trim()) {
              newErrors["employmentDetails.startDate"] =
                "Start date is required";
              isValid = false;
            }
            if (!employmentDetails.niNumber?.trim()) {
              newErrors["employmentDetails.niNumber"] = "NI number is required";
              isValid = false;
            }
            if (!employmentDetails.socialWorkNumber?.trim()) {
              newErrors["employmentDetails.socialWorkNumber"] =
                "Social work number is required";
              isValid = false;
            }
            if (!employmentDetails.employeeNumber?.trim()) {
              newErrors["employmentDetails.employeeNumber"] =
                "Employee number is required";
              isValid = false;
            }
            if (!employmentDetails.workingRole?.trim()) {
              newErrors["employmentDetails.workingRole"] =
                "Working role is required";
              isValid = false;
            } else if (
              ![
                "Support Worker",
                "Senior Support Worker",
                "Manager",
                "Team Leader"
              ].includes(employmentDetails.workingRole)
            ) {
              newErrors["employmentDetails.workingRole"] =
                "Working role must be one of [Support Worker, Senior Support Worker, Manager, Team Leader]";
              isValid = false;
            }
            if (!employmentDetails.contractType?.trim()) {
              newErrors["employmentDetails.contractType"] =
                "Contract type is required";
              isValid = false;
            } else if (
              ![
                "Permanent",
                "Temporary",
                "Contract",
                "Zero Hours",
                "Part-time",
                "Full-time"
              ].includes(employmentDetails.contractType)
            ) {
              newErrors["employmentDetails.contractType"] =
                "Contract type must be one of [Permanent, Temporary, Contract, Zero Hours, Part-time, Full-time]";
              isValid = false;
            }
            if (
              employmentDetails.contractType === "Full-time" &&
              employmentDetails.weeklyContractedHours === 0
            ) {
              newErrors["employmentDetails.weeklyContractedHours"] =
                "Weekly contracted hours are required for full-time employment";
              isValid = false;
            }
            if (
              !employmentDetails.wtrOptOut &&
              !employmentDetails.bankDetails.bankName?.trim()
            ) {
              newErrors["employmentDetails.bankDetails.bankName"] =
                "Bank name is required";
              isValid = false;
            }
            if (
              !employmentDetails.wtrOptOut &&
              !employmentDetails.bankDetails.accountNumber?.trim()
            ) {
              newErrors["employmentDetails.bankDetails.accountNumber"] =
                "Account number is required";
              isValid = false;
            }
            if (
              !employmentDetails.wtrOptOut &&
              !employmentDetails.bankDetails.sortCode?.trim()
            ) {
              newErrors["employmentDetails.bankDetails.sortCode"] =
                "Sort code is required";
              isValid = false;
            }
            if (!employmentDetails.optInForPension) {
              newErrors["employmentDetails.optInForPension"] =
                "Opt-in for pension is required";
              isValid = false;
            }
            break;
          }

          case "documents": {
            const requiredDocuments = [
              "Proof of ID",
              "Right to Work Document",
              "DBS Certificate",
              "contract document",
              "CV"
            ];
            const documents = formData.documents || [];

            // Debug logging
            console.log("Documents validation - Current documents:", documents);
            console.log("Required documents:", requiredDocuments);

            // Check each required document individually
            requiredDocuments.forEach((docType) => {
              const doc = documents.find((d) => d.documentType === docType);
              console.log(`Checking required document: ${docType}`, doc);

              if (!doc) {
                // Document doesn't exist
                newErrors["documents"] =
                  `Missing required document: ${docType}`;
                isValid = false;
                return;
              }

              // Check if document has file
              if (!doc.fileUrl || doc.fileUrl.trim() === "") {
                newErrors[`documents.${docType}.fileUrl`] =
                  "Document file is required";
                isValid = false;
              }

              // Check if document has expiry date
              if (!doc.expiryDate || doc.expiryDate.trim() === "") {
                newErrors[`documents.${docType}.expiryDate`] =
                  "Expiry date is required";
                isValid = false;
              } else {
                // Check if expiry date is valid
                const expiryDate = new Date(doc.expiryDate);
                const today = new Date();
                if (expiryDate < today) {
                  newErrors[`documents.${docType}.expiryDate`] =
                    "Document has expired";
                  isValid = false;
                }
              }
            });

            // If there are missing documents, show the general error
            const missingDocuments = requiredDocuments.filter(
              (docType) =>
                !documents.some((doc) => doc.documentType === docType)
            );

            console.log("Missing documents:", missingDocuments);

            if (missingDocuments.length > 0) {
              newErrors["documents"] =
                `Missing required documents: ${missingDocuments.join(", ")}`;
              isValid = false;
            }

            break;
          }

          case "payment": {
            const { paymentDetails } = formData;
            if (
              paymentDetails.regularPay === undefined ||
              paymentDetails.regularPay === null ||
              paymentDetails.regularPay <= 0
            ) {
              newErrors["paymentDetails.regularPay"] =
                "Regular pay is required and must be greater than 0";
              isValid = false;
            }

            if (
              paymentDetails.overtimePay === undefined ||
              paymentDetails.overtimePay === null ||
              paymentDetails.overtimePay <= 0
            ) {
              newErrors["paymentDetails.overtimePay"] =
                "Overtime pay is required and must be greater than 0";
              isValid = false;
            }

            if (
              paymentDetails.holidayPay === undefined ||
              paymentDetails.holidayPay === null ||
              paymentDetails.holidayPay <= 0
            ) {
              newErrors["paymentDetails.holidayPay"] =
                "Holiday pay is required and must be greater than 0";
              isValid = false;
            }

            if (
              paymentDetails.paternityPay === undefined ||
              paymentDetails.paternityPay === null ||
              paymentDetails.paternityPay <= 0
            ) {
              newErrors["paymentDetails.paternityPay"] =
                "Paternity pay is required and must be greater than 0";
              isValid = false;
            }

            if (
              paymentDetails.maternityPay === undefined ||
              paymentDetails.maternityPay === null ||
              paymentDetails.maternityPay <= 0
            ) {
              newErrors["paymentDetails.maternityPay"] =
                "Maternity pay is required and must be greater than 0";
              isValid = false;
            }
            break;
          }

          case "training": {
            const { training } = formData;
            if (!training || training.length === 0) {
              newErrors["training"] = "At least one training is required";
              isValid = false;
              break;
            }

            training.forEach((trainingItem, index) => {
              if (!trainingItem.trainingName?.trim()) {
                newErrors[`training.${index}.trainingName`] =
                  "Training name is required";
                isValid = false;
              }

              if (!trainingItem.status?.trim()) {
                newErrors[`training.${index}.status`] = "Status is required";
                isValid = false;
              }

              if (!trainingItem.completedDate?.trim()) {
                newErrors[`training.${index}.completedDate`] =
                  "Completion date is required";
                isValid = false;
              }

              if (!trainingItem.expiryDate?.trim()) {
                newErrors[`training.${index}.expiryDate`] =
                  "Expiry date is required";
                isValid = false;
              } else {
                const expiryDate = new Date(trainingItem.expiryDate);
                const today = new Date();
                if (expiryDate < today) {
                  newErrors[`training.${index}.expiryDate`] =
                    "Expiry date cannot be in the past";
                  isValid = false;
                }
              }

              if (!trainingItem.certificateUrl?.trim()) {
                newErrors[`training.${index}.certificateUrl`] =
                  "Certificate is required";
                isValid = false;
              }
            });
            break;
          }

          default:
            isValid = true;
        }

        set({ errors: newErrors });
        return isValid;
      },

      // Add a new function for validating a single skill
      validateSkill: (
        skill: {
          skillName: string;
          dateOfExpiry: string;
          certificateUrl: string;
        },
        index: number
      ) => {
        const newErrors: Record<string, string> = {};
        let hasErrors = false;

        if (!skill.skillName?.trim()) {
          newErrors[`skills.${index}.skillName`] = "Skill name is required";
          hasErrors = true;
        }

        if (!skill.dateOfExpiry?.trim()) {
          newErrors[`skills.${index}.dateOfExpiry`] = "Expiry date is required";
          hasErrors = true;
        } else {
          const expiryDate = new Date(skill.dateOfExpiry);
          const today = new Date();
          if (expiryDate < today) {
            newErrors[`skills.${index}.dateOfExpiry`] =
              "Expiry date cannot be in the past";
            hasErrors = true;
          }
        }

        if (!skill.certificateUrl?.trim()) {
          newErrors[`skills.${index}.certificateUrl`] =
            "Certificate is required";
          hasErrors = true;
        }

        set((state) => ({
          errors: {
            ...state.errors,
            ...newErrors
          }
        }));

        return !hasErrors;
      },

      // Add a new function for validating a single training item
      validateTraining: (
        trainingItem: {
          trainingName: string;
          status: string;
          completedDate: string;
          expiryDate: string;
          certificateUrl: string;
        },
        index: number
      ) => {
        const newErrors: Record<string, string> = {};
        let hasErrors = false;

        const validTrainingNames = [
          "Manual Handling",
          "Infection Prevention and Control",
          "Basic Life Support",
          "Safeguarding Adults and Children",
          "Health and Safety",
          "Fire Safety Awareness",
          "Food Hygiene",
          "Equality and Diversity",
          "Dementia Awareness",
          "Data Protection (GDPR)",
          "Learning Disability",
          "Medication Administration",
          "Other"
        ];

        if (!trainingItem.trainingName?.trim()) {
          newErrors[`training.${index}.trainingName`] =
            "Training name is required";
          hasErrors = true;
        } else if (!validTrainingNames.includes(trainingItem.trainingName)) {
          newErrors[`training.${index}.trainingName`] =
            `Training name must be one of: ${validTrainingNames.join(", ")}`;
          hasErrors = true;
        }

        if (!trainingItem.status?.trim()) {
          newErrors[`training.${index}.status`] = "Status is required";
          hasErrors = true;
        }

        if (!trainingItem.completedDate?.trim()) {
          newErrors[`training.${index}.completedDate`] =
            "Completion date is required";
          hasErrors = true;
        }

        if (!trainingItem.expiryDate?.trim()) {
          newErrors[`training.${index}.expiryDate`] = "Expiry date is required";
          hasErrors = true;
        } else {
          const expiryDate = new Date(trainingItem.expiryDate);
          const today = new Date();
          if (expiryDate < today) {
            newErrors[`training.${index}.expiryDate`] =
              "Expiry date cannot be in the past";
            hasErrors = true;
          }
        }

        if (!trainingItem.certificateUrl?.trim()) {
          newErrors[`training.${index}.certificateUrl`] =
            "Certificate is required";
          hasErrors = true;
        }

        set((state) => ({
          errors: {
            ...state.errors,
            ...newErrors
          }
        }));

        return !hasErrors;
      },

      getFilledFormData: () => {
        const { formData } = get();
        const filledData: Partial<StaffFormData> = {
          saveAsDraft: true
        };

        // Helper function to check if a value is filled
        const isFilled = (value: any): boolean => {
          if (value === null || value === undefined) return false;
          if (typeof value === "string") return value.trim() !== "";
          if (typeof value === "number") return value !== 0;
          if (Array.isArray(value)) return value.length > 0;
          if (typeof value === "object") {
            return Object.values(value).some(isFilled);
          }
          return true;
        };

        // Helper function to clean empty values from an object
        const cleanObject = (obj: any): any => {
          if (Array.isArray(obj)) {
            return obj.filter((item) => isFilled(item)).map(cleanObject);
          }
          if (obj && typeof obj === "object") {
            const cleaned: any = {};
            for (const [key, value] of Object.entries(obj)) {
              if (isFilled(value)) {
                cleaned[key] = cleanObject(value);
              }
            }
            return Object.keys(cleaned).length > 0 ? cleaned : undefined;
          }
          return obj;
        };

        // Process each section of the form
        for (const [section, data] of Object.entries(formData)) {
          if (section === "saveAsDraft") continue;

          console.log(
            `Processing section: ${section}, sendAvilability: ${get().sendAvilability}`
          );

          // Skip availability if sendAvilability is false
          if (section === "availability" && !get().sendAvilability) {
            console.log(
              "Skipping availability because sendAvilability is false"
            );
            continue;
          }

          // Special handling for availability when sendAvilability is true
          if (section === "availability") {
            console.log("Processing availability section");
            if (
              formData.isAvailbilitySkipedByManager &&
              (!data || data.length === 0)
            ) {
              console.log(
                "Skipping availability because it's skipped by manager and empty"
              );
              continue; // Skip adding availability if it's skipped and empty
            }
          }

          // Special handling for contactDetails to ensure addressDetails are always included
          if (section === "contactDetails" && data) {
            console.log("Processing contactDetails section:", data);
            const contactData = { ...data };
            const defaultContactData = initialFormData.contactDetails;

            // Check if there's any meaningful contact data
            let hasContactData = false;

            // Check addressDetails
            if (contactData.addressDetails) {
              const addressDetails = { ...contactData.addressDetails };
              const defaultAddressDetails = defaultContactData.addressDetails;

              // Check if any address field has been filled (more lenient check)
              if (
                addressDetails.postalCode?.trim() !== "" ||
                addressDetails.address?.trim() !== "" ||
                (addressDetails.location &&
                  (addressDetails.location.coordinates[0] !== 0 ||
                    addressDetails.location.coordinates[1] !== 0))
              ) {
                hasContactData = true;
                console.log("Address details found:", addressDetails);
              }

              // Only remove fields that are empty or default values
              if (!addressDetails.postalCode?.trim()) {
                delete addressDetails.postalCode;
              }
              if (!addressDetails.address?.trim()) {
                delete addressDetails.address;
              }
              if (addressDetails.isManual === false) {
                delete addressDetails.isManual;
              }
              if (
                !addressDetails.location ||
                (addressDetails.location.coordinates[0] === 0 &&
                  addressDetails.location.coordinates[1] === 0)
              ) {
                delete addressDetails.location;
              }

              contactData.addressDetails = addressDetails;
            }

            // Check emergencyContact
            if (contactData.emergencyContact) {
              const emergencyContact = contactData.emergencyContact;
              const defaultEmergencyContact =
                defaultContactData.emergencyContact;

              // Check if any emergency contact field has been filled (more lenient check)
              if (
                emergencyContact.fullName?.trim() !== "" ||
                emergencyContact.relationshipToStaff?.trim() !== "" ||
                emergencyContact.primaryPhoneNumber?.trim() !== "" ||
                emergencyContact.email?.trim() !== ""
              ) {
                hasContactData = true;
                console.log("Emergency contact found:", emergencyContact);
              }

              // Only remove fields that are empty
              if (!emergencyContact.fullName?.trim()) {
                delete emergencyContact.fullName;
              }
              if (!emergencyContact.relationshipToStaff?.trim()) {
                delete emergencyContact.relationshipToStaff;
              }
              if (!emergencyContact.primaryPhoneNumber?.trim()) {
                delete emergencyContact.primaryPhoneNumber;
              }
              if (!emergencyContact.email?.trim()) {
                delete emergencyContact.email;
              }

              // Handle emergency contact address details
              if (emergencyContact.addressDetails) {
                const emergencyAddressDetails = {
                  ...emergencyContact.addressDetails
                };
                const defaultEmergencyAddressDetails =
                  defaultContactData.emergencyContact.addressDetails;

                // Check if any emergency address field has been filled
                if (
                  emergencyAddressDetails.postalCode?.trim() !== "" ||
                  emergencyAddressDetails.address?.trim() !== "" ||
                  (emergencyAddressDetails.location &&
                    (emergencyAddressDetails.location.coordinates[0] !== 0 ||
                      emergencyAddressDetails.location.coordinates[1] !== 0))
                ) {
                  hasContactData = true;
                  console.log(
                    "Emergency address details found:",
                    emergencyAddressDetails
                  );
                }

                // Only remove fields that are empty or default values
                if (!emergencyAddressDetails.postalCode?.trim()) {
                  delete emergencyAddressDetails.postalCode;
                }
                if (!emergencyAddressDetails.address?.trim()) {
                  delete emergencyAddressDetails.address;
                }
                if (emergencyAddressDetails.isManual === false) {
                  delete emergencyAddressDetails.isManual;
                }
                if (
                  !emergencyAddressDetails.location ||
                  (emergencyAddressDetails.location.coordinates[0] === 0 &&
                    emergencyAddressDetails.location.coordinates[1] === 0)
                ) {
                  delete emergencyAddressDetails.location;
                }

                contactData.emergencyContact.addressDetails =
                  emergencyAddressDetails;
              }
            }

            console.log("hasContactData:", hasContactData);
            console.log("contactData after processing:", contactData);

            // If there's any contact data, include it in the payload
            if (hasContactData) {
              console.log(
                `Adding section ${section} to filledData:`,
                contactData
              );
              filledData[section as keyof StaffFormData] = contactData;
            }
            continue;
          }

          const cleanedData = cleanObject(data);
          if (cleanedData) {
            filledData[section as keyof StaffFormData] = cleanedData;
          }
        }

        return filledData;
      },

      saveAsDraft: (): Partial<StaffFormData> => {
        const { formData, formMode, staffId, sendAvilability } = get();
        const filledData: Partial<StaffFormData> = {
          saveAsDraft: true // Always set to true when saving as draft
        };

        console.log("saveAsDraft - sendAvilability:", sendAvilability);
        console.log(
          "saveAsDraft - formData.availability:",
          formData.availability
        );

        // Helper function to check if a value is filled by user
        const isFilledByUser = (value: any, defaultValue: any): boolean => {
          if (value === null || value === undefined) return false;
          if (typeof value === "string")
            return value.trim() !== "" && value !== defaultValue;
          if (typeof value === "number")
            return value !== 0 && value !== defaultValue;
          if (Array.isArray(value))
            return (
              value.length > 0 &&
              JSON.stringify(value) !== JSON.stringify(defaultValue)
            );
          if (typeof value === "object") {
            // For objects, check if they have any non-default values
            return Object.entries(value).some(([key, val]) =>
              isFilledByUser(val, defaultValue?.[key])
            );
          }
          return value !== defaultValue;
        };

        // Helper function to clean default values from an object
        const cleanObject = (obj: any, defaultObj: any): any => {
          if (Array.isArray(obj)) {
            const filtered = obj
              .filter((item, index) =>
                isFilledByUser(item, defaultObj?.[index])
              )
              .map((item, index) => cleanObject(item, defaultObj?.[index]));
            return filtered.length > 0 ? filtered : undefined;
          }
          if (obj && typeof obj === "object") {
            const cleaned: any = {};
            let hasFilledValues = false;

            for (const [key, value] of Object.entries(obj)) {
              const defaultValue = defaultObj?.[key];
              if (isFilledByUser(value, defaultValue)) {
                const cleanedValue = cleanObject(value, defaultValue);
                if (cleanedValue !== undefined) {
                  cleaned[key] = cleanedValue;
                  hasFilledValues = true;
                }
              }
            }

            return hasFilledValues ? cleaned : undefined;
          }
          return obj;
        };

        // Process each section of the form
        for (const [section, data] of Object.entries(formData)) {
          if (section === "saveAsDraft") continue;

          console.log(
            `Processing section: ${section}, sendAvilability: ${sendAvilability}`
          );

          // Skip availability if sendAvilability is false
          if (section === "availability" && !sendAvilability) {
            console.log(
              "Skipping availability because sendAvilability is false"
            );
            continue;
          }

          // Special handling for availability when sendAvilability is true
          if (section === "availability") {
            console.log("Processing availability section");
            if (
              formData.isAvailbilitySkipedByManager &&
              (!data || data.length === 0)
            ) {
              console.log(
                "Skipping availability because it's skipped by manager and empty"
              );
              continue; // Skip adding availability if it's skipped and empty
            }
          }

          // Special handling for contactDetails to ensure addressDetails are always included
          if (section === "contactDetails" && data) {
            console.log("Processing contactDetails section:", data);
            const contactData = { ...data };
            const defaultContactData = initialFormData.contactDetails;

            // Check if there's any meaningful contact data
            let hasContactData = false;

            // Check addressDetails
            if (contactData.addressDetails) {
              const addressDetails = { ...contactData.addressDetails };
              const defaultAddressDetails = defaultContactData.addressDetails;

              // Check if any address field has been filled (more lenient check)
              if (
                addressDetails.postalCode?.trim() !== "" ||
                addressDetails.address?.trim() !== "" ||
                (addressDetails.location &&
                  (addressDetails.location.coordinates[0] !== 0 ||
                    addressDetails.location.coordinates[1] !== 0))
              ) {
                hasContactData = true;
                console.log("Address details found:", addressDetails);
              }

              // Only remove fields that are empty or default values
              if (!addressDetails.postalCode?.trim()) {
                delete addressDetails.postalCode;
              }
              if (!addressDetails.address?.trim()) {
                delete addressDetails.address;
              }
              if (addressDetails.isManual === false) {
                delete addressDetails.isManual;
              }
              if (
                !addressDetails.location ||
                (addressDetails.location.coordinates[0] === 0 &&
                  addressDetails.location.coordinates[1] === 0)
              ) {
                delete addressDetails.location;
              }

              contactData.addressDetails = addressDetails;
            }

            // Check emergencyContact
            if (contactData.emergencyContact) {
              const emergencyContact = contactData.emergencyContact;
              const defaultEmergencyContact =
                defaultContactData.emergencyContact;

              // Check if any emergency contact field has been filled (more lenient check)
              if (
                emergencyContact.fullName?.trim() !== "" ||
                emergencyContact.relationshipToStaff?.trim() !== "" ||
                emergencyContact.primaryPhoneNumber?.trim() !== "" ||
                emergencyContact.email?.trim() !== ""
              ) {
                hasContactData = true;
                console.log("Emergency contact found:", emergencyContact);
              }

              // Only remove fields that are empty
              if (!emergencyContact.fullName?.trim()) {
                delete emergencyContact.fullName;
              }
              if (!emergencyContact.relationshipToStaff?.trim()) {
                delete emergencyContact.relationshipToStaff;
              }
              if (!emergencyContact.primaryPhoneNumber?.trim()) {
                delete emergencyContact.primaryPhoneNumber;
              }
              if (!emergencyContact.email?.trim()) {
                delete emergencyContact.email;
              }

              // Handle emergency contact address details
              if (emergencyContact.addressDetails) {
                const emergencyAddressDetails = {
                  ...emergencyContact.addressDetails
                };
                const defaultEmergencyAddressDetails =
                  defaultContactData.emergencyContact.addressDetails;

                // Check if any emergency address field has been filled
                if (
                  emergencyAddressDetails.postalCode?.trim() !== "" ||
                  emergencyAddressDetails.address?.trim() !== "" ||
                  (emergencyAddressDetails.location &&
                    (emergencyAddressDetails.location.coordinates[0] !== 0 ||
                      emergencyAddressDetails.location.coordinates[1] !== 0))
                ) {
                  hasContactData = true;
                  console.log(
                    "Emergency address details found:",
                    emergencyAddressDetails
                  );
                }

                // Only remove fields that are empty or default values
                if (!emergencyAddressDetails.postalCode?.trim()) {
                  delete emergencyAddressDetails.postalCode;
                }
                if (!emergencyAddressDetails.address?.trim()) {
                  delete emergencyAddressDetails.address;
                }
                if (emergencyAddressDetails.isManual === false) {
                  delete emergencyAddressDetails.isManual;
                }
                if (
                  !emergencyAddressDetails.location ||
                  (emergencyAddressDetails.location.coordinates[0] === 0 &&
                    emergencyAddressDetails.location.coordinates[1] === 0)
                ) {
                  delete emergencyAddressDetails.location;
                }

                contactData.emergencyContact.addressDetails =
                  emergencyAddressDetails;
              }
            }

            console.log("hasContactData:", hasContactData);
            console.log("contactData after processing:", contactData);

            // If there's any contact data, include it in the payload
            if (hasContactData) {
              console.log(
                `Adding section ${section} to filledData:`,
                contactData
              );
              filledData[section as keyof StaffFormData] = contactData;
            }
            continue;
          }

          const defaultData = initialFormData[section as keyof StaffFormData];
          const cleanedData = cleanObject(data, defaultData);
          if (cleanedData) {
            console.log(
              `Adding section ${section} to filledData:`,
              cleanedData
            );
            filledData[section as keyof StaffFormData] = cleanedData;
          }
        }

        // Don't reset the form immediately - only return the data
        // Form reset should happen after successful API call
        console.log("Final filled data:", filledData);
        return filledData;
      },

      // New function to reset form after successful draft save
      resetFormAfterDraftSave: () => {
        const { formMode } = get();
        // Only reset the form if we're in create mode
        if (formMode === "create") {
          // Clear localStorage to prevent persistence issues
          if (typeof window !== "undefined") {
            localStorage.removeItem("staff-form-storage");
          }

          set({
            formData: initialFormData,
            currentStep: 0,
            steps: formSteps,
            errors: {},
            isVerified: false,
            progress: 0,
            active: false
          });
        }
      },

      submitForm: async (
        createStaff: (formData: StaffFormData) => Promise<void>
      ) => {
        set({ isLoading: true });
        try {
          const formData = get().formData;

          // Create submit data without availability if conditions are met
          const { availability, ...restFormData } = formData;
          const submitData = {
            ...restFormData,
            saveAsDraft: false,
            ...(!formData.isAvailbilitySkipedByManager &&
              get().sendAvilability && {
                availability: availability || []
              })
          };
          console.log("restFormData complete form data:", restFormData);

          console.log("Submitting complete form data:", submitData);
          await createStaff(submitData);
          get().resetForm();
          set({ isLoading: false });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      // New improved function to initialize form from Staff data
      initializeFormFromStaff: (staff: Staff, mode: "edit" | "view") => {
        console.log("Initializing form from staff data:", staff);

        // Convert Staff to StaffFormData
        const staffFormData = convertStaffToFormData(staff);

        // Create steps based on sectionProgress
        const updatedSteps = createStepsFromProgress(staff.sectionProgress);

        // Set availability flag based on existing availability
        const sendAvilability = !(
          staff.availability && staff.availability.length > 0
        );

        set({
          formData: staffFormData,
          currentStep: 0,
          steps: updatedSteps,
          errors: {},
          formMode: mode,
          staffId: staff._id,
          sendAvilability,
          isVerified: staff.verified,
          progress: staff.progress,
          active: staff.active
        });
      },

      resetForm: () => {
        // Clear localStorage to prevent persistence issues
        if (typeof window !== "undefined") {
          localStorage.removeItem("staff-form-storage");
        }

        set({
          formData: initialFormData,
          currentStep: 0,
          steps: formSteps,
          errors: {},
          formMode: "create",
          staffId: undefined,
          isVerified: false,
          progress: 0,
          active: false,
          sendAvilability: true,
          managerCanEditAvailability: true
        });
      },

      getInitialFormData: () => initialFormData,

      // Simplified handleEdit function
      handleEdit: (staff: Staff) => {
        console.log("Handling edit for staff:", staff);
        get().initializeFormFromStaff(staff, "edit");
        set({
          managerCanEditStatus: staff.managerCanEditStatus,
          managerCanEditAvailability: staff.managerCanEditAvailability
        });
      },

      // Simplified handleView function
      handleView: (staff: Staff) => {
        console.log("Handling view for staff:", staff);
        get().initializeFormFromStaff(staff, "view");
        set({
          managerCanEditStatus: staff.managerCanEditStatus,
          managerCanEditAvailability: staff.managerCanEditAvailability
        });
      },

      switchToEditMode: () => {
        const { formMode } = get();
        if (formMode === "view") {
          set({ formMode: "edit" });
        }
      }
    }),

    {
      name: "staff-form-storage",
      version: 1
    }
  )
);
