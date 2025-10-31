'use client';

import { cn } from '@/utils/cn';

export interface ITableColumns<T> {
    key: keyof T;
    label: string;
    formatter?: (value: T[keyof T], record: T) => React.ReactNode;
    className?: (value: T[keyof T]) => string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
}

interface ITableProps<T> {
    columns: Array<ITableColumns<T>>;
    data?: T[];
    getRowStyle?: (value: T) => string;
    height?: number;
}

const Table = <T,>({
    columns,
    data,
    getRowStyle,
    height = 600,
}: ITableProps<T>) => {
    return (
        <div style={{ height }} className="relative w-full overflow-auto">
            <table className={cn('w-full text-sm')}>
                <thead className="sticky top-0">
                    <TableRow>
                        {columns.map(
                            (
                                { label, key, width, minWidth, maxWidth },
                                index
                            ) => (
                                <TableHead
                                    style={{ width, minWidth, maxWidth }}
                                    key={String(key) + index}
                                >
                                    {label}
                                </TableHead>
                            )
                        )}
                    </TableRow>
                </thead>
                <tbody>
                    {data?.map((rowData, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            className={getRowStyle?.(rowData)}
                        >
                            {columns.map(
                                (
                                    {
                                        key,
                                        formatter,
                                        className,
                                        width,
                                        minWidth,
                                        maxWidth,
                                    },
                                    columnIndex
                                ) => {
                                    const columnValue = rowData[key];
                                    return (
                                        <TableCell
                                            key={String(key) + columnIndex}
                                            style={{
                                                width,
                                                minWidth,
                                                maxWidth,
                                            }}
                                            className={
                                                className
                                                    ? className(columnValue)
                                                    : ''
                                            }
                                        >
                                            {formatter
                                                ? formatter(
                                                      columnValue,
                                                      rowData
                                                  )
                                                : String(columnValue ?? '-')}
                                        </TableCell>
                                    );
                                }
                            )}
                        </TableRow>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
    return (
        <tr
            className={cn(
                'flex border-b border-gray-200 transition-colors even:bg-gray-100 hover:bg-blue-100',
                className
            )}
            {...props}
        />
    );
};

const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
    return (
        <th
            className={cn(
                'flex-1 flex items-center justify-center bg-gray-300 h-10 px-2 font-medium',
                className
            )}
            {...props}
        />
    );
};

const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
    return (
        <td
            className={cn(
                'p-2 flex-1 flex items-center justify-center',
                className
            )}
            {...props}
        />
    );
};

export default Table;
