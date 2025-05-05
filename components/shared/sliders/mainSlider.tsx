'use client';

import { useCallback, useEffect, useState } from 'react';
import Fade from 'embla-carousel-fade';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Carousel, CarouselContent, CarouselItem, CarouselApi } from '@/components/ui/carousel';
import { TextSlider } from '@/components/shared/sliders/textSlider';

import useMainSlider from '@/store/useMainSlider';
import useIsMobile from '@/store/useIsMobile';

interface Slide {
    page: string;
    country: string;
    tourName: string;
    duration: string;
    price: string;
    description: string;
}

interface Props {
    slides: Slide[];
}

export const MainSlider: React.FC<Props> = ({ slides }) => {
    const prevSlider = useMainSlider(state => state.prevSlider);
    const currentSlide = useMainSlider(state => state.currentSlide);
    const isMobile = useIsMobile(state => state.isMobile);
    const [api, setApi] = useState<CarouselApi>();

    const changeSlide = useCallback((api: CarouselApi, prevSlider: number) => {
        if (!api) return;
        if (isMobile) {
            api.scrollTo(currentSlide);
        } else {
            api.scrollTo(prevSlider);
        }
    }, [isMobile, currentSlide, slides.length])

    useEffect(() => {
        changeSlide(api, prevSlider);
    }, [api, prevSlider, changeSlide])

    return (
        <Carousel
            opts={{
                duration: 20,
                startIndex: 8
            }}
            className={cn(
                'absolute left-0 top-0 w-full h-full z-[-1] max-mobile:z-[0] pointer-events-none'
            )}
            setApi={setApi}
            plugins={[Fade()]}
        >
            <CarouselContent className={cn(
                'w-full h-[100dvh]',
                'max-tablet:h-[58.2rem]',
                'max-mobile:h-[35.142rem]'
            )}>
                {
                    slides.map((item, index) => {
                        return (
                            <CarouselItem key={index} className={cn(
                                'relative left-0 top-0 w-full h-full pointer-events-none',
                                'max-mobile:pt-[10rem] max-mobile:px-[2rem]'
                            )}>
                                <Image src={`/main/bg/${item.page}.jpg`} fill priority alt='bg' className="object-cover brightness-[.9] grayscale-[.2]" />
                                {isMobile ? <TextSlider slides={slides} /> : null}
                            </CarouselItem>
                        )
                    })
                }
            </CarouselContent>
        </Carousel>
    );
}