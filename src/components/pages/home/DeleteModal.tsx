import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import type { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

interface IProps {
    onClose: () => void;
    itemID?: string;
    setTableData: Dispatch<SetStateAction<DataType[]>>;
}

const DeleteModal = ({ itemID, onClose, setTableData }: IProps) => {
    const handleDelete = () => {
        setTableData((pre) => pre.filter(({ id }) => id !== itemID));
        toast.success('Item Deleted Successfully');
        onClose();
    };

    return (
        <Modal title={'Deleting'} isOpen={true} onClose={onClose}>
            <div className='p-4'>
                <p className='font-medium mb-4'>Do you confirm to delete?</p>

                <div className="flex gap-2 pt-2">
                    <Button onClick={handleDelete}>Confirm</Button>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default DeleteModal;
