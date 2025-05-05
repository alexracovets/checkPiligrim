"use client"

import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/lib/utils";
import * as React from "react";

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> {
  gray?: boolean;
}

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(
  (
    { className, orientation = "vertical", decorative = true, gray = false, ...props },
    ref
  ) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0",
        orientation === "horizontal" ? "h-[2px] w-full" : "h-full w-[2px]",
        gray ? 'bg-regal-gray' : 'bg-regal-orange',
        className
      )}
      {...props}
    />
  )
)
Separator.displayName = SeparatorPrimitive.Root.displayName

export { Separator }
