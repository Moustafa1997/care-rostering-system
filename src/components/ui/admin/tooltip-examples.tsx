"use client";
import React, { useState } from "react";
import {
  Info,
  HelpCircle,
  AlertCircle,
  AlertTriangle,
  Settings,
  User,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import TooltipWrapper, {
  InfoTooltip,
  HelpTooltip,
  ErrorTooltip,
  WarningTooltip
} from "./tooltip-wrapper";
import ToggleSwitch from "./toggle-switch";

export default function TooltipExamples() {
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="space-y-8 p-6">
      <h2 className="text-2xl font-semibold">Tooltip Examples</h2>

      {/* Basic TooltipWrapper */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Basic TooltipWrapper</h3>
        <div className="flex gap-4 items-center">
          <TooltipWrapper content="This is a basic tooltip">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Hover me
            </button>
          </TooltipWrapper>

          <TooltipWrapper content="Tooltip on the right" side="right">
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Right tooltip
            </button>
          </TooltipWrapper>

          <TooltipWrapper content="Tooltip on the bottom" side="bottom">
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Bottom tooltip
            </button>
          </TooltipWrapper>
        </div>
      </section>

      {/* Specialized Tooltips */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Specialized Tooltips</h3>
        <div className="flex gap-4 items-center">
          <InfoTooltip content="This provides additional information about the feature">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
              <Info size={16} />
              Information
            </button>
          </InfoTooltip>

          <HelpTooltip content="Click here to get help with this feature">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              <HelpCircle size={16} />
              Help
            </button>
          </HelpTooltip>

          <ErrorTooltip content="This action cannot be undone">
            <button className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200">
              <AlertCircle size={16} />
              Delete
            </button>
          </ErrorTooltip>

          <WarningTooltip content="This feature is in beta and may have issues">
            <button className="flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded hover:bg-orange-200">
              <AlertTriangle size={16} />
              Beta Feature
            </button>
          </WarningTooltip>
        </div>
      </section>

      {/* Form Elements with Tooltips */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Form Elements with Tooltips</h3>
        <div className="space-y-4 max-w-md">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              Password
              <TooltipWrapper content="Password must be at least 8 characters long">
                <Info size={14} className="text-gray-400 cursor-help" />
              </TooltipWrapper>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Enter password"
              />
              <TooltipWrapper
                content={showPassword ? "Hide password" : "Show password"}
              >
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </TooltipWrapper>
            </div>
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              Username
              <HelpTooltip content="Your username will be visible to other users">
                <HelpCircle size={14} className="text-gray-400 cursor-help" />
              </HelpTooltip>
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter username"
            />
          </div>
        </div>
      </section>

      {/* Settings with Tooltips */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Settings with Tooltips</h3>
        <div className="space-y-4 max-w-md">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Settings size={20} className="text-gray-500" />
              <div>
                <p className="font-medium">Auto-save</p>
                <p className="text-sm text-gray-500">
                  Automatically save your work
                </p>
              </div>
            </div>
            <ToggleSwitch
              isOn={notifications}
              onToggle={() => setNotifications(!notifications)}
            />
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-500" />
              <div>
                <p className="font-medium">Profile visibility</p>
                <p className="text-sm text-gray-500">
                  Make your profile public
                </p>
              </div>
            </div>
            <TooltipWrapper
              content="This setting is locked for security reasons"
              disabled={false}
            >
              <div className="opacity-50 cursor-not-allowed">
                <ToggleSwitch
                  isOn={false}
                  onToggle={() => {}}
                  disabled={true}
                />
              </div>
            </TooltipWrapper>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-3">
              <Lock size={20} className="text-gray-500" />
              <div>
                <p className="font-medium">Two-factor authentication</p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security
                </p>
              </div>
            </div>
            <WarningTooltip content="Two-factor authentication is recommended for better security">
              <ToggleSwitch
                isOn={darkMode}
                onToggle={() => setDarkMode(!darkMode)}
              />
            </WarningTooltip>
          </div>
        </div>
      </section>

      {/* Conditional Tooltips */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Conditional Tooltips</h3>
        <div className="flex gap-4 items-center">
          <TooltipWrapper
            content="This tooltip only shows when the button is disabled"
            disabled={false}
          >
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Always enabled
            </button>
          </TooltipWrapper>

          <TooltipWrapper
            content="This tooltip only shows when the button is disabled"
            disabled={true}
          >
            <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded cursor-not-allowed">
              Always disabled
            </button>
          </TooltipWrapper>

          <TooltipWrapper
            content="This tooltip only shows when the button is disabled"
            disabled={false}
          >
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Sometimes disabled
            </button>
          </TooltipWrapper>
        </div>
      </section>

      {/* Custom Styling */}
      <section className="space-y-4">
        <h3 className="text-lg font-medium">Custom Styling</h3>
        <div className="flex gap-4 items-center">
          <TooltipWrapper
            content="Custom styled tooltip with longer text"
            className="bg-purple-600 text-white border-purple-700"
            maxWidth="max-w-sm"
          >
            <button className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
              Custom Style
            </button>
          </TooltipWrapper>

          <TooltipWrapper content="Tooltip with delay" delayDuration={1000}>
            <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">
              Delayed Tooltip
            </button>
          </TooltipWrapper>
        </div>
      </section>
    </div>
  );
}
