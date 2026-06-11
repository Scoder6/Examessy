'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-bold transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary/15 text-primary dark:bg-primary/25',
        secondary: 'bg-secondary/15 text-secondary dark:bg-secondary/25',
        accent: 'bg-accent/15 text-accent dark:bg-accent/25',
        success: 'bg-green-500/15 text-green-700 dark:bg-green-500/25 dark:text-green-400',
        warning: 'bg-yellow-500/15 text-yellow-700 dark:bg-yellow-500/25 dark:text-yellow-400',
        destructive: 'bg-destructive/15 text-destructive dark:bg-destructive/25',
        outline: 'border border-input bg-background text-foreground',
        glass: 'glass border-white/10 text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={badgeVariants({ variant, className })} {...props} />
  )
}

export { Badge, badgeVariants }
