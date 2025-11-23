"use client"

import React from "react"

type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode
  htmlFor?: string
  className?: string
}

export function Label({ children, htmlFor, className, ...props }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={["block text-sm font-medium", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </label>
  )
}

export default Label
