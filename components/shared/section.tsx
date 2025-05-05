'use client';

import React, { forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    id?: string;
}

export const Section = forwardRef<HTMLDivElement, React.PropsWithChildren<Props>>(
    ({ className, id, children }, ref) => {
        return (
            <section
                className={cn(
                    'py-[5rem] relative overflow-x-hidden w-full',
                    'max-tablet:py-[2.5rem]',
                    className
                )}
                ref={ref}
                id={id}
            >
                {children}
            </section>
        );
    }
);

Section.displayName = 'Section';