"use client"

import React, { forwardRef } from "react"

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  className?: string
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, ...props }, ref) => {
  return (
    <div ref={ref} className={["bg-white rounded-lg shadow-sm", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card
