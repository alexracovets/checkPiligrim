import { RefObject } from 'react';

const Intersection = (sectionRef: RefObject<HTMLDivElement>, state: (value: string) => void, value: string) => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
            state(value);
        }
    }, {
        rootMargin: '-50% 0px -50% 0px',
    });

    observer.observe(sectionElement);

    return () => {
        observer.unobserve(sectionElement);
    };
};

export default Intersection;