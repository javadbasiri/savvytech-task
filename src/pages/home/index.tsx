import Button from '@/components/common/Button';
import type { ITableColumns } from '@/components/common/Table';
import Table from '@/components/common/Table';
import { CreateIcon, DeleteIcon, EditIcon } from '@/components/icons';
import CreateModal from '@/components/pages/home/CreateModal';
import DeleteModal from '@/components/pages/home/DeleteModal';
import { initialData } from '@/constant';
import { useState } from 'react';

type ModalState =
    | { modal: 'create'; data?: DataType }
    | { modal: 'edit' | 'delete'; data: DataType };

const Home = () => {
    const [tableData, setTableData] = useState<DataType[]>(initialData);
    const [modalState, setModalState] = useState<ModalState | null>(null);

    const openCreateModal = () => {
        setModalState({
            modal: 'create',
            data: undefined,
        });
    };

    const openEditModal = (data: DataType) => {
        setModalState({
            modal: 'edit',
            data,
        });
    };

    const openDeleteModal = (data: DataType) => {
        setModalState({
            modal: 'delete',
            data,
        });
    };

    const closeModal = () => setModalState(null);

    const columns: ITableColumns<DataType>[] = [
        {
            key: 'title',
            label: 'title',
        },
        {
            key: 'subTitle',
            label: 'subTitle',
        },
        {
            key: 'createdAt',
            label: 'createdAt',
        },
        {
            key: 'id',
            label: 'action',
            maxWidth: 120,
            formatter: (_, record) => (
                <div className="flex gap-2">
                    <Button
                        onClick={() => openEditModal(record)}
                        className="text-green-500 border-none px-0 bg-transparent"
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        onClick={() => openDeleteModal(record)}
                        className="text-red-500 border-none px-0 bg-transparent"
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full pt-20 max-w-4xl mx-auto">
            <Button className="mb-6 flex gap-2" onClick={openCreateModal}>
                <CreateIcon />
                Create
            </Button>

            <Table data={tableData} columns={columns} />

            {['create', 'edit'].includes(modalState?.modal ?? '') && (
                <CreateModal
                    mode={modalState?.modal === 'create' ? 'Create' : 'Edit'}
                    onClose={closeModal}
                    initialData={modalState?.data}
                    setTableData={setTableData}
                />
            )}

            {modalState?.modal === 'delete' && (
                <DeleteModal
                    onClose={closeModal}
                    itemID={modalState?.data?.id}
                    setTableData={setTableData}
                />
            )}
        </div>
    );
};

export default Home;
