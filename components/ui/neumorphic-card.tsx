"use client"

import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ReactNode } from "react"

interface NeumorphicCardProps {
  className?: string
  children: ReactNode
  variant?: "flat" | "raised" | "pressed"
  header?: ReactNode
  footer?: ReactNode
  fullWidth?: boolean
  glassMorphism?: boolean
  onClick?: () => void
  hover?: boolean
}

export function NeumorphicCard({
  className,
  children,
  variant = "raised",
  header,
  footer,
  fullWidth = false,
  glassMorphism = false,
  onClick,
  hover = true,
}: NeumorphicCardProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const getCardStyle = () => {
    // For light theme - neumorphic effect
    if (!isDark) {
      if (variant === "flat") {
        return "shadow-[0px_0px_0px_rgba(215,219,225,0.2),0px_0px_0px_rgba(255,255,255,0.7)]"
      }
      if (variant === "raised") {
        return "shadow-[5px_5px_10px_rgba(215,219,225,0.2),-5px_-5px_10px_rgba(255,255,255,0.7)]"
      }
      if (variant === "pressed") {
        return "shadow-[inset_2px_2px_5px_rgba(215,219,225,0.3),inset_-2px_-2px_5px_rgba(255,255,255,0.5)]"
      }
    }
    
    // For dark theme - neumorphic glow effects
    if (variant === "flat") {
      return "shadow-none"
    }
    if (variant === "raised") {
      return "shadow-[5px_5px_15px_rgba(0,0,0,0.7),-5px_-5px_15px_rgba(30,30,30,0.25)] border-[1px] border-zinc-800"
    }
    if (variant === "pressed") {
      return "shadow-[inset_3px_3px_8px_rgba(0,0,0,0.5),inset_-1px_-1px_4px_rgba(60,60,60,0.3)] border-[1px] border-zinc-800/50"
    }

    return ""
  }

  const getHoverEffect = () => {
    if (!hover) return ""
    
    // Light theme hover
    if (!isDark) {
      return "transition-all duration-300 hover:shadow-[8px_8px_15px_rgba(215,219,225,0.25),-8px_-8px_15px_rgba(255,255,255,0.8)]"
    }
    
    // Dark theme hover - enhanced neumorphic effect
    return "transition-all duration-300 hover:shadow-[7px_7px_20px_rgba(0,0,0,0.8),-7px_-7px_20px_rgba(40,40,40,0.3)] hover:translate-y-[-1px]"
  }

  return (
    <Card
      className={cn(
        getCardStyle(),
        hover && getHoverEffect(),
        glassMorphism && "bg-background/60 backdrop-blur-lg border border-border/30",
        isDark && glassMorphism && "bg-background/30 border-border/20",
        fullWidth && "w-full",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      {header && <CardHeader>{header}</CardHeader>}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  )
}