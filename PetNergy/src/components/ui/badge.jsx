import React from 'react'
import { cn } from '@/lib/utils'

export function Badge({ className, variant = 'default', ...props }) {
  const variants = {
    default: 'bg-slate-900 text-white',
    secondary: 'bg-slate-100 text-slate-900',
    outline: 'border border-slate-200 text-slate-900',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold',
        variants[variant] ?? variants.default,
        className
      )}
      {...props}
    />
  )
}

