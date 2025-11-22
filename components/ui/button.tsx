"use client"

import React, { forwardRef, ReactElement, isValidElement } from "react"

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	asChild?: boolean
	className?: string
	size?: "sm" | "md" | "lg" | string
	variant?: "outline" | "default" | string
}

function mergeClassNames(...names: Array<string | undefined>) {
	return names.filter(Boolean).join(" ")
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ asChild, children, className, ...props }, ref) => {
		const content = children

		if (asChild && isValidElement(content)) {
			const child = content as ReactElement<any, any>
			const childClassName = (child.props && (child.props as any).className) || ""
			return React.cloneElement(child as ReactElement, {
				className: mergeClassNames(childClassName, className),
			} as any)
		}

		return (
			<button ref={ref} className={mergeClassNames("inline-flex items-center justify-center", className)} {...props}>
				{children}
			</button>
		)
	}
)

Button.displayName = "Button"

export default Button
