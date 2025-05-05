'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

import Intersection from '@/tools/intersection';
import useHeader from '@/store/useHeader';

interface Content {
    type: string;
    value?: string;
    list?: string[];
}

interface Prop {
    info: {
        name: string;
        content: Content[];
        image: string;
        imageText: string;
    };
}


export default function BlogInfoSection({ info }: Prop) {
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
        <Section ref={sectionRef} className='m-0 max-tablet:m-0'>
            <Container className={cn(
                'py-[10rem]',
                'max-tablet:py-[5rem]'
            )}>
                <div className='flex justify-start items-start w-full flex-col'>
                    <div className={cn(
                        'text-[6.4rem] font-oswald font-[500] mb-[5rem]',
                        'max-tablet:text-[3.2rem]',
                        'max-mobile:text-[3rem]'
                    )}>
                        {info.name}
                    </div>
                    <div className={cn(
                        'flex justify-between items-center w-full',
                        'max-mobile:flex-col-reverse'
                    )}>
                        <div className={cn(
                            'w-[60.9rem] flex justify-center items-start flex-col gap-y-[2.8rem]',
                            'max-tablet:w-[33rem] max-tablet:gap-y-[1.6rem]',
                            'max-mobile:w-full max-mobile:gap-y-[2.8rem]'
                        )}>
                            {info.content.map((item, index) => {
                                switch (item.type) {
                                    case 'text':
                                        return (
                                            <div key={index} dangerouslySetInnerHTML={{ __html: item.value || '' }}
                                                className={cn(
                                                    'text-[1.6rem] leading-[1.2] custom-field',
                                                    'max-tablet:text-[1.4rem]'
                                                )}
                                            />
                                        )
                                    case 'list':
                                        return (
                                            <ul key={index} className='flex flex-col cost_list w-full'>
                                                {
                                                    item.list && item.list.map((li, idx) => {
                                                        return (
                                                            <li key={idx} dangerouslySetInnerHTML={{ __html: li }}
                                                                className={cn(
                                                                    'text-[1.6rem] leading-[1.2] pl-[2rem] custom-field relative',
                                                                    'max-tablet:text-[1.4rem]'
                                                                )}
                                                            />
                                                        )
                                                    })
                                                }
                                            </ul>
                                        )
                                    default:
                                        return null;
                                }
                            })}
                        </div>
                        <div className={cn(
                            'w-[69.8rem] h-[47.2rem] flex justify-center items-end rounded-[23.6rem] relative overflow-hidden bg-gradient-to-t to-60% from-regal-orange to-opacity-orange',
                            'max-tablet:w-[33rem] max-tablet:h-[42.6rem] max-tablet:rounded-[20rem] max-tablet:items-center',
                            'max-mobile:w-[28rem] max-mobile:h-[40.2rem] max-mobile:rounded-[23.6rem] max-mobile:mb-[5rem]'
                        )}>
                            <Image src={`/blog/post/${info.image}`} alt={info.image} fill priority className="object-cover object-left-top z-[-1]" />
                            <div className={cn(
                                'text_shadow uppercase text-center text-[4.5rem] text-regal-white tracking-[0.15rem] w-[46rem] font-oswald font-[600] mb-[7rem] leading-[1.2]',
                                'max-tablet:text-[3rem] max-tablet:m-0 max-tablet:p-[2rem]'
                            )}>
                                {info.imageText}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
}