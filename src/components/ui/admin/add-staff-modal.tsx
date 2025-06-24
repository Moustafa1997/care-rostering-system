import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { useFillByStaff } from "@/hooks/staff/useFillByStaff";
import { useToast } from "@/hooks/use-toast";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function AddStaffModal({
  isOpen,
  onClose,
  onConfirm
}: ConfirmationModalProps) {
  const [selected, setSelected] = useState("manager");
  const [staffEmail, setStaffEmail] = useState("");
  const { formData, formMode, resetForm } = useStaffFormStore();
  const { fillByStaff, isPending, error } = useFillByStaff();
  const { error: showError } = useToast();
  const lastErrorRef = useRef<string | null>(null);

  // Handle error from the hook
  useEffect(() => {
    if (error && error.message !== lastErrorRef.current) {
      lastErrorRef.current = error.message;
      showError(error.message || "Failed to send invitation to staff member");
    }
  }, [error, showError]);

  const handleManagerSelect = () => {
    setSelected("manager");
    setStaffEmail("");
  };

  const handleStaffSelect = () => {
    setSelected("staff");
    setStaffEmail("");
  };

  const handleProceed = async () => {
    if (selected === "staff") {
      if (!staffEmail.trim()) {
        // You might want to show an error message here
        return;
      }
      await fillByStaff(staffEmail.trim());
      onClose();
      window.location.reload();
    } else {
      // Original manager flow
      resetForm();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-left text-lg font-semibold mb-0">
            Add new Staff
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-start gap-6 my-4">
          <Label className="flex items-center gap-2 cursor-pointer">
            <Input
              className="!w-3"
              type="radio"
              name="fill"
              value="manager"
              checked={selected === "manager"}
              onChange={handleManagerSelect}
            />
            <span className="text-sm">Fill up by Manager</span>
          </Label>
          <Label className="flex items-center gap-2 cursor-pointer">
            <Input
              className="!w-3"
              type="radio"
              name="fill"
              value="staff"
              checked={selected === "staff"}
              onChange={handleStaffSelect}
            />
            <span className="text-sm">Fill up by Staff</span>
          </Label>
        </div>

        {selected === "staff" && (
          <div className="mb-4">
            <Label htmlFor="staff-email" className="text-sm font-medium">
              Staff Email
            </Label>
            <Input
              id="staff-email"
              type="email"
              placeholder="Enter staff email address"
              value={staffEmail}
              onChange={(e) => setStaffEmail(e.target.value)}
              className="mt-1"
            />
          </div>
        )}

        <div className="flex justify-center">
          {selected === "staff" ? (
            <Button
              variant="default"
              className="w-48"
              onClick={handleProceed}
              disabled={isPending || !staffEmail.trim()}
            >
              {isPending ? "Sending..." : "Proceed"}
            </Button>
          ) : (
            <Link
              href="/dashboard/admin/team/staff-detail"
              onClick={() => {
                if (formMode !== "create") {
                  resetForm();
                }
                onClose();
              }}
            >
              <Button variant="default" className="w-48">
                Proceed
              </Button>
            </Link>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
