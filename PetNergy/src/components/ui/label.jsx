import React from 'react'
import { cn } from '@/lib/utils'

export function Label({ className, ...props }) {
  return <label className={cn('text-sm font-bold leading-none', className)} {...props} />
}

