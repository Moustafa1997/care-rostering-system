import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import ViewContactDetails from "@/components/ui/admin/view-contact-details";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { useAddress } from "@/hooks/address/useAddress";
import { useCoordinates } from "@/hooks/address/useCoordinates";

export default function ContactDetails() {
  const {
    formData,
    setField,
    errors,
    validateStep,
    formMode,
    steps,
    switchToEditMode
  } = useStaffFormStore();
  const { contactDetails } = formData;

  // State for manual entry mode - initialize based on store values
  const [mainAddressMode, setMainAddressMode] = useState<"postal" | "manual">(
    contactDetails.addressDetails.isManual ? "manual" : "postal"
  );
  const [emergencyAddressMode, setEmergencyAddressMode] = useState<
    "postal" | "manual"
  >(
    contactDetails.emergencyContact.addressDetails.isManual
      ? "manual"
      : "postal"
  );

  // Manual address fields state
  const [mainManualAddress, setMainManualAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: ""
  });

  const [emergencyManualAddress, setEmergencyManualAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    county: "",
    postcode: ""
  });

  // Use the useAddress hook for both address fields
  const { addresses: mainAddresses, isLoading: isMainAddressLoading } =
    useAddress(contactDetails.addressDetails.postalCode);
  const {
    addresses: emergencyAddresses,
    isLoading: isEmergencyAddressLoading
  } = useAddress(contactDetails.emergencyContact.addressDetails.postalCode);

  // Use coordinates hook for manual entry
  const { coordinates: mainCoordinates, isLoading: isMainCoordinatesLoading } =
    useCoordinates(mainManualAddress.postcode);
  const {
    coordinates: emergencyCoordinates,
    isLoading: isEmergencyCoordinatesLoading
  } = useCoordinates(emergencyManualAddress.postcode);

  // Handle address mode change and update store
  const handleMainAddressModeChange = (mode: "postal" | "manual") => {
    setMainAddressMode(mode);
    setField("contactDetails", "addressDetails.isManual", mode === "manual");

    // If switching to manual mode and there's an existing address, parse it
    if (mode === "manual" && contactDetails.addressDetails.address) {
      const addressParts = contactDetails.addressDetails.address.split(", ");
      setMainManualAddress({
        addressLine1: addressParts[0] || "",
        addressLine2: addressParts[1] || "",
        city: addressParts[2] || "",
        county: addressParts[3] || "",
        postcode:
          addressParts[4] || contactDetails.addressDetails.postalCode || ""
      });
    }
  };

  const handleEmergencyAddressModeChange = (mode: "postal" | "manual") => {
    setEmergencyAddressMode(mode);
    setField(
      "contactDetails",
      "emergencyContact.addressDetails.isManual",
      mode === "manual"
    );

    // If switching to manual mode and there's an existing address, parse it
    if (
      mode === "manual" &&
      contactDetails.emergencyContact.addressDetails.address
    ) {
      const addressParts =
        contactDetails.emergencyContact.addressDetails.address.split(", ");
      setEmergencyManualAddress({
        addressLine1: addressParts[0] || "",
        addressLine2: addressParts[1] || "",
        city: addressParts[2] || "",
        county: addressParts[3] || "",
        postcode:
          addressParts[4] ||
          contactDetails.emergencyContact.addressDetails.postalCode ||
          ""
      });
    }
  };

  const handleFieldChange = (
    section: string,
    field: string,
    value: string | any
  ) => {
    setField(section, field, value);
    // If postal code changes, clear the address field
    if (field === "postalCode") {
      const addressField = field.replace("postalCode", "address");
      setField(section, addressField, "");

      // Set isManual to false when using postal code search
      const isManualField = field.replace("postalCode", "isManual");
      setField(section, isManualField, false);
    }

    //validateStep("contact-details");
  };

  const handleManualAddressChange = (
    addressType: "main" | "emergency",
    field: string,
    value: string
  ) => {
    if (addressType === "main") {
      setMainManualAddress((prev) => ({ ...prev, [field]: value }));
    } else {
      setEmergencyManualAddress((prev) => ({ ...prev, [field]: value }));
    }

    // Update the form data with the combined address
    const addressData =
      addressType === "main" ? mainManualAddress : emergencyManualAddress;
    const updatedAddressData = { ...addressData, [field]: value };

    // Combine address fields in order
    const combinedAddress = [
      updatedAddressData.addressLine1,
      updatedAddressData.addressLine2,
      updatedAddressData.city,
      updatedAddressData.county,
      updatedAddressData.postcode
    ]
      .filter(Boolean)
      .join(", ");

    const section = "contactDetails";
    const fieldPath =
      addressType === "main"
        ? "addressDetails.address"
        : "emergencyContact.addressDetails.address";
    const postalCodePath =
      addressType === "main"
        ? "addressDetails.postalCode"
        : "emergencyContact.addressDetails.postalCode";
    const isManualPath =
      addressType === "main"
        ? "addressDetails.isManual"
        : "emergencyContact.addressDetails.isManual";

    // Set the address and postal code
    setField(section, fieldPath, combinedAddress);
    setField(section, postalCodePath, updatedAddressData.postcode);

    // Ensure isManual flag is set to true for manual entry
    setField(section, isManualPath, true);

    validateStep("contact-details");
  };

  // Effect to set coordinates when they become available
  useEffect(() => {
    if (mainCoordinates && mainAddressMode === "manual") {
      setField("contactDetails", "addressDetails.location", mainCoordinates);
    }
  }, [mainCoordinates, mainAddressMode, setField]);

  useEffect(() => {
    if (emergencyCoordinates && emergencyAddressMode === "manual") {
      setField(
        "contactDetails",
        "emergencyContact.addressDetails.location",
        emergencyCoordinates
      );
    }
  }, [emergencyCoordinates, emergencyAddressMode, setField]);

  // Effect to sync local state with store values
  useEffect(() => {
    setMainAddressMode(
      contactDetails.addressDetails.isManual ? "manual" : "postal"
    );
  }, [contactDetails.addressDetails.isManual]);

  useEffect(() => {
    setEmergencyAddressMode(
      contactDetails.emergencyContact.addressDetails.isManual
        ? "manual"
        : "postal"
    );
  }, [contactDetails.emergencyContact.addressDetails.isManual]);

  // Effect to populate manual address fields when mode is manual and address exists
  useEffect(() => {
    if (mainAddressMode === "manual" && contactDetails.addressDetails.address) {
      const addressParts = contactDetails.addressDetails.address.split(", ");
      setMainManualAddress({
        addressLine1: addressParts[0] || "",
        addressLine2: addressParts[1] || "",
        city: addressParts[2] || "",
        county: addressParts[3] || "",
        postcode:
          addressParts[4] || contactDetails.addressDetails.postalCode || ""
      });
    }
  }, [
    mainAddressMode,
    contactDetails.addressDetails.address,
    contactDetails.addressDetails.postalCode
  ]);

  useEffect(() => {
    if (
      emergencyAddressMode === "manual" &&
      contactDetails.emergencyContact.addressDetails.address
    ) {
      const addressParts =
        contactDetails.emergencyContact.addressDetails.address.split(", ");
      setEmergencyManualAddress({
        addressLine1: addressParts[0] || "",
        addressLine2: addressParts[1] || "",
        city: addressParts[2] || "",
        county: addressParts[3] || "",
        postcode:
          addressParts[4] ||
          contactDetails.emergencyContact.addressDetails.postalCode ||
          ""
      });
    }
  }, [
    emergencyAddressMode,
    contactDetails.emergencyContact.addressDetails.address,
    contactDetails.emergencyContact.addressDetails.postalCode
  ]);

  const getFieldError = (fieldName: string) => {
    return errors[fieldName];
  };

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  // Find the contact-details step
  const contactDetailsStep = steps.find(
    (step) => step.id === "contact-details"
  );

  // If in view mode and the step is completed, render the view component
  if (formMode === "view" && contactDetailsStep?.isCompleted) {
    return <ViewContactDetails />;
  }

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Contact detail */}
        <div className="flex justify-start items-center">
          <h2 className="text-xl font-semibold text-gray-500">
            Contact detail
          </h2>
        </div>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="2xl:col-span-6 lg:col-span-12">
            {/* Address Entry Mode Selection */}
            <div className="mb-4">
              <label className="block text-sm font-normal text-[#2F3E53] mb-2">
                Address Entry Method
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mainAddressMode"
                    value="postal"
                    checked={mainAddressMode === "postal"}
                    onChange={(e) =>
                      handleMainAddressModeChange(
                        e.target.value as "postal" | "manual"
                      )
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Postal Code Search</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="mainAddressMode"
                    value="manual"
                    checked={mainAddressMode === "manual"}
                    onChange={(e) =>
                      handleMainAddressModeChange(
                        e.target.value as "postal" | "manual"
                      )
                    }
                    className="mr-2"
                  />
                  <span className="text-sm">Manual Entry</span>
                </label>
              </div>
            </div>

            {mainAddressMode === "postal" ? (
              <>
                <div className="mb-4 w-56">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Postal code
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder="Enter"
                    value={contactDetails.addressDetails.postalCode}
                    onChange={(e) =>
                      handleFieldChange(
                        "contactDetails",
                        "addressDetails.postalCode",
                        e.target.value
                      )
                    }
                    className={
                      getFieldError("addressDetails.postalCode")
                        ? "border-red"
                        : ""
                    }
                  />
                  {getFieldError("addressDetails.postalCode") && (
                    <p className="text-red text-sm mt-1">
                      {getFieldError("addressDetails.postalCode")}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Full Residential Address
                  </label>
                  <div className="w-full border border-blue-soft bg-white rounded-md">
                    <Select
                      value={contactDetails.addressDetails.address}
                      onValueChange={(value) => {
                        handleFieldChange(
                          "contactDetails",
                          "addressDetails.address",
                          value
                        );
                        handleFieldChange(
                          "contactDetails",
                          "addressDetails.location",
                          mainAddresses.find((addr) => addr.address === value)
                            ?.location
                        );
                        // Set isManual to false when selecting from postal code search
                        setField(
                          "contactDetails",
                          "addressDetails.isManual",
                          false
                        );
                      }}
                      disabled={
                        isMainAddressLoading ||
                        !contactDetails.addressDetails.postalCode ||
                        mainAddresses.length === 0
                      }
                    >
                      <SelectTrigger
                        className={`w-full !px-3 h-10 border-none focus:ring-0 ${
                          getFieldError("addressDetails.address")
                            ? "border-red"
                            : ""
                        }`}
                      >
                        <SelectValue
                          placeholder={
                            !contactDetails.addressDetails.postalCode
                              ? "Please enter postal code"
                              : isMainAddressLoading
                                ? "Loading addresses..."
                                : mainAddresses.length === 0
                                  ? "No addresses found"
                                  : "Select address"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {mainAddresses.map((address) => (
                          <SelectItem key={address.id} value={address.address}>
                            {address.address}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {getFieldError("addressDetails.address") && (
                      <p className="text-red text-sm mt-1">
                        {getFieldError("addressDetails.address")}
                      </p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Address Line one
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder="Enter"
                    value={mainManualAddress.addressLine1}
                    onChange={(e) =>
                      handleManualAddressChange(
                        "main",
                        "addressLine1",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Address Line two
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder="Optional"
                    value={mainManualAddress.addressLine2}
                    onChange={(e) =>
                      handleManualAddressChange(
                        "main",
                        "addressLine2",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    City or Town
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder="Enter"
                    value={mainManualAddress.city}
                    onChange={(e) =>
                      handleManualAddressChange("main", "city", e.target.value)
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    County
                  </label>
                  <div className="w-full border border-blue-soft bg-white rounded-md">
                    <Select
                      value={mainManualAddress.county}
                      onValueChange={(value) =>
                        handleManualAddressChange("main", "county", value)
                      }
                    >
                      <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bedfordshire">
                          Bedfordshire
                        </SelectItem>
                        <SelectItem value="Berkshire">Berkshire</SelectItem>
                        <SelectItem value="Bristol">Bristol</SelectItem>
                        <SelectItem value="Buckinghamshire">
                          Buckinghamshire
                        </SelectItem>
                        <SelectItem value="Cambridgeshire">
                          Cambridgeshire
                        </SelectItem>
                        <SelectItem value="Cheshire">Cheshire</SelectItem>
                        <SelectItem value="Cornwall">Cornwall</SelectItem>
                        <SelectItem value="Cumbria">Cumbria</SelectItem>
                        <SelectItem value="Derbyshire">Derbyshire</SelectItem>
                        <SelectItem value="Devon">Devon</SelectItem>
                        <SelectItem value="Dorset">Dorset</SelectItem>
                        <SelectItem value="Durham">Durham</SelectItem>
                        <SelectItem value="East Sussex">East Sussex</SelectItem>
                        <SelectItem value="Essex">Essex</SelectItem>
                        <SelectItem value="Gloucestershire">
                          Gloucestershire
                        </SelectItem>
                        <SelectItem value="Greater London">
                          Greater London
                        </SelectItem>
                        <SelectItem value="Greater Manchester">
                          Greater Manchester
                        </SelectItem>
                        <SelectItem value="Hampshire">Hampshire</SelectItem>
                        <SelectItem value="Herefordshire">
                          Herefordshire
                        </SelectItem>
                        <SelectItem value="Hertfordshire">
                          Hertfordshire
                        </SelectItem>
                        <SelectItem value="Isle of Wight">
                          Isle of Wight
                        </SelectItem>
                        <SelectItem value="Kent">Kent</SelectItem>
                        <SelectItem value="Lancashire">Lancashire</SelectItem>
                        <SelectItem value="Leicestershire">
                          Leicestershire
                        </SelectItem>
                        <SelectItem value="Lincolnshire">
                          Lincolnshire
                        </SelectItem>
                        <SelectItem value="Merseyside">Merseyside</SelectItem>
                        <SelectItem value="Norfolk">Norfolk</SelectItem>
                        <SelectItem value="Northamptonshire">
                          Northamptonshire
                        </SelectItem>
                        <SelectItem value="Northumberland">
                          Northumberland
                        </SelectItem>
                        <SelectItem value="Nottinghamshire">
                          Nottinghamshire
                        </SelectItem>
                        <SelectItem value="Oxfordshire">Oxfordshire</SelectItem>
                        <SelectItem value="Rutland">Rutland</SelectItem>
                        <SelectItem value="Shropshire">Shropshire</SelectItem>
                        <SelectItem value="Somerset">Somerset</SelectItem>
                        <SelectItem value="South Yorkshire">
                          South Yorkshire
                        </SelectItem>
                        <SelectItem value="Staffordshire">
                          Staffordshire
                        </SelectItem>
                        <SelectItem value="Suffolk">Suffolk</SelectItem>
                        <SelectItem value="Surrey">Surrey</SelectItem>
                        <SelectItem value="Tyne and Wear">
                          Tyne and Wear
                        </SelectItem>
                        <SelectItem value="Warwickshire">
                          Warwickshire
                        </SelectItem>
                        <SelectItem value="West Midlands">
                          West Midlands
                        </SelectItem>
                        <SelectItem value="West Sussex">West Sussex</SelectItem>
                        <SelectItem value="West Yorkshire">
                          West Yorkshire
                        </SelectItem>
                        <SelectItem value="Wiltshire">Wiltshire</SelectItem>
                        <SelectItem value="Worcestershire">
                          Worcestershire
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="mb-4 w-full">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Postcode
                  </label>
                  <Input
                    variant="bordered"
                    type="text"
                    placeholder="Enter"
                    value={mainManualAddress.postcode}
                    onChange={(e) =>
                      handleManualAddressChange(
                        "main",
                        "postcode",
                        e.target.value
                      )
                    }
                  />
                  {isMainCoordinatesLoading && mainManualAddress.postcode && (
                    <p className="text-blue text-sm mt-1">
                      Loading coordinates...
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="2xl:col-span-6 lg:col-span-12">
            <ImageComponent
              src="/images/map.svg"
              width={500}
              height={500}
              alt="map"
            />
          </div>
        </div>

        {/* Emergency Contact */}
        <h2 className="text-xl font-semibold text-gray-500">
          Emergency Contact
        </h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12 flex justify-start 2xl:gap-8 lg:gap-3">
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Full Name
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={contactDetails.emergencyContact.fullName}
                onChange={(e) =>
                  handleFieldChange(
                    "contactDetails",
                    "emergencyContact.fullName",
                    e.target.value
                  )
                }
                className={
                  getFieldError("emergencyContact.fullName") ? "border-red" : ""
                }
              />
              {getFieldError("emergencyContact.fullName") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("emergencyContact.fullName")}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Relationship to Staff
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={contactDetails.emergencyContact.relationshipToStaff}
                onChange={(e) =>
                  handleFieldChange(
                    "contactDetails",
                    "emergencyContact.relationshipToStaff",
                    e.target.value
                  )
                }
                className={
                  getFieldError("emergencyContact.relationshipToStaff")
                    ? "border-red"
                    : ""
                }
              />
              {getFieldError("emergencyContact.relationshipToStaff") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("emergencyContact.relationshipToStaff")}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-12 flex justify-start 2xl:gap-8 lg:gap-3 mt-4">
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Primary Phone Number
              </label>
              <Input
                variant="bordered"
                type="tel"
                placeholder="Enter"
                value={contactDetails.emergencyContact.primaryPhoneNumber}
                onChange={(e) =>
                  handleFieldChange(
                    "contactDetails",
                    "emergencyContact.primaryPhoneNumber",
                    e.target.value
                  )
                }
                className={
                  getFieldError("emergencyContact.primaryPhoneNumber")
                    ? "border-red"
                    : ""
                }
              />
              {getFieldError("emergencyContact.primaryPhoneNumber") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("emergencyContact.primaryPhoneNumber")}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Email
              </label>
              <Input
                variant="bordered"
                type="email"
                placeholder="Enter"
                value={contactDetails.emergencyContact.email}
                onChange={(e) =>
                  handleFieldChange(
                    "contactDetails",
                    "emergencyContact.email",
                    e.target.value
                  )
                }
                className={
                  getFieldError("emergencyContact.email") ? "border-red" : ""
                }
              />
              {getFieldError("emergencyContact.email") && (
                <p className="text-red text-sm mt-1">
                  {getFieldError("emergencyContact.email")}
                </p>
              )}
            </div>
          </div>
          <div className="col-span-12 flex 2xl:flex-row lg:flex-col justify-start 2xl:gap-8 lg:gap-3 mt-4">
            <div className="w-full">
              {/* Emergency Address Entry Mode Selection */}
              <div className="mb-4">
                <label className="block text-sm font-normal text-[#2F3E53] mb-2">
                  Emergency Address Entry Method
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="emergencyAddressMode"
                      value="postal"
                      checked={emergencyAddressMode === "postal"}
                      onChange={(e) =>
                        handleEmergencyAddressModeChange(
                          e.target.value as "postal" | "manual"
                        )
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Postal Code Search</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="emergencyAddressMode"
                      value="manual"
                      checked={emergencyAddressMode === "manual"}
                      onChange={(e) =>
                        handleEmergencyAddressModeChange(
                          e.target.value as "postal" | "manual"
                        )
                      }
                      className="mr-2"
                    />
                    <span className="text-sm">Manual Entry</span>
                  </label>
                </div>
              </div>

              {emergencyAddressMode === "postal" ? (
                <>
                  <div className="mb-4 w-56">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      Postal code
                    </label>
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Enter"
                      value={
                        contactDetails.emergencyContact.addressDetails
                          .postalCode
                      }
                      onChange={(e) =>
                        handleFieldChange(
                          "contactDetails",
                          "emergencyContact.addressDetails.postalCode",
                          e.target.value
                        )
                      }
                      className={
                        getFieldError(
                          "emergencyContact.addressDetails.postalCode"
                        )
                          ? "border-red"
                          : ""
                      }
                    />
                    {getFieldError(
                      "emergencyContact.addressDetails.postalCode"
                    ) && (
                      <p className="text-red text-sm mt-1">
                        {getFieldError(
                          "emergencyContact.addressDetails.postalCode"
                        )}
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      Full Residential Address
                    </label>
                    <div className="w-full border border-blue-soft bg-white rounded-md">
                      <Select
                        value={
                          contactDetails.emergencyContact.addressDetails.address
                        }
                        onValueChange={(value) => {
                          handleFieldChange(
                            "contactDetails",
                            "emergencyContact.addressDetails.address",
                            value
                          );
                          handleFieldChange(
                            "contactDetails",
                            "emergencyContact.addressDetails.location",
                            emergencyAddresses.find(
                              (addr) => addr.address === value
                            )?.location
                          );
                          // Set isManual to false when selecting from postal code search
                          setField(
                            "contactDetails",
                            "emergencyContact.addressDetails.isManual",
                            false
                          );
                        }}
                        disabled={
                          isEmergencyAddressLoading ||
                          !contactDetails.emergencyContact.addressDetails
                            .postalCode ||
                          emergencyAddresses.length === 0
                        }
                      >
                        <SelectTrigger
                          className={`w-full !px-3 h-10 border-none focus:ring-0 ${
                            getFieldError(
                              "emergencyContact.addressDetails.address"
                            )
                              ? "border-red"
                              : ""
                          }`}
                        >
                          <SelectValue
                            placeholder={
                              !contactDetails.emergencyContact.addressDetails
                                .postalCode
                                ? "Please enter postal code"
                                : isEmergencyAddressLoading
                                  ? "Loading addresses..."
                                  : emergencyAddresses.length === 0
                                    ? "No addresses found"
                                    : "Select address"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {emergencyAddresses.map((address) => (
                            <SelectItem
                              key={address.id}
                              value={address.address}
                            >
                              {address.address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {getFieldError(
                        "emergencyContact.addressDetails.address"
                      ) && (
                        <p className="text-red text-sm mt-1">
                          {getFieldError(
                            "emergencyContact.addressDetails.address"
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      Address Line one
                    </label>
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Enter"
                      value={emergencyManualAddress.addressLine1}
                      onChange={(e) =>
                        handleManualAddressChange(
                          "emergency",
                          "addressLine1",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      Address Line two
                    </label>
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Optional"
                      value={emergencyManualAddress.addressLine2}
                      onChange={(e) =>
                        handleManualAddressChange(
                          "emergency",
                          "addressLine2",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      City or Town
                    </label>
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Enter"
                      value={emergencyManualAddress.city}
                      onChange={(e) =>
                        handleManualAddressChange(
                          "emergency",
                          "city",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      County
                    </label>
                    <div className="w-full border border-blue-soft bg-white rounded-md">
                      <Select
                        value={emergencyManualAddress.county}
                        onValueChange={(value) =>
                          handleManualAddressChange(
                            "emergency",
                            "county",
                            value
                          )
                        }
                      >
                        <SelectTrigger className="w-full !px-3 h-10 border-none focus:ring-0">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bedfordshire">
                            Bedfordshire
                          </SelectItem>
                          <SelectItem value="Berkshire">Berkshire</SelectItem>
                          <SelectItem value="Bristol">Bristol</SelectItem>
                          <SelectItem value="Buckinghamshire">
                            Buckinghamshire
                          </SelectItem>
                          <SelectItem value="Cambridgeshire">
                            Cambridgeshire
                          </SelectItem>
                          <SelectItem value="Cheshire">Cheshire</SelectItem>
                          <SelectItem value="Cornwall">Cornwall</SelectItem>
                          <SelectItem value="Cumbria">Cumbria</SelectItem>
                          <SelectItem value="Derbyshire">Derbyshire</SelectItem>
                          <SelectItem value="Devon">Devon</SelectItem>
                          <SelectItem value="Dorset">Dorset</SelectItem>
                          <SelectItem value="Durham">Durham</SelectItem>
                          <SelectItem value="East Sussex">
                            East Sussex
                          </SelectItem>
                          <SelectItem value="Essex">Essex</SelectItem>
                          <SelectItem value="Gloucestershire">
                            Gloucestershire
                          </SelectItem>
                          <SelectItem value="Greater London">
                            Greater London
                          </SelectItem>
                          <SelectItem value="Greater Manchester">
                            Greater Manchester
                          </SelectItem>
                          <SelectItem value="Hampshire">Hampshire</SelectItem>
                          <SelectItem value="Herefordshire">
                            Herefordshire
                          </SelectItem>
                          <SelectItem value="Hertfordshire">
                            Hertfordshire
                          </SelectItem>
                          <SelectItem value="Isle of Wight">
                            Isle of Wight
                          </SelectItem>
                          <SelectItem value="Kent">Kent</SelectItem>
                          <SelectItem value="Lancashire">Lancashire</SelectItem>
                          <SelectItem value="Leicestershire">
                            Leicestershire
                          </SelectItem>
                          <SelectItem value="Lincolnshire">
                            Lincolnshire
                          </SelectItem>
                          <SelectItem value="Merseyside">Merseyside</SelectItem>
                          <SelectItem value="Norfolk">Norfolk</SelectItem>
                          <SelectItem value="Northamptonshire">
                            Northamptonshire
                          </SelectItem>
                          <SelectItem value="Northumberland">
                            Northumberland
                          </SelectItem>
                          <SelectItem value="Nottinghamshire">
                            Nottinghamshire
                          </SelectItem>
                          <SelectItem value="Oxfordshire">
                            Oxfordshire
                          </SelectItem>
                          <SelectItem value="Rutland">Rutland</SelectItem>
                          <SelectItem value="Shropshire">Shropshire</SelectItem>
                          <SelectItem value="Somerset">Somerset</SelectItem>
                          <SelectItem value="South Yorkshire">
                            South Yorkshire
                          </SelectItem>
                          <SelectItem value="Staffordshire">
                            Staffordshire
                          </SelectItem>
                          <SelectItem value="Suffolk">Suffolk</SelectItem>
                          <SelectItem value="Surrey">Surrey</SelectItem>
                          <SelectItem value="Tyne and Wear">
                            Tyne and Wear
                          </SelectItem>
                          <SelectItem value="Warwickshire">
                            Warwickshire
                          </SelectItem>
                          <SelectItem value="West Midlands">
                            West Midlands
                          </SelectItem>
                          <SelectItem value="West Sussex">
                            West Sussex
                          </SelectItem>
                          <SelectItem value="West Yorkshire">
                            West Yorkshire
                          </SelectItem>
                          <SelectItem value="Wiltshire">Wiltshire</SelectItem>
                          <SelectItem value="Worcestershire">
                            Worcestershire
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="mb-4 w-full">
                    <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                      Postcode
                    </label>
                    <Input
                      variant="bordered"
                      type="text"
                      placeholder="Enter"
                      value={emergencyManualAddress.postcode}
                      onChange={(e) =>
                        handleManualAddressChange(
                          "emergency",
                          "postcode",
                          e.target.value
                        )
                      }
                    />
                    {isEmergencyCoordinatesLoading &&
                      emergencyManualAddress.postcode && (
                        <p className="text-blue text-sm mt-1">
                          Loading coordinates...
                        </p>
                      )}
                  </div>
                </>
              )}
            </div>
            <div className="w-full">
              <ImageComponent
                src="/images/map.svg"
                width={500}
                height={500}
                alt="map"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
