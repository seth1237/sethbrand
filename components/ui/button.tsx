"use client"

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-[transform,box-shadow,background-color,color] duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background active:translate-y-px",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[5px_8px_16px_oklch(0.62_0.02_250_/_0.22),-3px_-3px_10px_oklch(1_0_0_/_0.7)] hover:-translate-y-0.5 hover:shadow-[7px_12px_22px_oklch(0.62_0.02_250_/_0.26),-3px_-3px_10px_oklch(1_0_0_/_0.8)]",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "glass-neu text-foreground hover:-translate-y-0.5",
        secondary:
          "glass-neu text-secondary-foreground hover:-translate-y-0.5",
        ghost: "hover:bg-foreground/5 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-xl gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 rounded-xl px-6 has-[>svg]:px-4",
        icon: "size-9 rounded-xl",
        "icon-sm": "size-8 rounded-xl",
        "icon-lg": "size-10 rounded-xl",
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'
  
  // We'll use client-side theme detection via CSS instead of React state
  // This avoids SSR hydration mismatches and works with both server and client components
  
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
