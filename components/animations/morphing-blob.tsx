'use client'

interface MorphingBlobProps {
  className?: string
  color?: string
  size?: string
  speed?: number
  style?: React.CSSProperties
}

export function MorphingBlob({
  className = '',
  color = 'primary',
  size = '600px',
  speed = 20,
  style,
}: MorphingBlobProps) {
  return (
    <div
      className={`absolute rounded-full blur-[100px] opacity-20 ${className}`}
      style={{
        width: size,
        height: size,
        background: `var(--${color})`,
        animation: `morph-blob ${speed}s ease-in-out infinite`,
        willChange: 'transform, border-radius',
        ...style,
      }}
    />
  )
}
