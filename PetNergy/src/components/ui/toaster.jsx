import React from 'react'
import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="top-center"
      richColors
      toastOptions={{
        classNames: {
          toast: 'bg-slate-900 text-white border border-white/10',
          title: 'text-white',
          description: 'text-slate-200',
        },
      }}
    />
  )
}

