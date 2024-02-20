import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';


const { confirm } = Modal;
export const handleSlotAllocation = (callabck: () => void) => {
    confirm({
        title: 'Do you want to allocate this slot ?',
        icon: <ExclamationCircleFilled />,
        content: <TextArea rows={4} placeholder="Any Remarks" maxLength={6} />,
        onOk() {
            return new Promise(() => {
                // setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                callabck();
            }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
            console.log('Cancel')
        },
    });
};