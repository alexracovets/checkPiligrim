"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center cursor-pointer",
      'max-tablet:w-[30rem]',
      'max-mobile:w-[28rem]',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className={cn(
      'relative h-[.4rem] w-full grow bg-regal-white',
      'max-tablet:h-[.2rem]',
      'max-mobile:bg-regal-gray'
    )} />
    <SliderPrimitive.Thumb className={cn(
      'block w-[7.3rem] h-[.7rem] bg-regal-orange',
      'max-tablet:w-[4.1rem] max-tablet:h-[.35rem]',
      'max-mobile:w-[3.6rem] max-mobile:h-[.6rem]'
    )} />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
