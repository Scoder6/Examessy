'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'rounded-2xl border transition-all duration-300 ease-out',
  {
    variants: {
      variant: {
        default:
          'border-border bg-card text-card-foreground shadow-sm hover:shadow-md',
        elevated:
          'border-border bg-card text-card-foreground shadow-md hover:shadow-xl hover:-translate-y-1',
        gradient:
          'bg-gradient-to-br from-primary/[0.04] via-transparent to-secondary/[0.03] border-primary/[0.08] dark:border-primary/[0.06] backdrop-blur-sm',
        glass:
          'glass-card text-card-foreground',
        ghost:
          'border-transparent bg-transparent shadow-none',
        outline:
          'border border-border hover:border-primary/40 bg-transparent',
      },
      interactive: {
        true: 'cursor-pointer hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.06] hover:-translate-y-0.5',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, interactive, ...props }, ref) => (
    <div
      ref={ref}
      className={cardVariants({ variant, interactive, className })}
      {...props}
    />
  )
)
Card.displayName = 'Card'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`flex flex-col space-y-1.5 p-6 ${className || ''}`} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={`text-xl font-semibold leading-tight tracking-tight ${className || ''}`} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={`text-sm text-muted-foreground leading-relaxed ${className || ''}`} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`p-6 pt-0 ${className || ''}`} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={`flex items-center p-6 pt-0 ${className || ''}`} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
