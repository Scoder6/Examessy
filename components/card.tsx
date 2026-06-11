'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva(
  'rounded-2xl border transition-all duration-500 ease-in-out',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-card-foreground shadow-sm',
        elevated: 'border-border bg-card text-card-foreground shadow-lg hover:shadow-2xl hover:-translate-y-2',
        gradient: 'bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-primary/10 dark:border-primary/5 backdrop-blur-sm',
        glass: 'glass-card',
        ghost: 'border-transparent bg-transparent shadow-none',
        outline: 'border-2 border-border hover:border-primary/50',
      },
      interactive: {
        true: 'cursor-pointer hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
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

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className || ''}`}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight ${className || ''}`}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-slate-600 dark:text-slate-400 ${className || ''}`}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`p-6 pt-0 ${className || ''}`}
    {...props}
  />
))
CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex items-center p-6 pt-0 ${className || ''}`}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
