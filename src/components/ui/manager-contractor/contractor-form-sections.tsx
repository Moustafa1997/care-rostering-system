import React from "react";
import { Input } from "@/components/ui/input";
import { DatePickerForm } from "@/components/ui/date-picker";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { UseFormReturn, Controller } from "react-hook-form";
import { ContractorFormData } from "@/hooks/contractors/useRegisterContractor";

interface FormSectionProps {
  form: UseFormReturn<ContractorFormData>;
}

export function CompanyDetailsSection({ form }: FormSectionProps) {
  const {
    register,
    formState: { errors },
    control
  } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-500">Company Details</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" {...register("companyName")} />
          {errors.companyName && (
            <p className="text-sm text-red-500">{errors.companyName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="tradingName">Trading Name</Label>
          <Input id="tradingName" {...register("tradingName")} />
          {errors.tradingName && (
            <p className="text-sm text-red-500">{errors.tradingName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="registrationNumber">Registration Number</Label>
          <Input id="registrationNumber" {...register("registrationNumber")} />
          {errors.registrationNumber && (
            <p className="text-sm text-red-500">
              {errors.registrationNumber.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="careType">Care Type</Label>
          <Controller
            name="careType"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select care type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nursing">Nursing</SelectItem>
                  <SelectItem value="Residential">Residential</SelectItem>
                  <SelectItem value="Domiciliary">Domiciliary</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.careType && (
            <p className="text-sm text-red-500">{errors.careType.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="branchCount">Branch Count</Label>
          <Input
            id="branchCount"
            type="number"
            {...register("branchCount", { valueAsNumber: true })}
          />
          {errors.branchCount && (
            <p className="text-sm text-red-500">{errors.branchCount.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="cqcRegistrationNumber">CQC Registration Number</Label>
          <Input
            id="cqcRegistrationNumber"
            {...register("cqcRegistrationNumber")}
          />
          {errors.cqcRegistrationNumber && (
            <p className="text-sm text-red-500">
              {errors.cqcRegistrationNumber.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function ContactPersonSection({ form }: FormSectionProps) {
  const {
    register,
    formState: { errors }
  } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-500">Contact Person</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contactPerson.name">Name</Label>
          <Input id="contactPerson.name" {...register("contactPerson.name")} />
          {errors.contactPerson?.name && (
            <p className="text-sm text-red-500">
              {errors.contactPerson.name.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPerson.email">Email</Label>
          <Input
            id="contactPerson.email"
            type="email"
            {...register("contactPerson.email")}
          />
          {errors.contactPerson?.email && (
            <p className="text-sm text-red-500">
              {errors.contactPerson.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactPerson.phone">Phone</Label>
          <Input
            id="contactPerson.phone"
            {...register("contactPerson.phone")}
          />
          {errors.contactPerson?.phone && (
            <p className="text-sm text-red-500">
              {errors.contactPerson.phone.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function ContractDetailsSection({ form }: FormSectionProps) {
  const {
    register,
    formState: { errors },
    control,
    watch
  } = form;

  const isOngoing = watch("contract.isOngoing");
  const hasTrial = watch("contract.trial.enabled");

  return (
    <section>
      <h2 className="text-3xl font-semibold text-gray-500">Contract Details</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="contract.startDate">Start Date</Label>
          <Controller
            name="contract.startDate"
            control={control}
            render={({ field }) => (
              <DatePickerForm
                value={field.value || ""}
                onChange={field.onChange}
              />
            )}
          />
          {errors.contract?.startDate && (
            <p className="text-sm text-red-500">
              {errors.contract.startDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contract.endDate">End Date</Label>
          <Controller
            name="contract.endDate"
            control={control}
            render={({ field }) => (
              <DatePickerForm
                value={field.value || ""}
                onChange={field.onChange}
                disabled={isOngoing}
              />
            )}
          />
          {errors.contract?.endDate && (
            <p className="text-sm text-red-500">
              {errors.contract.endDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contract.noticePeriod">Notice Period</Label>
          <Controller
            name="contract.noticePeriod"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select notice period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 week">1 Week</SelectItem>
                  <SelectItem value="2 weeks">2 Weeks</SelectItem>
                  <SelectItem value="1 month">1 Month</SelectItem>
                  <SelectItem value="3 months">3 Months</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.contract?.noticePeriod && (
            <p className="text-sm text-red-500">
              {errors.contract.noticePeriod.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contract.paymentFrequency">Payment Frequency</Label>
          <Controller
            name="contract.paymentFrequency"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Quarterly">Quarterly</SelectItem>
                  <SelectItem value="Annually">Annually</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.contract?.paymentFrequency && (
            <p className="text-sm text-red-500">
              {errors.contract.paymentFrequency.message}
            </p>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="contract.isOngoing"
            {...register("contract.isOngoing")}
          />
          <Label htmlFor="contract.isOngoing">Ongoing Contract</Label>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="contract.trial.enabled"
            {...register("contract.trial.enabled")}
          />
          <Label htmlFor="contract.trial.enabled">Enable Trial Period</Label>
        </div>

        {hasTrial && (
          <>
            <div className="space-y-2">
              <Label htmlFor="contract.trial.startDate">Trial Start Date</Label>
              <Controller
                name="contract.trial.startDate"
                control={control}
                render={({ field }) => (
                  <DatePickerForm
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.contract?.trial?.startDate && (
                <p className="text-sm text-red-500">
                  {errors.contract.trial.startDate.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contract.trial.endDate">Trial End Date</Label>
              <Controller
                name="contract.trial.endDate"
                control={control}
                render={({ field }) => (
                  <DatePickerForm
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.contract?.trial?.endDate && (
                <p className="text-sm text-red-500">
                  {errors.contract.trial.endDate.message}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export function PricingSection({ form }: FormSectionProps) {
  const {
    register,
    formState: { errors },
    control
  } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-500">Pricing</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pricing.plan">Plan</Label>
          <Controller
            name="pricing.plan"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.pricing?.plan && (
            <p className="text-sm text-red-500">
              {errors.pricing.plan.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing.userLicenses">User Licenses</Label>
          <Input
            id="pricing.userLicenses"
            type="number"
            {...register("pricing.userLicenses", { valueAsNumber: true })}
          />
          {errors.pricing?.userLicenses && (
            <p className="text-sm text-red-500">
              {errors.pricing.userLicenses.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing.setupFee">Setup Fee</Label>
          <Input
            id="pricing.setupFee"
            type="number"
            {...register("pricing.setupFee", { valueAsNumber: true })}
          />
          {errors.pricing?.setupFee && (
            <p className="text-sm text-red-500">
              {errors.pricing.setupFee.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing.discount">Discount (%)</Label>
          <Input
            id="pricing.discount"
            type="number"
            {...register("pricing.discount", { valueAsNumber: true })}
          />
          {errors.pricing?.discount && (
            <p className="text-sm text-red-500">
              {errors.pricing.discount.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing.paymentMethod">Payment Method</Label>
          <Controller
            name="pricing.paymentMethod"
            control={control}
            render={({ field }) => (
              <Select value={field.value || ""} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Invoice">Invoice</SelectItem>
                  <SelectItem value="Direct Debit">Direct Debit</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.pricing?.paymentMethod && (
            <p className="text-sm text-red-500">
              {errors.pricing.paymentMethod.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing.billing.contactName">
            Billing Contact Name
          </Label>
          <Input
            id="pricing.billing.contactName"
            {...register("pricing.billing.contactName")}
          />
          {errors.pricing?.billing?.contactName && (
            <p className="text-sm text-red-500">
              {errors.pricing.billing.contactName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="pricing.billing.email">Billing Contact Email</Label>
          <Input
            id="pricing.billing.email"
            type="email"
            {...register("pricing.billing.email")}
          />
          {errors.pricing?.billing?.email && (
            <p className="text-sm text-red-500">
              {errors.pricing.billing.email.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export function DocumentsSection({ form }: FormSectionProps) {
  const { setValue, getValues } = form;

  return (
    <section>
      <h2 className="text-xl font-semibold text-gray-500">Documents</h2>
      <div className="border border-[#E1E1E1] rounded-md py-8 px-4 shadow">
        <FileUpload
          onFilesChange={(files) => setValue("documents", files)}
          initialFiles={getValues("documents")}
          accept=".pdf,.doc,.docx"
          maxSize={10}
        />
      </div>
    </section>
  );
}
