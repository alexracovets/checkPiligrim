'use client';

import React from 'react';

import { BackBtn } from '@/components/shared/backBtn';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

export const PrevPage: React.FC = () => {
    const router = useRouter();

    const toBack = () => {
        router.back();
    }

    return (
        <div
            onClick={toBack}
            className={cn(
                'absolute top-[220px] left-[5rem] z-1',
                'max-tablet:top-[118px] max-tablet:left-[3rem]',
                'max-mobile:top-[110px] max-mobile:left-[2rem]',
                'max-[350px]:top-[90px]'
            )}>
            <BackBtn />
        </div>
    );
};