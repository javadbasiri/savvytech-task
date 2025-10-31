import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@components/icons';
import { cn, type ClassesValue } from '@/utils/cn';

type ModalProps = {
    isOpen: boolean;
    title?: string | React.ReactElement;
    children: React.ReactElement;
    minHeight?: number;
    onClose?: () => void;
    size?: 'lg' | 'md' | 'sm';
    classes?: Partial<Record<'root' | 'title' | 'modal', ClassesValue>>;
};

const Modal = ({
    isOpen,
    title,
    children,
    minHeight,
    onClose,
    classes,
    size = 'md',
}: ModalProps) => {
    const rootRef = useRef<HTMLDivElement>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    const onClickDocument = (e: MouseEvent) => {
        try {
            const modal = modalRef.current;
            const root = rootRef.current;
            if (!modal || !root) return;

            const target = (e.target || e.currentTarget) as Node;
            if (target && !modal.contains(target) && root.contains(target)) {
                onClose?.();
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        let controller: AbortController | null = null;

        if (!onClose) return;

        try {
            controller = new AbortController();
            document.addEventListener('mousedown', onClickDocument, {
                signal: controller.signal,
            });

            document.addEventListener(
                'keydown',
                (e) => {
                    if (e.key === 'Escape') {
                        e.preventDefault();
                        e.stopPropagation();

                        controller!.abort();
                        onClose();
                    }
                },
                {
                    signal: controller.signal,
                }
            );
        } catch (e) {
            console.log(e);
        }

        return () => {
            if (controller) controller.abort();
        };
    }, []);

    if (!isOpen) return null;

    return createPortal(
        <div
            ref={rootRef}
            className={cn(
                'fixed inset-0 size-full flex items-center justify-center bg-black/20',
                [classes?.root ?? '']
            )}
        >
            <div
                ref={modalRef}
                className={cn(
                    'flex flex-col rounded-xl overflow-hidden bg-white',
                    {
                        'w-sm': size === 'sm',
                        'w-xl': size === 'md',
                        'w-3xl': size === 'lg',
                    },
                    [classes?.modal ?? '']
                )}
                style={{
                    minHeight: minHeight ? minHeight + 'px' : undefined,
                }}
            >
                {title && (
                    <div className="flex font-medium items-center justify-between p-3 bg-blue-100">
                        <span className={cn(classes?.title)}>{title}</span>

                        <button onClick={onClose} className="cursor-pointer">
                            <CloseIcon />
                        </button>
                    </div>
                )}
                {children}
            </div>
        </div>,
        document.getElementById('__MODALS') || document.body
    );
};

export default Modal;
