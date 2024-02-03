import { Form } from "antd"

interface FormItemLayoutProps { children: React.ReactNode, label: string, name: string, message: string }

const FormItemLayout = ({ children, label, name, message }: FormItemLayoutProps) => {
    return (
        <Form.Item
            name={name}
            label={label}
            className="form-item"
            rules={[{
                required: true, message

                //  "Please input Doctor Name!" 
            }]}
        >
            {children}
        </Form.Item>
    )
}

export default FormItemLayout