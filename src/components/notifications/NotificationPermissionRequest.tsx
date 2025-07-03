"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useNotificationContext } from "@/providers/NotificationProvider";
import { useToast } from "@/hooks/use-toast";
import { BraveTroubleshootingGuide } from "./BraveTroubleshootingGuide";
import { detectBrowser } from "@/utils/browserCompatibility";

interface NotificationPermissionRequestProps {
  onComplete?: () => void;
  onSkip?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function NotificationPermissionRequest({
  onComplete,
  onSkip,
  open = false,
  onOpenChange
}: NotificationPermissionRequestProps) {
  const [isRequesting, setIsRequesting] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const {
    initializeFCM,
    isPermissionGranted,
    browserInfo,
    compatibilityStatus
  } = useNotificationContext();
  const { success, error: showError } = useToast();

  const handleRequestPermission = async () => {
    setIsRequesting(true);
    try {
      const granted = await initializeFCM();
      if (granted) {
        success("Notifications enabled successfully!");
        onComplete?.();
      } else {
        // Show troubleshooting for Brave browser
        if (browserInfo?.isBrave) {
          setShowTroubleshooting(true);
        } else {
          showError("Please enable notifications to stay updated");
        }
      }
    } catch (error) {
      showError("Failed to enable notifications");
      // Show troubleshooting for Brave browser on error too
      if (browserInfo?.isBrave) {
        setShowTroubleshooting(true);
      }
    } finally {
      setIsRequesting(false);
    }
  };

  const handleSkip = () => {
    onSkip?.();
  };

  const handleRetry = async () => {
    setShowTroubleshooting(false);
    await handleRequestPermission();
  };

  // If permission is already granted, don't show the request
  if (isPermissionGranted === true) {
    return null;
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Enable Notifications</DialogTitle>
            <DialogDescription>
              Stay updated with important notifications about your care
              rostering system.
              {browserInfo?.isBrave && (
                <span className="block mt-2 text-orange-600 font-medium">
                  ⚠️ Brave browser detected - you may need to adjust privacy
                  settings
                </span>
              )}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Browser compatibility warning for Brave */}
            {browserInfo?.isBrave && !compatibilityStatus?.isCompatible && (
              <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <p className="text-sm text-orange-800">
                  <strong>Brave Browser Detected:</strong> Brave's privacy
                  features may block notifications. You may need to disable
                  Brave Shields or adjust site permissions.
                </p>
              </div>
            )}

            <div className="text-sm text-gray-600 space-y-2">
              <p>• Get notified about new assignments and schedule changes</p>
              <p>• Receive important updates about your shifts</p>
              <p>• Stay informed about system announcements</p>
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleSkip}
              disabled={isRequesting}
            >
              Skip for now
            </Button>
            <Button onClick={handleRequestPermission} disabled={isRequesting}>
              {isRequesting ? "Enabling..." : "Enable Notifications"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Brave Troubleshooting Guide */}
      {showTroubleshooting && browserInfo?.isBrave && (
        <Dialog
          open={showTroubleshooting}
          onOpenChange={setShowTroubleshooting}
        >
          <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Brave Browser Setup Required</DialogTitle>
              <DialogDescription>
                Brave browser requires additional setup to enable notifications.
                Follow the steps below to configure your browser.
              </DialogDescription>
            </DialogHeader>

            <BraveTroubleshootingGuide onRetry={handleRetry} />

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowTroubleshooting(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
