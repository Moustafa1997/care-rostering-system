"use client";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface TooltipWrapperProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
  delayDuration?: number;
  disabled?: boolean;
  maxWidth?: string;
}

export default function TooltipWrapper({
  children,
  content,
  side = "top",
  align = "center",
  className = "",
  delayDuration = 0,
  disabled = false,
  maxWidth = "max-w-xs"
}: TooltipWrapperProps) {
  // If tooltip is disabled or no content, just return children
  if (disabled || !content) {
    return <>{children}</>;
  }

  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent
        side={side}
        align={align}
        className={`${maxWidth} ${className}`}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
}

// Specialized tooltip components for common use cases
export function InfoTooltip({
  children,
  content,
  ...props
}: Omit<TooltipWrapperProps, "side" | "align">) {
  return (
    <TooltipWrapper content={content} side="right" align="center" {...props}>
      {children}
    </TooltipWrapper>
  );
}

export function HelpTooltip({
  children,
  content,
  ...props
}: Omit<TooltipWrapperProps, "side" | "align">) {
  return (
    <TooltipWrapper content={content} side="top" align="center" {...props}>
      {children}
    </TooltipWrapper>
  );
}

export function ErrorTooltip({
  children,
  content,
  ...props
}: Omit<TooltipWrapperProps, "side" | "align" | "className">) {
  return (
    <TooltipWrapper
      content={content}
      side="top"
      align="center"
      className="bg-red-600 text-white"
      {...props}
    >
      {children}
    </TooltipWrapper>
  );
}

export function WarningTooltip({
  children,
  content,
  ...props
}: Omit<TooltipWrapperProps, "side" | "align" | "className">) {
  return (
    <TooltipWrapper
      content={content}
      side="top"
      align="center"
      className="bg-orange-600 text-white"
      {...props}
    >
      {children}
    </TooltipWrapper>
  );
}
