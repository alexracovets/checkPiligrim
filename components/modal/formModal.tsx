'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

import { Drawer, DrawerContent, DrawerTitle, DrawerHeader, DrawerDescription } from "@/components/ui/drawer";
import CustomArrow from "@/components/shared/customArrow";
import { Button } from "@/components/ui/button";

import useFormActive from '@/store/useFormActive';
import { InputForm } from './input';
import { BackBtn } from '@/components/shared/backBtn';

interface UserFormField {
    value: string;
    isValid: boolean;
}

interface UserForm {
    name: UserFormField;
    email: UserFormField;
    phone: UserFormField;
}

export const FormModal: React.FC = () => {
    const isActive = useFormActive(state => state.isActive);
    const formFrom = useFormActive(state => state.formFrom);
    const setIsActive = useFormActive(state => state.setIsActive);
    const [isBtnHovered, setIsBtnHovered] = useState(false);
    const [isBtnActive, setIsBtnActive] = useState(false);
    const [isResponse, setIsResponse] = useState(false);

    const [userForm, setUserForm] = useState<UserForm>({
        name: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: true
        },
        phone: {
            value: '+380 | ',
            isValid: false
        }
    });

    useEffect(() => {
        const allValid = Object.values(userForm).every(field => field.isValid && field.value !== '');
        setIsBtnActive(allValid);
    }, [userForm]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/send-mail.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: userForm.name.value,
                email: userForm.email.value,
                phone: userForm.phone.value,
                formFrom: formFrom,
            }),
        });

        if (response.ok) {
            setIsResponse(true);
        } else console.log(userForm)
    }

    useEffect(() => {
        if (isResponse) {
            setTimeout(() => {
                setIsActive(false);
                setIsResponse(false);
            }, 3000);
        };
    }, [isResponse, setIsActive])

    return (
        <Drawer open={isActive} direction='top'>
            <DrawerContent>
                <DrawerHeader className='hidden'>
                    <DrawerTitle></DrawerTitle>
                    <DrawerDescription></DrawerDescription>
                </DrawerHeader>
                <div className='relative w-full h-full pointer-events-none flex justify-between items-start'>
                    <div onClick={() => setIsActive(false)} className={cn(
                        'absolute left-[5rem] top-[18.5rem] cursor-pointer z-[1] pointer-events-auto',
                        'max-tablet:left-[3rem] max-tablet:top-[9.64rem]',
                        'max-mobile:top-[9rem]'
                    )}>
                        <BackBtn mobileBlack />
                    </div>
                    <div className='relative flex justify-end items-end w-[50%] h-[100dvh] bg-gradient-to-t to-60% from-regal-orange to-opacity-orange max-mobile:hidden'>
                        <Image src='/img/form.jpg' fill alt='bg' className="object-cover z-[-1]" />
                        <div className={cn(
                            'uppercase text-[8.2rem] text-regal-white font-oswald px-[5rem] pb-[10rem]',
                            'max-tablet:text-[4rem] max-tablet:px-[3rem] max-tablet:pb-[5rem]'
                        )}>
                            Ми відкриваємо святі місця
                        </div>
                    </div>
                    <div className={cn(
                        'w-[50%] h-[100dvh] bg-regal-white px-[12.75rem]',
                        'max-tablet:px-[3rem]',
                        'max-mobile:w-full max-mobile:pt-[16.2rem] max-tablet:justify-start'
                    )}>
                        <div className='w-full h-full flex justify-center items-start flex-col'>
                            {
                                !isResponse ?
                                    <>
                                        <div className={cn(
                                            'text-[6.6rem] font-[700] mb-[2.6rem]',
                                            'max-tablet:text-[3.2rem] max-tablet:mb-[1.4rem]'
                                        )}>
                                            Введіть ваші контактні дані,
                                        </div>
                                        <div className={cn(
                                            'text-[2.6rem] mb-[5rem]',
                                            'max-tablet:text-[1.2rem] max-tablet:mb-[3rem]'
                                        )}>
                                            і наш менеджер зв&apos;яжеться з Вами
                                        </div>
                                        <form onSubmit={handleSubmit} className={cn(
                                            'flex flex-col w-full pointer-events-auto gap-y-[3rem]',
                                            'max-tablet:gap-y-[1.6rem]'
                                        )}>
                                            <InputForm type='text' name='name' placeholder="Ім'я" setUserForm={setUserForm} userForm={userForm} />
                                            <InputForm type='tel' name='phone' placeholder="+380" setUserForm={setUserForm} userForm={userForm} />
                                            <InputForm type='email' name='email' placeholder='E-mail' setUserForm={setUserForm} userForm={userForm} />
                                            <Button
                                                disabled={!isBtnActive}
                                                onMouseEnter={() => setIsBtnHovered(true)}
                                                onMouseLeave={() => setIsBtnHovered(false)}
                                                variant='outline_orange'
                                                className={cn(
                                                    'flex justify-center items-center mt-[2rem]',
                                                    'max-tablet:mt-[1.4rem]',
                                                    isBtnHovered ? 'bg-regal-orange' : '',
                                                    !isBtnActive ? 'grayscale' : 'grayscale-0'
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
                                        </form>
                                    </> :
                                    <>
                                        <div className={cn(
                                            'text-[6.6rem] font-[700] mb-[2.6rem] text-center',
                                            'max-tablet:text-[3.2rem] max-tablet:mb-[1.4rem]'
                                        )}>
                                            Дякуємо за заявку!
                                        </div>
                                        <div className={cn(
                                            'text-[2.6rem] mb-[5rem] text-center',
                                            'max-tablet:text-[1.2rem] max-tablet:mb-[3rem]'
                                        )}>
                                            Наш менеджер невдовзі зв&apos;яжеться з Вами
                                        </div>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
};