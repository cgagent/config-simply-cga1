import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-blue-800/30 bg-gradient-to-r from-blue-900 to-blue-800 text-blue-100 shadow-sm",
        secondary:
          "border-blue-800/30 bg-blue-900/30 text-blue-300 backdrop-blur-sm",
        destructive:
          "border-red-900/30 bg-gradient-to-r from-red-900 to-red-800 text-red-100",
        outline: "border-blue-800/30 text-blue-200",
        success: 
          "border-emerald-900/30 bg-gradient-to-r from-emerald-900 to-emerald-800 text-emerald-100",
        warning:
          "border-amber-900/30 bg-gradient-to-r from-amber-900 to-amber-800 text-amber-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
