import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primaryColors-default border border-primaryColors-default text-white hover:bg-primaryColors-default2 hover:border-primaryColors-default2 active:bg-primaryColors-dark active:border-primaryColors-dark",
        primary:
          "bg-primaryColors-default border border-primaryColors-default text-white hover:bg-white hover:text-primaryColors-default",
        secondary:
          "bg-white border border-primaryColors-blue text-primaryColors-blue hover:bg-blue-medium hover:border-blue-medium hover:text-white active:bg-primaryColors-navy active:border-primaryColors-navy active:text-white",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        icons:"bg-white border border-[#5473E8] text-[#5473E8] hover:bg-blue-medium hover:border-blue-medium hover:text-white active:bg-primaryColors-navy active:border-primaryColors-navy active:text-white",
        outline:
          "border border-primaryColors-default bg-white text-primaryColors-default hover:border-primaryColors-default2 hover:text-primaryColors-default2 active:text-primaryColors-dark active:border-primaryColors-dark",
        bordered:"border border-blue-soft rounded-md focus:outline-none bg-white text-blue-soft",
        filled: "border border-primaryColors-blue bg-primaryColors-blue text-white hover:bg-primaryColors-blue/90 hover:bg-blue-medium hover:border-blue-medium hover:bg-blue-medium active:bg-primaryColors-navy active:border-primaryColors-navy",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        mobilemenu:
          "bg-orange-soft text-primary-foreground hover:bg-primaryColors-default text-white",
        noborder:"border-none bg-none"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
