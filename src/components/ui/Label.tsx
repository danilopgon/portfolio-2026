'use client'
import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={`text-[8px] tracking-[0.22em] uppercase text-[#4a4a47] ${className ?? ''}`}
    {...props}
  />
))
Label.displayName = 'Label'

export { Label }
