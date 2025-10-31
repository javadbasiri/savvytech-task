'use client';

import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/common/Button';
import { Input } from '@/components/common/Input';
import Modal from '@/components/common/Modal';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface IProps {
    initialData?: DataType;
    setTableData: Dispatch<SetStateAction<DataType[]>>;
    mode: 'Create' | 'Edit';
    onClose: () => void;
}

interface FormValues {
    title: string;
    subTitle: string;
}

const CreateModal = ({ mode, initialData, onClose, setTableData }: IProps) => {
    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isDirty },
    } = useForm<FormValues>({
        defaultValues: {
            title: '',
            subTitle: '',
        },
        mode: 'onChange',
    });

    const onSubmit = (formValues: FormValues) => {
        if (mode === 'Create') {
            setTableData((pre) => [
                ...pre,
                {
                    id: crypto.randomUUID(),
                    title: formValues.title,
                    subTitle: formValues.subTitle,
                    createdAt: new Date().toLocaleString('en-US', {
                        timeZone: 'Asia/Tehran',
                    }),
                },
            ]);
            toast.success('Item Created Successfully');
        } else if (isDirty) {
            setTableData((pre) =>
                pre.map((item) =>
                    item.id === initialData?.id
                        ? {
                              ...item,
                              ...formValues,
                          }
                        : item
                )
            );
            toast.success('Item Edited Successfully');
        }

        reset();
        onClose();
    };

    useEffect(() => {
        if (initialData) reset(initialData);
    }, [initialData, reset]);

    return (
        <Modal title={mode} isOpen={true} onClose={onClose}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-4 flex flex-col gap-8"
            >
                <Controller
                    name="title"
                    control={control}
                    rules={{
                        required: 'Title is Required',
                        minLength: {
                            value: 2,
                            message: 'Min Length 2',
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            label="Title"
                            {...field}
                            errorMessage={errors.title?.message}
                            autoFocus={mode === 'Create'}
                        />
                    )}
                />

                <Controller
                    name="subTitle"
                    control={control}
                    rules={{
                        required: 'Subtitle is Required',
                        minLength: {
                            value: 2,
                            message: 'Min Length 2',
                        },
                    }}
                    render={({ field }) => (
                        <Input
                            label="Subtitle"
                            {...field}
                            errorMessage={errors.subTitle?.message}
                        />
                    )}
                />

                <div className="flex gap-2 pt-2">
                    <Button type="submit">Confirm</Button>
                    <Button type="button" variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </form>
        </Modal>
    );
};

export default CreateModal;
