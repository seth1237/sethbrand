"use client"

import React, { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Define props for the NeumorphicWrapper component
interface NeumorphicWrapperProps {
  children: React.ReactNode
  className?: string
  variant?: "flat" | "raised" | "pressed"
  disabled?: boolean
  disableInDarkMode?: boolean
}

export function NeumorphicWrapper({
  children,
  className,
  variant = "raised",
  disabled = false,
  disableInDarkMode = false, // Changed to false to enable dark mode neumorphism by default
  ...props
}: NeumorphicWrapperProps) {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && (resolvedTheme === "light" || theme === "light")
  const isDark = mounted && (resolvedTheme === "dark" || theme === "dark")
  
  // Skip neumorphic effect if disabled
  const skipEffect = disabled
  
  const getNeumorphicStyles = () => {
    if (skipEffect) return ""
    
    // Light theme neumorphic styles
    if (isLight) {
      switch (variant) {
        case "flat":
          return "shadow-[0px_0px_0px_rgba(215,219,225,0.2),0px_0px_0px_rgba(255,255,255,0.7)]"
        case "raised":
          return "shadow-[5px_5px_10px_rgba(215,219,225,0.2),-5px_-5px_10px_rgba(255,255,255,0.7)] hover:shadow-[6px_6px_12px_rgba(215,219,225,0.25),-6px_-6px_12px_rgba(255,255,255,0.8)] hover:translate-y-[-1px] active:shadow-[2px_2px_5px_rgba(215,219,225,0.15),-2px_-2px_5px_rgba(255,255,255,0.5)] active:translate-y-[1px]"
        case "pressed":
          return "shadow-[inset_2px_2px_5px_rgba(215,219,225,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.5)]"
        default:
          return ""
      }
    }
    
    // Dark theme neumorphic styles
    if (isDark && !disableInDarkMode) {
      switch (variant) {
        case "flat":
          return "shadow-none bg-zinc-900/50"
        case "raised":
          return "shadow-[5px_5px_12px_rgba(0,0,0,0.7),-5px_-5px_12px_rgba(40,40,40,0.25)] border-[1px] border-zinc-800/80 hover:shadow-[7px_7px_15px_rgba(0,0,0,0.8),-7px_-7px_15px_rgba(50,50,50,0.3)] hover:translate-y-[-1px] active:shadow-[3px_3px_7px_rgba(0,0,0,0.6),-3px_-3px_7px_rgba(40,40,40,0.2)] active:translate-y-[1px]"
        case "pressed":
          return "shadow-[inset_3px_3px_8px_rgba(0,0,0,0.6),inset_-2px_-2px_5px_rgba(60,60,60,0.3)] border-[1px] border-zinc-800/40"
        default:
          return ""
      }
    }
    
    return ""
  }
  
  return (
    <div
      className={cn(
        "transition-all duration-200",
        getNeumorphicStyles(),
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

// Create convenience components for different variants
export function NeumorphicFlatWrapper(props: Omit<NeumorphicWrapperProps, "variant">) {
  return <NeumorphicWrapper variant="flat" {...props} />
}

export function NeumorphicRaisedWrapper(props: Omit<NeumorphicWrapperProps, "variant">) {
  return <NeumorphicWrapper variant="raised" {...props} />
}

export function NeumorphicPressedWrapper(props: Omit<NeumorphicWrapperProps, "variant">) {
  return <NeumorphicWrapper variant="pressed" {...props} />
}