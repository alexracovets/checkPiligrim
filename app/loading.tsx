"use client";

import { cn } from '@/lib/utils';
import { Oval } from 'react-loader-spinner';

import useLoader from '@/store/useLoader';
import { useEffect } from 'react';

export default function Loading() {
    const isActive = useLoader(state => state.isLoaderActive);
    const setIsActive = useLoader(state => state.setIsLoaderActive);

    useEffect(() => {
        if (isActive) {
            const timer = setTimeout(() => {
                setIsActive(false);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [isActive, setIsActive]);

    return (
        <>
            {
                isActive ?
                    <div
                        className={cn(
                            'fixed top-0 left-0 w-full h-[100dvh] bg-regal-orange flex justify-center items-center z-[1]',
                            'transition-opacity duration-300 ease-in-out',
                            isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        )}
                    >
                        <Oval
                            visible={true}
                            height="80"
                            width="80"
                            color="#fff"
                            secondaryColor="#000"
                            ariaLabel="oval-loading"
                        />
                    </div> :
                    null
            }
        </>
    )
}