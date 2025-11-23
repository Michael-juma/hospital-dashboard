"use client"

import React, { forwardRef } from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      // Prevent hydration mismatch warnings caused by DOM attributes injected by extensions
      suppressHydrationWarning={true}
      className={["px-3 py-2 rounded-md border", className].filter(Boolean).join(" ")}
      {...props}
    />
  )
})

Input.displayName = "Input"

export default Input
