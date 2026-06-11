'use client'

import { CustomCursor } from './custom-cursor'
import { GrainOverlay } from './grain-overlay'

export function GlobalEffects() {
  return (
    <>
      <GrainOverlay />
      <CustomCursor />
    </>
  )
}
