"use client";
import React, { useState } from "react";
import ToggleSwitch from "./toggle-switch";

// Example component showing different use cases of the ToggleSwitch
export default function ToggleSwitchExamples() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [autoSave, setAutoSave] = useState(true);
  const [premium, setPremium] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <h2 className="text-xl font-semibold">Toggle Switch Examples</h2>

      {/* Basic toggle with labels */}
      <div className="space-y-2">
        <h3 className="font-medium">Basic Toggle</h3>
        <ToggleSwitch
          isOn={notifications}
          onToggle={() => setNotifications(!notifications)}
          leftLabel="Notifications"
          rightLabel="Silent"
        />
      </div>

      {/* Toggle with disabled state and tooltip */}
      <div className="space-y-2">
        <h3 className="font-medium">Disabled Toggle with Tooltip</h3>
        <ToggleSwitch
          isOn={darkMode}
          onToggle={() => setDarkMode(!darkMode)}
          disabled={true}
          disabledReason="Dark mode is not available in your current plan"
          leftLabel="Light"
          rightLabel="Dark"
        />
      </div>

      {/* Toggle without labels */}
      <div className="space-y-2">
        <h3 className="font-medium">Toggle without Labels</h3>
        <ToggleSwitch isOn={autoSave} onToggle={() => setAutoSave(!autoSave)} />
      </div>

      {/* Different sizes */}
      <div className="space-y-4">
        <h3 className="font-medium">Different Sizes</h3>
        <div className="space-y-2">
          <ToggleSwitch
            isOn={premium}
            onToggle={() => setPremium(!premium)}
            size="sm"
            leftLabel="Basic"
            rightLabel="Premium"
          />
          <ToggleSwitch
            isOn={premium}
            onToggle={() => setPremium(!premium)}
            size="md"
            leftLabel="Basic"
            rightLabel="Premium"
          />
          <ToggleSwitch
            isOn={premium}
            onToggle={() => setPremium(!premium)}
            size="lg"
            leftLabel="Basic"
            rightLabel="Premium"
          />
        </div>
      </div>

      {/* Custom styling */}
      <div className="space-y-2">
        <h3 className="font-medium">Custom Styling</h3>
        <ToggleSwitch
          isOn={notifications}
          onToggle={() => setNotifications(!notifications)}
          leftLabel="Email"
          rightLabel="SMS"
          className="shadow-lg"
        />
      </div>
    </div>
  );
}
