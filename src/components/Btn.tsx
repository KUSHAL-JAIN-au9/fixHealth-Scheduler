import { Button } from 'antd'


interface BtnProps {
    label: string;
    type: "button" | "submit" | "reset" | undefined;
    danger: boolean;
}

const Btn = ({
    label, type, danger
}: BtnProps) => {
    return (
        <Button style={{ marginBottom: "20px" }} danger={danger} type="primary" htmlType={type} size='large' >{label}</Button>
    )
}

export default Btn