import { cn } from '@/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline';
}

const Button = ({
    children,
    className,
    variant = 'default',
    ...props
}: ButtonProps) => {

    return (
        <button
            role="button"
            className={cn(
                'border text-white hover:scale-105 bg-blue-400 font-medium rounded-md cursor-pointer px-6 py-1',
                {
                    'text-blue-400 border-blue-400 bg-white':
                        variant === 'outline',
                },
                [className && className]
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
