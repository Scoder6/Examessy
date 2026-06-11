'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-bold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow-[0_4px_14px_rgba(var(--primary-rgb),0.35)] hover:bg-primary/90 border border-primary/30',
        secondary: 'bg-secondary text-secondary-foreground shadow-[0_4px_14px_rgba(var(--secondary-rgb),0.35)] hover:bg-secondary/90 border border-secondary/30',
        accent: 'bg-accent text-accent-foreground shadow-[0_4px_14px_rgba(var(--accent-rgb),0.35)] hover:bg-accent/90 border border-accent/30',
        outline: 'border-2 border-border bg-transparent hover:bg-muted text-foreground',
        ghost: 'text-foreground hover:bg-muted',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_4px_14px_rgba(var(--destructive),0.35)]',
        glass: 'glass hover:bg-white/10 text-foreground border-white/20 shadow-[0_1px_2px_rgba(255,255,255,0.1)_inset,0_12px_24px_rgba(0,0,0,0.3)]',
      },
      size: {
        xs: 'px-3 py-1 text-xs',
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        xl: 'px-10 py-5 text-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends Omit<HTMLMotionProps<'button'>, 'ref' | 'children'>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  icon?: React.ReactNode
  children?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      icon,
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={buttonVariants({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {/* Subtle shine */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }