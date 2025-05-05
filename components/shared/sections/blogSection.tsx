'use client';
import { CircleArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import CustomArrow from "@/components/shared/customArrow";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";
import useIsMobile from '@/store/useIsMobile';
import dataBlog from "@/data/dataBlog";

import Intersection from '@/tools/intersection';
import useHeader from '@/store/useHeader';

export default function BlogSection() {
    const viewSize = useIsMobile(state => state.viewSize);
    const [activeItems, setActiveItems] = useState(4);
    const [isBtn, setIsBtn] = useState(activeItems <= dataBlog.length);
    const sectionRef = useRef<HTMLDivElement>(null);
    const setActiveLink = useHeader(state => state.setActiveLink);

    const handleShowMore = () => {
        setActiveItems(prev => prev + 2);
        setIsBtn(activeItems + 2 < dataBlog.length);
    };

    useEffect(() => {
        setActiveLink('blogLink');
    }, [setActiveLink]);

    useEffect(() => {
        if (sectionRef.current) {
            const cleanup = Intersection(sectionRef, setActiveLink, 'blogLink');
            return () => {
                if (cleanup) cleanup();
            };
        }
    }, [setActiveLink]);

    return (
        <Section ref={sectionRef} className={cn(
            'pt-[15.5rem] mb-[5rem]',
            'max-tablet:pt-[11.2rem]'
        )}>
            <Container>
                <h1 className={cn(
                    'text-[10rem] text-regal-orange font-oswald font-[600]',
                    'max-tablet:text-[4.8rem]',
                    'max-mobile:text-[3rem]'
                )}>
                    Блог
                </h1>
                <div className={cn(
                    'flex justify-between items-start flex-wrap my-[10rem] gap-y-[5rem]',
                    'max-tablet:my-[5rem]',
                    'max-mobile:gap-y-[2.6rem] max-mobile:flex-col'
                )}>
                    {
                        dataBlog.slice(0, activeItems).map((item, index) => {
                            let title = '';
                            let description = '';
                            let countTitle = 0;
                            let countDescription = 0;

                            if (viewSize <= 1023 && viewSize > 539) {
                                countTitle = 45;
                                countDescription = 60;
                            } else if (viewSize <= 539) {
                                countTitle = 40;
                                countDescription = 40;
                            } else {
                                countTitle = 73;
                                countDescription = 159;
                            }

                            if (item.title.length > countTitle) {
                                title = item.title.slice(0, countTitle - 3) + '...';
                            } else {
                                title = item.title;
                            }

                            if (item.short_description.length > countTitle) {
                                description = item.short_description.slice(0, countDescription - 3) + '...';
                            } else {
                                description = item.short_description;
                            }

                            return (
                                <Link href={`/blog/${item.page}`} key={index} className={cn(
                                    'relative transition-all duration-300 ease-in-out bg-regal-white shadow-card hover:shadow-cardHover hover:scale-[1.05] hover:z-[1]',
                                    'flex justify-start items-start flex-col w-[69.9rem] h-[56.8rem] rounded-[2rem] border-regal-gray border-[.2rem]',
                                    'max-tablet:w-[32.9rem] max-tablet:h-[60.2rem]',
                                    'max-mobile:w-full max-mobile:h-auto'
                                )}>
                                    <div className={cn(
                                        'relative w-full h-[35.7rem] min-h-[35.7rem] rounded-[2rem] overflow-hidden',
                                        'max-tablet:h-[20rem]'
                                    )}>
                                        <Image src={`/blog/card/${item.image}`} fill alt={item.page} priority className="object-cover object-top max-mobile:hidden" />
                                        <Image src={`/blog/card/mobile/${item.image}`} fill alt={item.page} priority className="object-cover object-top hidden max-mobile:block" />
                                    </div>
                                    <div className="flex justify-between items-start w-full h-full py-[2.8rem] px-[2.6rem]">
                                        <div className={cn(
                                            'flex justify-start items-start flex-col w-[49.3rem] h-full',
                                            'max-tablet:w-full'
                                        )}>
                                            <div className={cn(
                                                'text-[2.6rem] font-[600] mb-[1.6rem] leading-[1.2] min-h-[6rem] flex justify-start items-center',
                                                'max-tablet:text-[2rem]'
                                            )}>
                                                {title}
                                            </div>
                                            <div className={cn(
                                                'text-[1.8rem] leading-[1.2] tracking-[0.01rem] grow',
                                                'max-tablet:tracking-[-0.01rem] max-tablet:mb-[2.6rem]'
                                            )}>
                                                {description}
                                            </div>
                                            <Button variant='outline_orange' className={cn(
                                                'justify-center items-center w-full hidden',
                                                'max-tablet:flex'
                                            )}>
                                                <CustomArrow color="#FF6328" />
                                                <span className="text-regal-orange">Деталі</span>
                                            </Button>
                                        </div>
                                        <CircleArrowRight strokeWidth={'.1rem'} className="w-[3.9rem] h-[3.9rem]  transition-all duration-300 ease-in-out hover:scale-[1.2] hover:text-regal-orange max-tablet:hidden" />
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
