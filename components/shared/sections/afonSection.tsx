'use client';

import { FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CustomArrow from "@/components/shared/customArrow";
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";
import { Button } from "@/components/ui/button";


export default function AfonSection() {
    const [isBtnHovered, setIsBtnHovered] = useState(false);

    return (
        <Section className="pb-[10rem] max-tablet:pb-[5rem]">
            <Container>
                <div className={cn(
                    'relative w-full h-[45.8rem] rounded-[2rem] border-[.6rem] border-regal-orange overflow-hidden p-[9rem] text-regal-white',
                    'max-tablet:h-[22.186rem] max-tablet:p-[4rem]',
                    'max-mobile:h-[45.8rem] max-mobile:p-[2rem] max-mobile:pt-[11.9rem] max-mobile:bg-gradient-to-t max-mobile:from-30% max-mobile:from-regal-orange max-mobile:to-opacity-orange'
                )}>
                    <Image src='img/afon.jpg' fill alt="afon" className="object-cover  z-[-1]" />
                    <div className={cn(
                        'absolute top-[7.5rem] right-[28.35rem] w-[38.9rem] h-[19.9rem] border-[.3rem] border-regal-white flex justify-end items-start',
                        'max-tablet:w-[23.1rem] max-tablet:h-[11.817rem] max-tablet:border-[.2rem] max-tablet:top-[.7rem] max-tablet:right-[9.5rem]',
                        'max-mobile:hidden'
                    )}>
                        <div className={cn(
                            'w-[19.2rem] h-[3.3rem] bg-regal-white flex justify-center items-start p-[.6rem]',
                            'max-tablet:w-[13.9rem] max-tablet:h-[3rem]'
                        )}>
                            <FaStar color="#FF6328" className={cn(
                                'mr-[.4rem] w-[1.8rem] h-[1.8rem]',
                                'max-tablet:w-[1.2rem] max-tablet:h-[1.2rem]'
                            )} />
                            <span className={cn(
                                'text-[1.6rem] text-regal-black',
                                'max-tablet:text-[1.4rem]'
                            )}>
                                VIP пропозиція
                            </span>
                        </div>
                    </div>

                    <h2 className={cn(
                        'text-[6.4rem] font-[600] mb-[2.8rem]',
                        'max-tablet:text-[3.6rem] max-tablet:mb-[1.6rem]',
                        'max-mobile:text-[4.5rem] max-mobile:mb-[2.8rem]'
                    )}>
                        Свята гора Афон
                    </h2>
                    <p className={cn(
                        'text-[1.6rem] w-[52rem] mb-[2.8rem] leading-[1.3]',
                        'max-tablet:text-[1rem] max-tablet:mb-[1.6rem] max-tablet:w-[28.7rem]',
                        'max-mobile:text-[1.35rem] max-mobile:w-full max-mobile:mb-[2.8rem]'
                    )}>
                        Паломницький центр Православної Церкви України запрошує вас здійснити духовну подорож на Святу Гору Афон — одне з найвеличніших святих місць православного світу.
                    </p>
                    <Link href='/afon'>
                        <Button
                            onMouseEnter={() => setIsBtnHovered(true)}
                            onMouseLeave={() => setIsBtnHovered(false)}
                            className={cn(
                                'flex justify-center items-center pointer-events-auto max-mobile:bg-regal-white',
                                isBtnHovered ? 'bg-regal-white max-mobile:bg-regal-orange' : ''
                            )}
                        >
                            <CustomArrow hover={isBtnHovered} className='max-mobile:hidden' />
                            <CustomArrow hover={isBtnHovered} color="#FF6328" className='hidden max-mobile:block' />
                            <span className={cn(
                                'transition-all duration-300 ease-in-out',
                                isBtnHovered ?
                                    'translate-x-[-3.15rem] text-regal-orange max-tablet:translate-x-[-1.5rem] max-mobile:translate-x-[-1.65rem] max-mobile:text-regal-white'
                                    :
                                    'text-regal-white translate-x-0 max-mobile:text-regal-orange'
                            )}>
                                Детальніше
                            </span>
                        </Button>
                    </Link>
                </div>
            </Container>
        </Section>
    );
}
