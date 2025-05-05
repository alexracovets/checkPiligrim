'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface UserFormField {
    value: string;
    isValid: boolean;
}

interface UserForm {
    name: UserFormField;
    email: UserFormField;
    phone: UserFormField;
}

interface Props {
    type: string;
    name: keyof UserForm;
    placeholder: string;
    setUserForm: React.Dispatch<React.SetStateAction<UserForm>>;
    userForm: UserForm;
}

export const InputForm: React.FC<Props> = ({ type, name, placeholder, setUserForm, userForm }) => {
    const [isValid, setIsValid] = useState(true);
    const [valueData, setValueData] = useState(userForm[name].value);


    const validateInput = (value: string) => {
        if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(value);
        } else if (type === 'text') {
            return value.length > 3;
        }
        return true;
    }

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (type === 'text') {
            value = value.replace(/^\s+/, '').replace(/\s{2,}/g, ' ');
        }
        setValueData(value);
        setIsValid(validateInput(value));
    }

    useEffect(() => {
        setUserForm(prevForm => ({
            ...prevForm,
            [name]: {
                value: valueData,
                isValid: isValid
            }
        }));
    }, [valueData, name, setUserForm, isValid]);

    return (
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={valueData}
            onChange={(e) => changeHandler(e)}
            className={cn(
                'text-[2.2rem] px-[3rem] py-[1rem] border-[0.2rem] border-regal-black rounded-[5rem]',
                'max-tablet:text-[1rem] max-tablet:px-[2rem] max-tablet:py-[.8rem]',
                isValid ? 'border-regal-black' : 'border-regal-orange'
            )}
        />
    );
};