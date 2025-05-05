'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Fade as Hamburger } from 'hamburger-react';
import Headroom from 'react-headroom';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

import { Drawer, DrawerContent, DrawerTitle, DrawerHeader, DrawerDescription } from "@/components/ui/drawer";
import { Container } from "@/components/shared/container";

import useHeader from '@/store/useHeader';
import useIsMobile from '@/store/useIsMobile';
import useFormActive from '@/store/useFormActive';

export const Header: React.FC = () => {
    const menuRef = useRef<HTMLDivElement>(null);
    const [underlineStyles, setUnderlineStyles] = useState({ left: '0px', width: '0px' });
    const isMobile = useIsMobile(state => state.isMobile);
    const [isMobuleMenu, setIsMobileMenu] = useState(false);
    const [isBlack, setIsBlack] = useState(false);
    const pathname = usePathname();
    const activeLink = useHeader(state => state.activeLink);
    const isActiveForm = useFormActive(state => state.isActive);

    const links = [
        { href: '/#start', name: 'Головна', id: 'mainLink' },
        { href: '/#about', name: 'Про нас', id: 'aboutLink' },
        { href: '/#tours', name: 'Тури', id: 'toursLink' },
        { href: '/blog', name: 'Блог', id: 'blogLink' },
        { href: '/afon', name: 'Афон', id: 'afonLink' },
        { href: '#contacts', name: 'Контакти', id: 'contactsLink' }
    ];

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const linkRect = e.currentTarget.getBoundingClientRect();
        const menuRect = menuRef.current?.getBoundingClientRect();
        if (menuRect) {
            setUnderlineStyles({
                left: `${linkRect.left - menuRect.left}px`,
                width: `${linkRect.width}px`
            });
        }
    };

    const handleMouseLeave = useCallback(() => {
        const activeElement = document.getElementById(activeLink);
        const menuRect = menuRef.current?.getBoundingClientRect();
        if (activeElement && menuRect) {
            const linkRect = activeElement.getBoundingClientRect();
            setUnderlineStyles({
                left: `${linkRect.left - menuRect.left}px`,
                width: `${linkRect.width}px`
            });
        }
    }, [activeLink]);

    useEffect(() => {
        if (!isMobile) {
            setIsMobileMenu(false);
        }
    }, [isMobile])

    useEffect(() => {
        handleMouseLeave();
    }, [activeLink, handleMouseLeave]);

    useEffect(() => {
        if (pathname === '/afon') {
            setIsBlack(true);
        } else setIsBlack(false);

    }, [pathname])

    return (
        <header onMouseLeave={handleMouseLeave} className='absolute left-0 top-0 w-full pointer-events-auto z-[10]'>
            <Headroom>
                <div
                    className={cn(
                        'w-full py-[1rem] z-[10] bg-regal-orange transition-all duration-300 ease-in-out m-0',
                        isBlack ? 'bg-regal-black' : 'bg-regal-orange',
                        isActiveForm ? 'bg-[transperant]' : ''
                    )}
                >
                    <Container className='flex justify-between items-center'>
                        <Link
                            className='relative flex justify-center items-center z-[100]'
                            href='/#start'
                            onClick={() => {
                                setIsMobileMenu(false);
                            }}
                        >
                            <div className={cn(
                                'w-[8.5rem] h-[8.5rem] mr-[2rem] relative',
                                'max-tablet:w-[4.2rem] max-tablet:h-[4.2rem] max-tablet:mr-[1rem]',
                                'max-mobile:w-[4rem] max-mobile:h-[4rem]'
                            )}>
                                <Image src='/logo.svg' fill alt='logo' priority />
                            </div>
                            <div className='flex flex-col justify-center items-start uppercase'>
                                <h1 className={cn(
                                    'text-regal-white text-[3.2rem] font-[700] mb-[1.4rem] text_shadow',
                                    'max-tablet:text-[1.4rem] max-tablet:mb-[.7rem]',
                                    'max-mobile:text-[1.2rem]'
                                )}>
                                    Паломницький центр
                                </h1>
                                <p className={cn(
                                    'text-regal-white text-[2.2rem] text_shadow',
                                    'max-tablet:text-[1rem]',
                                    'max-mobile:text-[.8rem]'
                                )}>
                                    ПРАВОСЛАВНОЇ ЦЕРКВИ УКРАЇНИ
                                </p>
                            </div>
                        </Link>
                        <div className={cn(
                            'menu-wrapper',
                            'max-mobile:hidden',
                            isActiveForm ? 'opacity-0' : 'opacity-1'
                        )} ref={menuRef}>
                            <nav className={cn(
                                'flex justify-start items-center gap-[7rem]',
                                'gap-[2rem]'
                            )}>
                                {links.map((link, index) => (
                                    <Link
                                        href={link.href}
                                        key={index}
                                        passHref
                                        id={link.id}
                                        onClick={() => {
                                            setIsMobileMenu(false);
                                        }}
                                        className={cn(
                                            'uppercase text-[1.6rem] text-regal-white font-[700] p-[.8rem] text_shadow',
                                            'max-tablet:text-[.8rem] max-tablet:p-[.4rem]'
                                        )}
                                        onMouseEnter={handleMouseEnter}
                                    >
                                        {link.name}
                                    </Link>
                                ))}
                                <div className={cn(
                                    'absolute bottom-0 h-[0.2rem] bg-regal-white transition-all ease-out duration-300',
                                    'max-tablet:h-[0.1rem]'
                                )} style={underlineStyles}></div>
                            </nav>
                        </div>
                        <div className='hidden max-mobile:block cursor:pointer realative z-[10]'>
                            <Hamburger toggled={isMobuleMenu} toggle={setIsMobileMenu} color="#fff" size={18} />
                        </div>
                        <Drawer open={isMobuleMenu} direction='top'>
                            <DrawerContent className='pointer-events-none'>
                                <DrawerHeader className='hidden'>
                                    <DrawerTitle></DrawerTitle>
                                    <DrawerDescription></DrawerDescription>
                                </DrawerHeader>
                                <div className={
                                    cn(
                                        'relative z-[10] w-full h-full bg-regal-orange flex justify-center items-start flex-col pointer-events-auto gap-y-[3.2rem] px-[2rem] pt-[7rem]',
                                        isBlack ? 'bg-regal-black' : 'bg-regal-orange'
                                    )
                                }>
                                    {links.map((link, index) => (
                                        <Link
                                            href={link.href}
                                            key={index}
                                            passHref
                                            onClick={() => {
                                                setIsMobileMenu(false);
                                            }}
                                            id={link.id}
                                            className={cn(
                                                'transition-all ease-out duration-300',
                                                'uppercase text-[2.2rem] font-oswald font-[500] pointer-events-auto text-regal-white',
                                                'hover:text-regal-black'
                                            )}
                                            onMouseEnter={handleMouseEnter}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </Container>
                </div>
            </Headroom>
        </header>
    );
};