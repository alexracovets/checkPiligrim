'use client';

import { useEffect, useRef, useState } from "react";
import { CircleArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Price } from "@/components/shared/price";
import { Button } from "@/components/ui/button";
import Intersection from '@/tools/intersection';
import dataTours from "@/data/dataTours";

import useHeader from '@/store/useHeader';

export default function TourSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeItems, setActiveItems] = useState(8);
    const [isBtn, setIsBtn] = useState(activeItems <= dataTours.length)
    const setActiveLink = useHeader(state => state.setActiveLink);

    const handleShowMore = () => {
        setActiveItems(prev => prev + 2);
        setIsBtn(activeItems + 2 < dataTours.length);
    };

    useEffect(() => {
        if (sectionRef.current) {
            const cleanup = Intersection(sectionRef, setActiveLink, 'toursLink');

            return () => {
                if (cleanup) cleanup();
            };
        }
    }, [sectionRef, setActiveLink]);

    return (
        <Section ref={sectionRef} id="tours">
            <Container>
                <h2 className={cn(
                    'text-[6.6rem] font-[700] mb-[5rem]',
                    'max-tablet:text-[3.2rem]',
                    'max-mobile:text-[3rem] max-mobile:mb-[2.6rem]'
                )}>
                    Обирай свій тур
                </h2>
                <div className="flex flex-wrap justify-start gap-x-[1rem] gap-y-[1.6rem]">
                    {
                        dataTours.slice(0, activeItems).map((card, index) => {
                            return (
                                <Link href={`/tours/${card.page}`} key={index}>
                                    <div className={cn(
                                        'relative transition-all duration-300 ease-in-out bg-regal-white shadow-card hover:shadow-cardHover hover:z-[1] hover:scale-[1.05]',
                                        'flex flex-col justify-start items-start w-[34.2rem] border-regal-gray border-[0.2rem] rounded-[2rem] cursor-pointer',
                                        'max-tablet:w-[33rem]',
                                        'max-mobile:w-[28rem]'
                                    )}>
                                        <div className='relative w-full h-[35.7rem] rounded-[2rem] scale-[1.01] overflow-hidden'>
                                            <Image src={`/main/tour/${card.page}.jpg`} alt={card.country} fill className="object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-start items-start w-full p-[2.6rem]">
                                            <h4 className="uppercase text-[2.6rem] font-[700] mb-[1.6rem]">{card.country}</h4>
                                            <p className="text-[1.6rem] mb-[2.6rem]">{card.tourName}</p>
                                            <div className="flex justify-between items-center w-full">
                                                <Price className="uppercase">{card.price}</Price>
                                                <CircleArrowRight strokeWidth={'.1rem'} className="w-[3.9rem] h-[3.9rem] transition-all duration-300 ease-in-out hover:scale-[1.2] hover:text-regal-orange" />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                {
                    isBtn ? <Button
                        variant='outline_orange'
                        onClick={handleShowMore}
                        className="mx-auto text-regal-orange mt-[5rem] hover:bg-regal-orange hover:text-regal-white hover:scale-[1.05]"
                    >
                        Показати всі
                    </Button> :
                        null
                }
            </Container>
        </Section>
    );
}