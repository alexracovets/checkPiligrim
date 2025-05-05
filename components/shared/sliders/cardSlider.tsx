'use client';

import { CircleArrowRight, CircleArrowLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { Slider } from "@/components/ui/slider";

import useMainSlider from '@/store/useMainSlider';
import useIsMobile from "@/store/useIsMobile";

interface Slide {
    page: string;
    country: string;
    tourName: string;
}

interface Props {
    slides: Slide[];
}

export const CardSlider: React.FC<Props> = ({ slides }) => {
    const currentSlide = useMainSlider(state => state.currentSlide);
    const setCurrentSlide = useMainSlider(state => state.setCurrentSlide);
    const setLengthSlider = useMainSlider(state => state.setLengthSlider);
    const [sliderValue, setSliderValue] = useState([0]);
    const [sliderActive, setSliderActive] = useState(false);
    const [api, setApi] = useState<CarouselApi>();
    const sliderRef = useRef(null);
    const isMobile = useIsMobile(state => state.isMobile);


    const sliderOptions = {
        align: "start" as const,
        loop: true,
        dragFree: true,
        duration: isMobile ? 0 : 20,
        startIndex: 0
    }

    useEffect(() => {
        const slidesCount = slides.length;
        const nearestSlide = Math.round((sliderValue[0] / 100) * (slidesCount - 1));
        setCurrentSlide(nearestSlide);
    }, [sliderValue, slides, setCurrentSlide]);

    const toPrevSlide = useCallback(() => {
        if (currentSlide === 0) {
            setCurrentSlide(slides.length - 1);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    }, [currentSlide, slides.length, setCurrentSlide])

    const toSlide = useCallback((slide: number) => {
        if (slide + 1 === slides.length - 1) {
            setCurrentSlide(0)
        } else {
            if (isMobile) {
                setCurrentSlide(slide);
            } else {
                setCurrentSlide(slide + 1);
            }
        }
    }, [isMobile, slides.length, setCurrentSlide])

    const toNextSlide = useCallback(() => {
        if (currentSlide === slides.length - 1) {
            setCurrentSlide(0)
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    }, [currentSlide, slides.length, setCurrentSlide])

    useEffect(() => {
        if (!api) return;
        api.scrollTo(currentSlide);
        if (!sliderActive) {
            setSliderValue([Math.round((currentSlide / (slides.length - 1)) * 100)]);
        }
    }, [api, currentSlide, slides, sliderActive])

    useEffect(() => {
        setLengthSlider(slides.length)
    }, [slides, setLengthSlider])

    useEffect(() => {
        if (!api) return;

        api.on('pointerUp', () => {
            const closestSlide = api.selectedScrollSnap();
            api.scrollTo(closestSlide);
            setCurrentSlide(closestSlide)
        });
    }, [api, setCurrentSlide]);

    return (
        <div className={cn(
            'w-[79rem]',
            'max-tablet:w-[45rem]',
            'max-mobile:w-[40.2rem]'
        )}>
            <Carousel setApi={setApi} className={cn(
                'w-full mb-[4rem]',
                'max-mobile:mb-[2rem]'
            )} opts={sliderOptions}>
                <CarouselContent className='w-full py-[.5rem]'>
                    {
                        slides.map((item, index) => {
                            return (
                                <CarouselItem
                                    key={index}
                                    onClick={() => toSlide(index)}
                                    className={cn(
                                        'basis-1/3 flex justify-center items-center cursor-pointer',
                                        'max-tablet:basis-1/2'
                                    )}>
                                    <div className={cn(
                                        'relative w-[25.3rem] h-[40.7rem] rounded-[2rem] overflow-hidden py-[3.5rem] px-[3rem] shadow-card',
                                        'max-tablet:w-[21.2rem] max-tablet:h-[34.2rem] max-tablet:px-[2.6rem] max-tablet:py-[3rem]',
                                        'max-mobile:w-[19.1rem] max-mobile:h-[14.2rem] max-mobile:p-[2rem]'
                                    )}>
                                        <Image src={`main/bg/${item.page}.jpg`} fill priority alt='bg' className="object-cover z-[-1] brightness-[.9] grayscale-[.2]" />
                                        <hr className='w-[2rem] h-[.4rem] bg-regal-white mb-[1.6rem]' />
                                        <div className='text-[1.4rem] text-regal-white mb-[1.4rem] text_shadow font-[700]'>
                                            {item.tourName}
                                        </div>
                                        <div className={cn(
                                            'uppercase text-[4rem] text-regal-white font-oswald font-[400] tracking-[-0.2rem] text_shadow',
                                            'max-mobile:text-[3rem]'
                                        )}>
                                            {item.country}
                                        </div>
                                    </div>
                                </CarouselItem>
                            )
                        })
                    }
                </CarouselContent>
            </Carousel >
            <div className={cn(
                'flex justify-between items-center gap-x-[1rem] w-full',
                'max-tablet:ml-[-6rem] max-tablet:w-[40rem]',
                'max-mobile:ml-0 max-mobile:w-[28rem]'
            )}>
                <div className="flex justify-between items-center text-regal-white gap-x-[1rem]">
                    <CircleArrowLeft
                        strokeWidth={'.1rem'}
                        onClick={toPrevSlide}
                        className={cn(
                            'w-[3.9rem] h-[3.9rem] cursor-pointer',
                            'transition-all duration-300 ease-in-out',
                            'hover:text-regal-orange hover:scale-[1.2]',
                            'max-mobile:text-regal-black max-mobile:hidden'
                        )}
                    />
                    <CircleArrowRight
                        strokeWidth={'.1rem'}
                        onClick={toNextSlide}
                        className={cn(
                            'w-[3.9rem] h-[3.9rem] cursor-pointer',
                            'transition-all duration-300 ease-in-out',
                            'hover:text-regal-orange hover:scale-[1.2]',
                            'max-mobile:text-regal-black'
                        )}
                    />
                </div>
                <Slider
                    ref={sliderRef}
                    value={sliderValue}
                    onValueChange={value => setSliderValue(value)}
                    onPointerEnter={() => setSliderActive(true)}
                    onPointerLeave={() => setSliderActive(false)}
                />
            </div>
        </div>
    );
}