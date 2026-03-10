import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-blue-800 to-blue-600 text-blue-100 hover:from-blue-700 hover:to-blue-500 border border-blue-500/20 shadow-md",
        destructive:
          "bg-gradient-to-r from-red-800 to-red-600 text-white hover:from-red-700 hover:to-red-500 border border-red-500/20 shadow-md",
        outline:
          "border border-blue-700/30 bg-blue-900/10 text-blue-100 hover:bg-blue-800/30 backdrop-blur-sm",
        secondary:
          "bg-blue-900/40 text-blue-100 hover:bg-blue-800/50 border border-blue-700/30",
        ghost: "text-blue-100 hover:bg-blue-900/30 hover:text-white",
        link: "text-blue-400 hover:text-blue-300 underline-offset-4 hover:underline",
        primary: "bg-gradient-to-r from-blue-800 to-blue-600 text-white hover:from-blue-700 hover:to-blue-500 border border-blue-500/20 shadow-md hover:shadow-lg",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
