import { cn, type ClassesValue } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';

const inputVariants = cva(
    'relative block rounded-lg border border-gray-300 bg-white px-4 py-2 text-xs transition-all duration-200 focus-within:border-blue-400 focus-within:shadow-md',
    {
        variants: {
            size: {
                default: 'h-10 text-base',
                sm: 'h-8 text-sm',
                lg: 'h-12 text-lg',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);

interface InputProps
    extends Omit<
            React.InputHTMLAttributes<HTMLInputElement>,
            'size' | 'placeholder'
        >,
        VariantProps<typeof inputVariants> {
    label: string;
    placeholder?: string;
    errorMessage?: string;
    classes?: Partial<
        Record<'container' | 'input' | 'label' | 'placeholder', ClassesValue>
    >;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            classes,
            size,
            className,
            placeholder,
            errorMessage,
            type,
            ...props
        },
        ref
    ) => {
        return (
            <label
                className={cn(
                    inputVariants({ size, className }),
                    {
                        'border-red-500 focus-within:border-red-500':
                            !!errorMessage,
                    },
                    classes?.container
                )}
            >
                <input
                    type={type}
                    className={cn(
                        'peer relative z-10 flex h-full w-full border-none bg-transparent outline-none placeholder:invisible focus:placeholder:visible',
                        classes?.input
                    )}
                    ref={ref}
                    {...props}
                />
                {!props.value && (
                    <span
                        className={cn(
                            'invisible absolute left-0 top-1/2 -translate-y-1/2 bg-inherit px-3 text-gray-400 peer-focus:visible',
                            classes?.placeholder
                        )}
                    >
                        {placeholder}
                    </span>
                )}
                <span
                    className={cn(
                        'absolute left-0 top-1/2 -translate-y-1/2 bg-inherit px-3 text-gray-400 duration-200 peer-focus:top-0 peer-focus:scale-75',
                        { 'top-0 scale-75': Boolean(props.value) },
                        {
                            'text-red-500': !!errorMessage,
                            'peer-focus:text-blue-400': !errorMessage,
                        },
                        classes?.label
                    )}
                >
                    {label}
                </span>

                {!!errorMessage && (
                    <span className="text-red-500 text-xs absolute -bottom-4 left-0">
                        {errorMessage}
                    </span>
                )}
            </label>
        );
    }
);

Input.displayName = 'Input';
export { Input };
