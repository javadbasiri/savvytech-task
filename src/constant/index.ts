export const initialData: DataType[] = [
    {
        id: crypto.randomUUID(),
        title: 'Exercise',
        subTitle: '30 minutes morning run',
        createdAt: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Tehran',
        }),
    },
    {
        id: crypto.randomUUID(),
        title: 'Read Book',
        subTitle: 'Finish chapter 5 of Clean Code',
        createdAt: new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Tehran',
        }),
    },
];
