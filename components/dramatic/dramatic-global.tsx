'use client'

import { ScrollExplosion, ScrollSpeedLines, FloatingBurst } from './dramatic-effects'

export function DramaticGlobalEffects() {
  return (
    <>
      {/* Particle explosions at scroll milestones */}
      <ScrollExplosion />
      {/* Vertical speed lines when scrolling fast */}
      <ScrollSpeedLines />
      {/* Floating emoji bursts every few seconds */}
      <FloatingBurst
        emojis={['⚡','🔥','✨','💥','🚀','🎯','🏆','💎','🌟','⭐','🎉','🎊']}
        interval={6000}
      />
    </>
  )
}
