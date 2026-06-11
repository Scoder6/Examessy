'use client'

import * as React from 'react'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const sizeMap = {
  xs: 'max-w-sm',
  sm: 'max-w-xl',
  md: 'max-w-3xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  '2xl': 'max-w-[1600px]',
  full: 'max-w-full',
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className = '', size = '2xl', ...props }, ref) => (
    <div
      ref={ref}
      className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeMap[size]} ${className}`}
      {...props}
    />
  )
)
Container.displayName = 'Container'

export { Container }
