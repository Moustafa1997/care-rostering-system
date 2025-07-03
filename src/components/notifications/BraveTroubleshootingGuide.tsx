"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ChevronDown,
  ChevronRight,
  Shield,
  Settings,
  Bell,
  ExternalLink,
  RefreshCw
} from "lucide-react";
import {
  detectBrowser,
  getTroubleshootingSteps,
  checkServiceWorkerRegistration,
  registerServiceWorker
} from "@/utils/browserCompatibility";

interface BraveTroubleshootingGuideProps {
  onRetry?: () => void;
  className?: string;
}

export function BraveTroubleshootingGuide({
  onRetry,
  className = ""
}: BraveTroubleshootingGuideProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [swStatus, setSwStatus] = useState<{
    isRegistered: boolean;
    error?: string;
  } | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const browserInfo = detectBrowser();
  const troubleshootingSteps = getTroubleshootingSteps(browserInfo);

  const checkServiceWorker = async () => {
    setIsChecking(true);
    try {
      const status = await checkServiceWorkerRegistration();
      setSwStatus(status);
    } catch (error) {
      setSwStatus({
        isRegistered: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleRegisterServiceWorker = async () => {
    setIsChecking(true);
    try {
      const result = await registerServiceWorker();
      if (result.success) {
        setSwStatus({ isRegistered: true });
      } else {
        setSwStatus({ isRegistered: false, error: result.error });
      }
    } catch (error) {
      setSwStatus({
        isRegistered: false,
        error: error instanceof Error ? error.message : "Unknown error"
      });
    } finally {
      setIsChecking(false);
    }
  };

  // Only show for Brave browser
  if (!browserInfo.isBrave) {
    return null;
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-orange-500" />
          Brave Browser Notification Setup
        </CardTitle>
        <CardDescription>
          Brave browser has privacy features that may block notifications.
          Follow these steps to enable notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Browser Info */}
        <div className="flex items-center gap-2">
          <Badge variant="outline">Brave {browserInfo.version}</Badge>
          <Badge
            variant={
              browserInfo.notificationPermission === "granted"
                ? "default"
                : "destructive"
            }
          >
            {browserInfo.notificationPermission === "granted"
              ? "Notifications Enabled"
              : "Notifications Disabled"}
          </Badge>
        </div>

        {/* Service Worker Status */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Service Worker Status:</span>
            <div className="flex items-center gap-2">
              {swStatus ? (
                <Badge
                  variant={swStatus.isRegistered ? "default" : "destructive"}
                >
                  {swStatus.isRegistered ? "Registered" : "Not Registered"}
                </Badge>
              ) : (
                <Badge variant="secondary">Unknown</Badge>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={checkServiceWorker}
                disabled={isChecking}
              >
                {isChecking ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  "Check"
                )}
              </Button>
            </div>
          </div>

          {swStatus && !swStatus.isRegistered && (
            <Alert>
              <AlertDescription className="flex items-center justify-between">
                <span>Service worker not registered</span>
                <Button
                  size="sm"
                  onClick={handleRegisterServiceWorker}
                  disabled={isChecking}
                >
                  Register
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {swStatus?.error && (
            <Alert variant="destructive">
              <AlertDescription>{swStatus.error}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Troubleshooting Steps */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              <span>Show Troubleshooting Steps</span>
              {isOpen ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-4">
            <div className="space-y-3">
              {troubleshootingSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div
                      className="text-sm"
                      dangerouslySetInnerHTML={{ __html: step }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              window.open("brave://settings/content/notifications", "_blank")
            }
          >
            <Settings className="h-4 w-4 mr-2" />
            Brave Settings
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const url = window.location.href;
              window.open(
                `brave://settings/content/siteDetails?site=${encodeURIComponent(url)}`,
                "_blank"
              );
            }}
          >
            <Bell className="h-4 w-4 mr-2" />
            Site Permissions
          </Button>

          {onRetry && (
            <Button variant="default" size="sm" onClick={onRetry}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Setup
            </Button>
          )}
        </div>

        {/* Additional Info */}
        <Alert>
          <AlertDescription>
            <strong>Note:</strong> After making changes to Brave settings, you
            may need to refresh the page or restart the browser for the changes
            to take effect.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
