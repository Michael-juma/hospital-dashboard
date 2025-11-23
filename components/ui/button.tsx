"use client"

import React, { forwardRef, ReactElement, isValidElement } from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean
  className?: string
  size?: "sm" | "md" | "lg"
  variant?: "outline" | "default" | "ghost" | "destructive" | "secondary"
}

function mergeClassNames(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(" ")
}

const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[.97]"

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
}

const variantStyles: Record<string, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700",
  ghost: "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700",
  destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ asChild, children, className, size = "md", variant = "default", ...props }, ref) => {
    const content = children
    const combined = mergeClassNames(baseStyles, sizeStyles[size], variantStyles[variant], className)

    if (asChild && isValidElement(content)) {
      const child = content as ReactElement<any, any>
      const childClassName = (child.props && (child.props as any).className) || ""
      return React.cloneElement(child as ReactElement, {
        className: mergeClassNames(childClassName, combined),
        suppressHydrationWarning: true,
      } as any)
    }

    return (
      <button ref={ref} suppressHydrationWarning={true} className={combined} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
