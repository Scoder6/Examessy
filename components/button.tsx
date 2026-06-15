'use client'

import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import * as React from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold tracking-wide transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden select-none',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_2px_12px_rgba(var(--primary-rgb),0.25)] hover:bg-primary/90 hover:shadow-[0_4px_20px_rgba(var(--primary-rgb),0.35)] active:shadow-none',
        secondary:
          'bg-secondary text-secondary-foreground shadow-[0_2px_12px_rgba(var(--secondary-rgb),0.25)] hover:bg-secondary/90 hover:shadow-[0_4px_20px_rgba(var(--secondary-rgb),0.35)] active:shadow-none',
        accent:
          'bg-accent text-accent-foreground shadow-[0_2px_12px_rgba(var(--accent-rgb),0.25)] hover:bg-accent/90 hover:shadow-[0_4px_20px_rgba(var(--accent-rgb),0.35)] active:shadow-none',
        outline:
          'border border-border bg-transparent hover:bg-muted text-foreground hover:border-primary/40',
        ghost:
          'text-foreground hover:bg-muted/60 hover:text-foreground',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-[0_2px_12px_rgba(220,38,38,0.2)]',
        glass:
          'glass hover:bg-white/[0.07] text-foreground border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
      },
      size: {
        xs: 'h-7  px-3   text-xs  rounded-lg',
        sm: 'h-9  px-4   text-sm  rounded-xl',
        md: 'h-10 px-5   text-sm',
        lg: 'h-12 px-7   text-base rounded-xl',
        xl: 'h-14 px-9   text-base rounded-2xl',
      },
      fullWidth: { true: 'w-full' },
    },
    defaultVariants: { variant: 'default', size: 'md' },
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
  ({ className, variant, size, fullWidth, loading = false, icon, disabled, children, ...props }, ref) => (
    <motion.button
      whileHover={{ scale: 1.015 }}
      whileTap={{ scale: 0.975 }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      className={buttonVariants({ variant, size, fullWidth, className })}
      disabled={disabled || loading}
      ref={ref}
      {...props}
    >
      {/* Premium shine sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
        aria-hidden
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.10) 50%, transparent 60%)',
        }}
      />
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
)
Button.displayName = 'Button'

export { Button, buttonVariants }
