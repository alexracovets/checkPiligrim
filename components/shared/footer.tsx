'use client';

import { FaInstagram, FaFacebook, FaYoutube, FaTiktok } from "react-icons/fa";
import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

import { Container } from "@/components/shared/container";
import Intersection from '@/tools/intersection';

import useHeader from '@/store/useHeader';

export const Footer: React.FC = () => {
    const pathname = usePathname();
    const [isBlack, setIsBlack] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);
    const setActiveLink = useHeader(state => state.setActiveLink);

    const phone = '+380503525236';
    const post = 'pilgrimage_center@ukr.net';
    const socialStyle = 'w-[4.8rem] h-[4.8rem] transition-all duration-300 ease-in-out max-tablet:w-[3.6rem] max-tablet:h-[3.6rem] max-mobile:w-[2.7rem] max-mobile:h-[2.7rem] hover:scale-[1.2]'
    const cosial = [
        {
            href: 'https://www.facebook.com/pilgrimage.center.ocu',
            icon: <FaFacebook className={socialStyle} />
        },
        {
            href: 'https://youtube.com/@pilgrimage.center?si=Feu6MT4eRqTGes_R',
            icon: <FaYoutube className={socialStyle} />
        },
        {
            href: 'https://www.instagram.com/pilgrimagecenter/profilecard/?igsh=MXBldmg3bXUxMTcy',
            icon: <FaInstagram className={socialStyle} />
        },
        {
            href: 'https://www.tiktok.com/@pilgrimageocu?_t=8rKjVdAs57X',
            icon: <FaTiktok className={socialStyle} />
        }
    ]

    useEffect(() => {
        if (pathname === '/afon') {
            setIsBlack(true);
        } else setIsBlack(false);

    }, [pathname]);

    useEffect(() => {
        if (sectionRef.current) {
            const cleanup = Intersection(sectionRef, setActiveLink, 'contactsLink');

            return () => {
                if (cleanup) cleanup();
            };
        }
    }, [sectionRef, setActiveLink]);

    return (
        <footer ref={sectionRef} className={isBlack ? 'bg-regal-black' : 'bg-regal-orange'} id="contacts">
            <Container className={cn(
                'py-[10rem] text-regal-white',
                'max-tablet:py-[5rem]'
            )}>
                <h2 className={cn(
                    'text-[6.6rem] font-[700] mb-[4.8rem] text_shadow',
                    'max-tablet:text-[3.2rem] max-tablet:mb-[6.2rem]',
                    'max-mobile:text-[3rem] max-mobile:mb-[2.6rem]'
                )}>
                    Контакти
                </h2>
                <div className={cn(
                    'flex flex-wrap gap-y-[2.2rem]',
                    'max-mobile:flex-col'
                )}>
                    <div className={cn(
                        'flex flex-col justify-start items-start w-[calc(100%/3)]',
                        'max-tablet:w-[calc(100%/2)] max-tablet:order-1',
                        'max-mobile:w-full'
                    )}>
                        <h3 className={cn(
                            'text-[2.6rem] font-[700] mb-[1.6rem] text_shadow',
                            'max-tablet:text-[1.8rem]',
                            'max-mobile:text-[2rem]'
                        )}>
                            Адреса
                        </h3>
                        <div className={cn(
                            'text-[1.6rem]',
                            'max-tablet:text-[1.4rem]'
                        )}>
                            <p className='leading-[1.3] text_shadow'>
                                вул. Трьохсвятительська 4Б <br />
                                м. Київ, 01001 <br />
                                Україна
                            </p>
                        </div>
                    </div>
                    <div className={cn(
                        'flex flex-col justify-start items-start w-[calc(100%/3)]',
                        'max-tablet:w-[calc(100%/2)] max-tablet:order-2',
                        'max-mobile:w-full'
                    )}>
                        <h3 className={cn(
                            'text-[2.6rem] font-[700] mb-[1.6rem] text_shadow',
                            'max-tablet:text-[1.8rem]',
                            'max-mobile:text-[2rem]'
                        )}>
                            Графік роботи адміністрації
                        </h3>
                        <div className={cn(
                            'text-[1.6rem]',
                            'max-tablet:text-[1.4rem]'
                        )}>
                            <p className='mb-[1.6rem] leading-[1.3] text_shadow'>
                                Понеділок – П’ятниця <br />
                                з 10:00 до 17:00
                            </p>
                            <p className='leading-[1.3] text_shadow'>
                                Субота, Неділя - вихідні
                            </p>
                        </div>
                    </div>
                    <div className={cn(
                        'flex flex-col justify-start items-start w-[calc(100%/3)]',
                        'max-tablet:w-[calc(100%/2)] max-tablet:order-4',
                        'max-mobile:w-full max-mobile:order-3'
                    )}>
                        <h3 className={cn(
                            'text-[2.6rem] font-[700] mb-[1.6rem] text_shadow',
                            'max-tablet:text-[1.8rem]',
                            'max-mobile:text-[2rem]'
                        )}>
                            Соціальні мережі
                        </h3>
                        <div className='flex justify-start items-start text-[1.6rem] gap-x-[2.8rem]'>
                            {cosial.map((item, index) => {
                                return (
                                    <Link key={index} href={item.href} target="_blank">
                                        {item.icon}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                    <div className={cn(
                        'flex flex-col justify-start items-start w-[calc(100%/3)]',
                        'max-tablet:w-[calc(100%/2)] max-tablet:order-3',
                        'max-mobile:w-full max-mobile:order-4'
                    )}>
                        <h3 className={cn(
                            'text-[2.6rem] font-[700] mb-[1.6rem] text_shadow',
                            'max-tablet:text-[1.8rem]',
                            'max-mobile:text-[2rem]'
                        )}>
                            Телефон
                        </h3>
                        <div className={cn(
                            'text-[1.6rem]',
                            'max-tablet:text-[1.4rem]'
                        )}>
                            <Link href={`tel:${phone}`} target="_blank" className='mb-[1.6rem] leading-[1.3] text_shadow transition-all duration-300 ease-in-out hover:scale-[1.2]'>
                                {phone}
                            </Link>
                        </div>
                    </div>
                    <div className={cn(
                        'flex flex-col justify-start items-start w-[calc(100%/3)]',
                        'max-tablet:w-[calc(100%/2)] max-tablet:order-5',
                        'max-mobile:w-full'
                    )}>
                        <h3 className={cn(
                            'text-[2.6rem] font-[700] mb-[1.6rem] text_shadow',
                            'max-tablet:text-[1.8rem]',
                            'max-mobile:text-[2rem]'
                        )}>
                            Електронна пошта
                        </h3>
                        <div className={cn(
                            'text-[1.6rem]',
                            'max-tablet:text-[1.4rem]'
                        )}>
                            <Link href={`mailto:${post}`} target="_blank" className='mb-[1.6rem] leading-[1.3] underline text_shadow transition-all duration-300 ease-in-out hover:scale-[1.2]'>
                                {post}
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </footer >
    );
};
