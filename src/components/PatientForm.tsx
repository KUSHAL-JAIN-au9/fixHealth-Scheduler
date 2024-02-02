/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Form, Input } from "antd"
import { useState } from "react";

type LayoutType = Parameters<typeof Form>[0]["layout"];
const PatientForm = () => {
    const [name, setName] = useState<string>("");
    const [phone, setPhone] = useState<number>();

    const [form] = Form.useForm();
    const [formLayout] = useState<LayoutType>("vertical");

    const onFinish = async (values: unknown) => {
        console.log("Received values of form: ", values);

    };


    return (
        <div
            style={{
                minHeight: "40rem",
                width: "100%",
                // background: "red",
                color: "white !important",
                display: "grid",
                placeItems: "center ",
            }}
        >
            <Form
                layout={formLayout}
                form={form}
                initialValues={{ layout: formLayout }}
                // onValuesChange={onFormLayoutChange}
                onFinish={onFinish}
                style={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
            >
                {" "}
                <h1>Book Appointment</h1>
                <Form.Item
                    name="PatientName"
                    label="Patient Name"
                    style={{ width: "100%" }}
                    rules={[{ required: true, message: "Please input your name!" }]}
                >
                    <Input
                        // prefix={<UserOutlined className="site-form-item-icon" />}
                        value={name}
                        placeholder="Patient Name"
                        type="text"
                    />
                </Form.Item>

                <Form.Item
                    name="phone"
                    label=" mobile number"
                    style={{ width: "100%" }}
                    rules={[{ required: true, message: "Please input your mobile number!" }]}
                >
                    <Input
                        // prefix={<UserOutlined className="site-form-item-icon" />}
                        value={phone}
                        placeholder="Patient mobile number"
                        type="tel"
                        pattern="[789]\d{9}"
                        title="Please enter valid mobile number"

                    />


                </Form.Item>

                <Form.Item
                    name="email"
                    label=" email"
                    style={{ width: "100%" }}
                    rules={[{ required: true, message: "Please input your email!" }]}
                >
                    <Input
                        // prefix={<UserOutlined className="site-form-item-icon" />}
                        value={phone}
                        placeholder="Patient email address"
                        type="email"

                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" >
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default PatientForm