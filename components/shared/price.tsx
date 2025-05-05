'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string;
}

export const Price: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
    return (
        <span className={cn('uppercase text-[2.2rem] text-regal-white text-center font-ibm font-[700] px-[3.8rem] py-[.85rem] bg-regal-orange rounded-[5rem]', className)}>{children}</span>
    );
};