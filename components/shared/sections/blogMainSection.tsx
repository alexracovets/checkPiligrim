'use client';

import { useEffect, useRef } from "react";
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

import Intersection from '@/tools/intersection';
import useHeader from '@/store/useHeader';

interface Blog {
    blog: {
        page: string;
        background: string;
        data: string;
        title: string;
        description: string;
    };
}

export default function BlogMainSection({ blog }: Blog) {
    const sectionRef = useRef<HTMLDivElement>(null);
    const setActiveLink = useHeader(state => state.setActiveLink);

    useEffect(() => {
        if (sectionRef.current) {
            const cleanup = Intersection(sectionRef, setActiveLink, 'blogLink');
            return () => {
                if (cleanup) cleanup();
            };
        }
    }, [setActiveLink]);

    return (
        <Section ref={sectionRef} className='h-[100dvh] m-0 max-tablet:m-0 relative bg-gradient-to-t from-20% to-60% from-regal-orange to-opacity-orange'>
            <Image src={`/blog/main/${blog.background}`} alt={blog.page} fill priority className="object-cover object-left-top z-[-1] max-mobile:hidden" />
            <Image src={`/blog/main/mobile/${blog.background}`} alt={blog.page} fill priority className="object-cover object-left-top z-[-1] hidden max-mobile:block" />
            <Container className={cn(
                'flex justify-end items-end w-ful h-full py-[10rem]',
                'max-tablet:py-[5rem]'
            )}>
                <div className='pt-[10rem] w-full'>
                    <div className={cn(
                        'text_shadow text-[2.6rem] text-regal-white mb-[1.8rem] leading-[1.2]',
                        'max-tablet:text-[1.6rem] max-tablet:mb-[.9rem]',
                        'max-mobile:text-[1.4rem] max-mobile:mb-[1.8rem]'
                    )}>
                        {blog.data}
                    </div>
                    <div className={cn(
                        'uppercase text_shadow text-[8.8rem] text-regal-white font-oswald mb-[2.8rem] leading-[1.2]',
                        'max-tablet:text-[4.6rem] max-tablet:mb-[1.4rem]',
                        'max-mobile:text-[2.8rem] max-mobile:mb-[2.8rem]'
                    )}>
                        {blog.title}
                    </div>
                    <div className={cn(
                        'text_shadow text-[2.6rem] text-regal-white leading-[1.2] custom-field',
                        'max-tablet:text-[1.4rem]',
                        'max-mobile:text-[1rem]'
                    )} dangerouslySetInnerHTML={{ __html: blog.description }} />
                </div>
            </Container>
        </Section>
    );
}