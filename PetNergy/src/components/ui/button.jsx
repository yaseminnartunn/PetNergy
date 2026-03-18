import * as React from 'react'
import { cn } from '@/lib/utils'

const buttonVariants = {
  base:
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-colors ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ' +
    'disabled:pointer-events-none disabled:opacity-50',
  variants: {
    default: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-50',
    ghost: 'bg-transparent text-slate-900 hover:bg-slate-100',
  },
  sizes: {
    default: 'h-10 px-4 py-2',
    icon: 'h-10 w-10',
  },
}

export const Button = React.forwardRef(function Button(
  { className, variant = 'default', size = 'default', ...props },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        buttonVariants.base,
        buttonVariants.variants[variant] ?? buttonVariants.variants.default,
        buttonVariants.sizes[size] ?? buttonVariants.sizes.default,
        className
      )}
      {...props}
    />
  )
})

