'use client'

import * as React from 'react'
import { AlertCircle } from 'lucide-react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  icon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, label, icon, ...props }, ref) => (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`flex h-14 w-full rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md px-6 py-4 text-base font-medium placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:border-primary/50 transition-all duration-500 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 ${
            icon ? 'pl-12' : ''
          } ${error ? 'border-destructive focus:ring-destructive' : 'hover:border-white/20'} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}
    </div>
  )
)
Input.displayName = 'Input'

export { Input }
