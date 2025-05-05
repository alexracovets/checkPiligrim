'use client';

import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { CalendarClock } from "lucide-react";
import { useCallback, useEffect, useState } from 'react';
import Fade from 'embla-carousel-fade';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import CustomArrow from "@/components/shared/customArrow";
import { Price } from "@/components/shared/price";
import { Button } from "@/components/ui/button";
import useMainSlider from '@/store/useMainSlider';

import useIsMobile from '@/store/useIsMobile';

interface Slide {
    page: string;
    country: string;
    tourName: string;
    price: string;
    duration: string;
    description: string;
}

interface Props {
    slides: Slide[];
}

export const TextSlider: React.FC<Props> = ({ slides }) => {
    const currentSlide = useMainSlider(state => state.currentSlide);
    const prevSlider = useMainSlider(state => state.prevSlider);
    const isMobile = useIsMobile(state => state.isMobile);
    const [api, setApi] = useState<CarouselApi>();
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const sliderOptions = {
        duration: isMobile ? 0 : 20,
        startIndex: slides.length
    };

    const changeSlide = useCallback((api: CarouselApi, prevSlider: number) => {
        if (!api) return;
        if (isMobile) {
            api.scrollTo(currentSlide);
        } else {
            api.scrollTo(prevSlider);
        }
    }, [isMobile, currentSlide])

    useEffect(() => {
        changeSlide(api, prevSlider);
    }, [api, prevSlider, changeSlide])

    return (
        <Carousel className={cn(
            'w-[52rem]',
            'max-tablet:w-[33.2rem] max-tablet:mr-[2.2rem] max-tablet:mb-[5.8rem]',
            'max-mobile:w-full max-mobile:m-0',
            isMobile ? '' : 'pointer-events-none'
        )}
            setApi={setApi}
            opts={sliderOptions}
            plugins={[Fade()]}
        >
            <CarouselContent className='w-full'>
                {
                    slides.map((item, index) => {
                        return (
                            <CarouselItem key={index} className={cn(
                                'flex flex-col w-full justify-start items-start',
                                isMobile ? '' : 'pointer-events-none'
                            )}>
                                <div className={cn(
                                    'text-[2.6rem] text-regal-white mb-[1.8rem] text_shadow',
                                    'max-tablet:text-[1.2rem] max-tablet:mb-[.88rem]',
                                    'max-mobile:text-[1.4rem] max-mobile:mb-[.97rem]'
                                )}>
                                    {item.tourName}
                                </div>
                                <div className={cn(
                                    'uppercase text-[10.8rem] tracking-[-.3rem] text-regal-white font-oswald font-[500] mb-[2.8rem] text_shadow',
                                    'max-tablet:text-[6.8rem] max-tablet:mb-[1.4rem]',
                                    'max-mobile:text-[5.6rem] max-mobile:mb-[1.5rem] '
                                )}>
                                    {item.country}
                                </div>
                                <div className={cn(
                                    'flex justify-start items-center mb-[2.8rem]',
                                    'max-tablet:mb-[1.4rem]'
                                )}>
                                    <Price className={cn(
                                        'mr-[3.8rem] text_shadow',
                                        'max-tablet:mr-[1.85rem] max-tablet:text-[1.2rem] max-tablet:p-0 max-tablet:w-[6.8rem] max-tablet:h-[2.4rem] max-tablet:flex max-tablet:justify-center max-tablet:items-center',
                                        'max-mobile:w-[7.9rem] max-mobile:h-[2.339rem] max-mobile:text-[1.4rem]'
                                    )}>
                                        {item.price}
                                    </Price>
                                    <div className={cn(
                                        'flex justify-start items-center uppercase text-regal-white text-[1.8rem] text_shadow',
                                        'max-tablet:text-[1.2rem]'
                                    )}>
                                        <CalendarClock
                                            color="#fff"
                                            strokeWidth={'0.2rem'}
                                            className={cn(
                                                'w-[2.2rem] h-[2.2rem] mr-[1.4rem]',
                                                'max-tablet:w-[1.4rem] max-tablet:h-[1.4rem] max-tablet:mr-[.7rem]'
                                            )}
                                        />
                                        {item.duration}
                                    </div>
                                </div>
                                <div className={cn(
                                    'text-[1.6rem] text-regal-white leading-[2.08rem] mb-[2.8rem] text_shadow',
                                    'max-tablet:text-[1rem] max-tablet:leading-[1.3rem] max-tablet:mb-[1.4rem]'
                                )}>
                                    {item.description}
                                </div>
                                <Link href={`/tours/${item.page}`}>
                                    <Button
                                        onMouseEnter={() => setIsBtnHovered(true)}
                                        onMouseLeave={() => setIsBtnHovered(false)}
                                        variant='outline'
                                        className={cn(
                                            'flex justify-center items-center ml-[2rem] pointer-events-auto ',
                                            isBtnHovered ? 'bg-regal-white' : ''
                                        )}
                                    >
                                        <CustomArrow hover={isBtnHovered} />
                                        <span className={cn(
                                            'transition-all duration-300 ease-in-out',
                                            isBtnHovered ? 'translate-x-[-3.15rem] text-regal-orange max-tablet:translate-x-[-1.5rem] max-mobile:translate-x-[-1.65rem]' : 'text-regal-white translate-x-0 text_shadow'
                                        )}>
                                            Детальніше
                                        </span>
                                    </Button>
                                </Link>

                            </CarouselItem>
                        )
                    })
                }
            </CarouselContent>
        </Carousel>
    );
}