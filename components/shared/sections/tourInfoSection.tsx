'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

import CustomArrow from "@/components/shared/customArrow";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Separator } from '@/components/ui/separator';
import { Button } from "@/components/ui/button";

import useFormActive from '@/store/useFormActive';
import Intersection from '@/tools/intersection';
import useHeader from '@/store/useHeader';

interface Day {
    name: string;
    list: string[];
}

interface InfoText {
    type: string;
    value: string;
}

interface Items {
    name: string;
    value: string[];
}

interface Program {
    type: string;
    value?: string;
    name?: string;
    list?: string[];
    days?: Day[]
}

interface More {
    items: Items[];
    program: Program[];
    infoText?: InfoText[];
}

interface Tour {
    page: string;
    country: string;
    tourName: string;
    price: string;
    duration: string;
    description: string;
    more: More;
}
interface StartTourSectionProps {
    tour: Tour;
}

export default function TourInfoSection({ tour }: StartTourSectionProps) {
    const setFormFrome = useFormActive(state => state.setFormFrome);
    const setIsActive = useFormActive(state => state.setIsActive);
    const setActiveLink = useHeader(state => state.setActiveLink);
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sectionRef.current) {
            const cleanup = Intersection(sectionRef, setActiveLink, 'toursLink');
            return () => {
                if (cleanup) cleanup();
            };
        }
    }, [setActiveLink]);

    return (
        <Section ref={sectionRef} className='m-0 max-tablet:m-0'>
            <Container className={cn(
                'py-[10rem]',
                'max-tablet:py-[5rem]'
            )}>
                <div className={cn(
                    'flex justify-between items start w-full flex-wrap gap-y-[5rem] mb-[10rem]',
                    'max-tablet:mb-[5rem]',
                    'max-mobile:gap-y-[4rem]'
                )}>
                    {
                        tour.more.items.map((item, index) => {
                            return (
                                <div key={index} className={cn(
                                    'w-[69.9rem]',
                                    'max-tablet:w-[33rem]',
                                    'max-mobile:w-full'
                                )}>
                                    <div className={cn(
                                        'relative text-[4.8rem] font-[600] py-[1rem] pl-[1rem] mb-[1rem]',
                                        'max-tablet:text-[3.2rem]',
                                        'max-mobile:text-[3rem]'
                                    )}>
                                        <Separator className='absolute left-0 top-0' />
                                        {item.name}
                                    </div>
                                    <div className={cn(
                                        'text-[1.8rem]',
                                        'max-tablet:text-[1.6rem]'
                                    )}>
                                        <ul className={cn(
                                            'cost_list text-[1.8rem]',
                                            'max-tablet:text-[1.6rem]',
                                            'max-mobile:mb-[1.4rem]'
                                        )}>
                                            {
                                                item.value?.map((li, idx) => {
                                                    return <li key={idx} className='leading-[1.2]'>{li}</li>
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className='w-full'>
                        {
                            tour.more.program.map((item, index) => {
                                switch (item.type) {
                                    case 'title':
                                        return null;
                                    case 'list':
                                        return (
                                            <div key={index} className='flex justify-start items-start flex-col mb-[3rem]'>
                                                <div className={cn(
                                                    'relative text-[3rem] font-[600] my-[2rem] py-[1rem] pl-[1rem]',
                                                    'max-tablet:text-[2.5rem]',
                                                    'max-mobile:text-[2.2rem]'
                                                )}>
                                                    <Separator className='absolute left-0 top-0' />
                                                    {item.name}
                                                </div>

                                                <ul className={cn(
                                                    'cost_list text-[1.8rem]',
                                                    'max-tablet:text-[1.6rem]',
                                                    'max-mobile:mb-[1.4rem]'
                                                )}>
                                                    {
                                                        item.list?.map((li, idx) => {
                                                            return <li key={idx} className='leading-[1.2]'>{li}</li>
                                                        })
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    case 'days':
                                        return (
                                            <div key={index} className='flex justify-start items-start flex-col mb-[3rem] last-of-type:mb-0 w-full'>
                                                <div className={cn(
                                                    'relative text-[3rem] font-[600] my-[2rem] py-[1rem] pl-[1rem]',
                                                    'max-tablet:text-[2.5rem]',
                                                    'max-mobile:text-[2.2rem]'
                                                )}>
                                                    <Separator className='absolute left-0 top-0' />
                                                    {item.name}
                                                </div>
                                                {
                                                    item.days?.map((day, idx) => {
                                                        return (
                                                            <div key={idx} className={cn(
                                                                'w-full mb-[3rem] last-of-type:mb-0',
                                                                'max-mobile:mb-[2rem]'
                                                            )}>
                                                                <div className={cn(
                                                                    'relative uppercase text-[2.5rem] font-[600] mb-[1.6rem] py-[1rem] pl-[1rem]',
                                                                    'max-tablet:text-[2rem]'
                                                                )}>
                                                                    <Separator className='absolute left-0 top-0' />
                                                                    {day.name}
                                                                </div>
                                                                <ul className={cn(
                                                                    'cost_list text-[1.8rem]',
                                                                    'max-tablet:text-[1.6rem]',
                                                                    'max-mobile:mb-[1.4rem]'
                                                                )}>
                                                                    {day.list.map((li, id) => {
                                                                        return <li key={id} className='leading-[1.2]'>{li}</li>
                                                                    })}
                                                                </ul>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    default:
                                        break;
                                }
                            })
                        }
                    </div>
                    {
                        tour?.more?.infoText &&
                        <ul className={cn(
                            'cost_list text-[1.8rem] w-full',
                            'max-tablet:text-[1.6rem]'
                        )}>
                            {
                                tour?.more?.infoText?.map((item, idx) => {
                                    return (
                                        <li key={idx} className={cn(
                                            'cost_list text-[1.8rem] w-full',
                                            'max-tablet:text-[1.6rem]',
                                            'max-mobile:mb-[1.4rem]'
                                        )}>
                                            {item.value}
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    }
                </div>
                <Button
                    onMouseEnter={() => setIsBtnHovered(true)}
                    onMouseLeave={() => setIsBtnHovered(false)}
                    onClick={() => { setIsActive(true); setFormFrome(tour.country); }}
                    variant='outline_orange'
                    className={cn(
                        'flex justify-center items-center mx-auto',
                        isBtnHovered ? 'bg-regal-orange' : ''
                    )}
                >
                    <CustomArrow hover={isBtnHovered} color="#FF6328" />
                    <span className={cn(
                        'transition-all duration-300 ease-in-out',
                        isBtnHovered ?
                            'text-regal-white translate-x-[-3.15rem] max-tablet:translate-x-[-1.5rem] max-mobile:translate-x-[-1.65rem]'
                            :
                            'text-regal-orange translate-x-0'
                    )}>
                        Замовити тур
                    </span>
                </Button>
            </Container>
        </Section>
    );
}