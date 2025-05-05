'use client';

import React, { useEffect } from 'react';

import useIsMobile from '@/store/useIsMobile';

export const CheckIsMobile: React.FC = () => {
    const setIsMobile = useIsMobile(state => state.setIsMobile);
    const setViewSize = useIsMobile(state => state.setViewSize);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 540);
            setViewSize(window.innerWidth);
        };
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, [setIsMobile]);

    return null;
};