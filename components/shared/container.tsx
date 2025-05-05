'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface Props { className?: string; }

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <div className={cn(
            'mx-auto w-full px-[5rem]',
            'max-tablet:px-[3rem]',
            'max-mobile:px-[2rem]',
            className)}
        >
            {children}
        </div>
    );
};