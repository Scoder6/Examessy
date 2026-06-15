'use client'

/**
 * Wrap every page's <main> with this to get a beautiful
 * fade + lift entrance after the wormhole transition.
 */
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

export function PageEnter({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      className={className}
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
    >
      {children}
    </motion.div>
  )
}
