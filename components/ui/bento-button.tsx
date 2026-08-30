"use client"

import React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

// Create a button variant system using CVA (class-variance-authority)
const bentoButtonVariants = cva(
  // Base styles that apply to all button variants
  [
    "relative",
    "inline-flex",
    "items-center",
    "justify-center",
    "whitespace-nowrap",
    "rounded-md",
    "text-sm",
    "font-medium",
    "transition-all",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-offset-2",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
  ],
  {
    variants: {
      variant: {
        // Bento-style primary button with gradient hover
        primary: [
          "bg-primary",
          "text-primary-foreground",
          "shadow-md",
          "hover:shadow-lg",
          "hover:translate-y-[-1px]",
          "hover:bg-gradient-to-r",
          "hover:from-primary",
          "hover:to-primary/80",
          "active:translate-y-[1px]",
          "active:shadow-sm",
          "focus-visible:ring-primary",
          // Light mode neumorphic effect
          "data-[theme=light]:shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]",
          "data-[theme=light]:hover:shadow-[6px_6px_12px_rgba(0,0,0,0.12),-6px_-6px_12px_rgba(255,255,255,0.85)]",
          "data-[theme=light]:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.12),inset_-2px_-2px_5px_rgba(255,255,255,0.5)]",
          // Dark mode soft glow effect
          "data-[theme=dark]:shadow-[0_0_15px_rgba(var(--primary)/0.3)]",
          "data-[theme=dark]:hover:shadow-[0_0_25px_rgba(var(--primary)/0.4)]",
        ],
        // Bento-style secondary with soft hover
        secondary: [
          "bg-secondary",
          "text-secondary-foreground",
          "shadow-sm",
          "hover:bg-secondary/80",
          "hover:shadow-md",
          "hover:translate-y-[-1px]",
          "active:translate-y-[1px]",
          "active:shadow-sm",
          "focus-visible:ring-secondary",
          // Light mode neumorphic effect
          "data-[theme=light]:bg-background",
          "data-[theme=light]:text-foreground",
          "data-[theme=light]:shadow-[3px_3px_8px_rgba(0,0,0,0.08),-3px_-3px_8px_rgba(255,255,255,0.7)]",
          "data-[theme=light]:hover:shadow-[5px_5px_10px_rgba(0,0,0,0.1),-5px_-5px_10px_rgba(255,255,255,0.8)]",
          "data-[theme=light]:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.4)]",
          // Dark mode effect
          "data-[theme=dark]:shadow-[0_0_10px_rgba(255,255,255,0.08)]",
          "data-[theme=dark]:hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]",
        ],
        // Bento-style outline button
        outline: [
          "border",
          "border-input",
          "bg-background",
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "focus-visible:ring-accent",
          "hover:translate-y-[-1px]",
          "hover:shadow-md",
          "active:translate-y-[1px]",
          "active:shadow-sm",
          // Light mode neumorphic effect 
          "data-[theme=light]:shadow-[2px_2px_5px_rgba(0,0,0,0.06),-2px_-2px_5px_rgba(255,255,255,0.5)]",
          "data-[theme=light]:hover:shadow-[3px_3px_7px_rgba(0,0,0,0.08),-3px_-3px_7px_rgba(255,255,255,0.6)]",
          "data-[theme=light]:active:shadow-[inset_1px_1px_3px_rgba(0,0,0,0.08),inset_-1px_-1px_3px_rgba(255,255,255,0.4)]",
          // Dark mode effect
          "data-[theme=dark]:border-border",
          "data-[theme=dark]:shadow-[0_0_8px_rgba(255,255,255,0.05)]",
          "data-[theme=dark]:hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]",
        ],
        // Bento-style glass morphism effect
        glass: [
          "bg-background/60",
          "backdrop-blur-lg",
          "border",
          "border-border/30",
          "text-foreground",
          "hover:bg-background/80",
          "hover:translate-y-[-1px]",
          "hover:shadow-md",
          "active:translate-y-[1px]",
          "shadow-sm",
          "active:shadow-sm",
          // Light mode neumorphic effect
          "data-[theme=light]:shadow-[3px_3px_8px_rgba(0,0,0,0.07),-3px_-3px_8px_rgba(255,255,255,0.6)]",
          "data-[theme=light]:hover:shadow-[4px_4px_10px_rgba(0,0,0,0.08),-4px_-4px_10px_rgba(255,255,255,0.7)]",
          "data-[theme=light]:active:shadow-[inset_2px_2px_4px_rgba(0,0,0,0.06),inset_-2px_-2px_4px_rgba(255,255,255,0.35)]",
          // Dark mode effect 
          "data-[theme=dark]:bg-background/30",
          "data-[theme=dark]:shadow-[0_0_12px_rgba(255,255,255,0.04)]",
          "data-[theme=dark]:hover:shadow-[0_0_16px_rgba(255,255,255,0.06)]",
          "data-[theme=dark]:border-border/20",
        ],
        // Gradient button with light and dark mode
        gradient: [
          "text-white",
          "bg-gradient-to-r",
          "from-primary",
          "to-indigo-500",
          "hover:from-primary/90",
          "hover:to-indigo-400",
          "shadow-md",
          "hover:shadow-lg",
          "hover:shadow-primary/20",
          "hover:translate-y-[-1px]",
          "active:translate-y-[1px]",
          "active:shadow-sm",
          "focus-visible:ring-primary",
          // Light mode effect (subtle)
          "data-[theme=light]:hover:shadow-[4px_4px_12px_rgba(0,0,0,0.15)]",
          "data-[theme=light]:active:shadow-[inset_2px_2px_5px_rgba(0,0,0,0.2)]",
          // Dark mode glow effect
          "data-[theme=dark]:shadow-[0_0_20px_rgba(var(--primary)/0.4)]",
          "data-[theme=dark]:hover:shadow-[0_0_30px_rgba(var(--primary)/0.5)]",
        ],
        // Subtle ghost button
        ghost: [
          "hover:bg-accent",
          "hover:text-accent-foreground",
          "data-[theme=light]:hover:shadow-[2px_2px_5px_rgba(0,0,0,0.06),-2px_-2px_5px_rgba(255,255,255,0.5)]",
          "data-[theme=dark]:hover:bg-accent/30",
        ],
        // Special destructive button
        destructive: [
          "bg-destructive",
          "text-destructive-foreground",
          "hover:bg-destructive/90",
          "shadow-sm",
          "hover:shadow-md",
          "hover:shadow-destructive/20",
          "focus-visible:ring-destructive",
        ],
        // Link style with underline effect
        link: [
          "text-primary",
          "underline-offset-4",
          "hover:underline",
          "p-0",
          "h-auto",
        ],
      },
      size: {
        default: "h-10 px-4 py-2",
        xs: "h-7 px-2 text-xs",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-lg px-10 text-base",
        icon: "h-10 w-10",
      },
      animation: {
        none: "",
        pulse: "animate-pulse",
        bounce: "animate-bounce",
        shimmer: [
          "relative",
          "overflow-hidden",
          "before:absolute",
          "before:inset-0",
          "before:-translate-x-full",
          "before:animate-[shimmer_2s_infinite]",
          "before:bg-gradient-to-r",
          "before:from-transparent",
          "before:via-white/10",
          "before:to-transparent",
        ],
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
        sm: "rounded-sm",
        lg: "rounded-lg",
        xl: "rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      animation: "none",
      rounded: "default",
    },
  }
)

export interface BentoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bentoButtonVariants> {
  isLoading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  theme?: "light" | "dark" // Optional theme override
}

const BentoButton = React.forwardRef<HTMLButtonElement, BentoButtonProps>(
  (
    {
      className,
      variant,
      size,
      animation,
      rounded,
      isLoading = false,
      loadingText,
      leftIcon,
      rightIcon,
      children,
      theme, // Theme override
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(bentoButtonVariants({ variant, size, animation, rounded, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        data-theme={theme} // Apply theme override if provided
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2 inline-flex">{leftIcon}</span>
        )}
        {isLoading ? loadingText || children : children}
        {!isLoading && rightIcon && (
          <span className="ml-2 inline-flex">{rightIcon}</span>
        )}
      </button>
    )
  }
)
BentoButton.displayName = "BentoButton"

export { BentoButton, bentoButtonVariants }