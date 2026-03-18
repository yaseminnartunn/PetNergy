import * as React from 'react'
import { cn } from '@/lib/utils'

export const Input = React.forwardRef(function Input({ className, type, ...props }, ref) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-10 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 ' +
          'placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ' +
          'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  )
})

