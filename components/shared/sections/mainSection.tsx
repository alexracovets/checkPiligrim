'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

import { MainSlider } from '@/components/shared/sliders/mainSlider';
import { TextSlider } from '@/components/shared/sliders/textSlider';
import { CardSlider } from '@/components/shared/sliders/cardSlider';
import { Container } from "@/components/shared/container";
import { Section } from "@/components/shared/section";

import Intersection from '@/tools/intersection';
import useIsMobile from '@/store/useIsMobile';
import dataTours from "@/data/dataTours";
import useHeader from '@/store/useHeader';

export default function MainSection() {
  const isMobile = useIsMobile(state => state.isMobile);
  const sectionRef = useRef<HTMLDivElement>(null);
  const setActiveLink = useHeader(state => state.setActiveLink);

  useEffect(() => {
    if (sectionRef.current) {
      const cleanup = Intersection(sectionRef, setActiveLink, 'mainLink');

      return () => {
        if (cleanup) cleanup();
      };
    }
  }, [sectionRef, setActiveLink]);

  return (
    <Section
      id='start'
      ref={sectionRef}
      className={cn(
        'h-[100dvh] m-0 max-tablet:m-0 pt-[10rem]',
        'max-tablet:h-[58.2rem]',
        'max-mobile:h-auto'
      )}>
      <MainSlider slides={dataTours} />
      <Container className={cn(
        'flex justify-center items-end w-full h-full',
        'max-tablet:pb-[3.6rem]',
        'max-mobile:pt-[37.142rem]'
      )}>
        <div className={cn(
          'flex justify-between items-end w-full'
        )}>
          {!isMobile ? <TextSlider slides={dataTours} /> : null}
          <CardSlider slides={dataTours} />
        </div>
      </Container>
    </Section>
  );
}