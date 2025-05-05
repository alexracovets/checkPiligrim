'use client';

import { CircleArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import React from 'react';

interface Props {
    mobileBlack?: boolean;
}

export const BackBtn: React.FC<Props> = ({ mobileBlack }) => {
    return (
        <button type="button" className="flex items-center text-regal-white cursor-pointer">
            <CircleArrowLeft
                strokeWidth={'.1rem'}
                className={cn(
                    'w-[3.2rem] h-[3.2rem] cursor-pointer mr-[1.6rem]',
                    'max-tablet:w-[2.4rem] max-tablet:h-[2.4rem]',
                    'max-mobile:w-[1.6rem] max-mobile:h-[1.6rem]',
                    mobileBlack ? 'max-mobile:text-regal-black' : ''
                )}
            />
            <span className={cn(
                'text-[2.6rem]',
                'max-tablet:tex-[1.6rem]',
                'max-mobile:text-[1.4rem]',
                mobileBlack ? 'max-mobile:text-regal-black' : ''
            )}>
                Назад
            </span>
        </button>
    );
};