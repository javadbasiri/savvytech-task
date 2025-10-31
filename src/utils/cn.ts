import clsx, { type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export type ClassesValue = ClassValue;

export const cn = (...args: ClassValue[]) => {
    return twMerge(clsx(args));
};
