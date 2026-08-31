import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'placeholder:text-muted-foreground focus-visible:border-primary/40 focus-visible:ring-primary/25 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive glass-neu-pressed flex field-sizing-content min-h-16 w-full rounded-xl px-3 py-2 text-base outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm transition-[box-shadow,border-color] duration-300',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
