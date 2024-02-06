/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input } from "antd"
import { useState } from "react";
import FormItemLayout from "../layout/FormItemLayout";
import Btn from "./Btn";
import Heading from "./Heading";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteAppointment, postBooking, putData } from "../api";
import { AnyObject } from "antd/es/_util/type";


type LayoutType = Parameters<typeof Form>[0]["layout"];
const PatientForm = () => {
    const [name] = useState<string>("");
    const [phone] = useState<number>();

    const [form] = Form.useForm();
    const [formLayout] = useState<LayoutType>("vertical");

    const { state } = useLocation();
    const navigate = useNavigate();
    // console.log("location", state);

    const onReset = () => {
        form.resetFields();
    };

    const onFinish = async (values: AnyObject) => {
        console.log("Received values of form: ", values);
        console.log(state._id);

        const payload = {
            patientName: values.PatientName,
            phone: values.phone,
            email: values.email,
            appointment: state._id
        }

        console.log("payload", payload);
        try {
            const data = await postBooking(payload)
            console.log(data);
            const findSlots = state.slots.filter((slot: any) => slot.status === "available")
            if (findSlots.length === 0) {
                alert("No slots available")
                return
            }
            if (findSlots.length === 1) {
                const res = await deleteAppointment(state._id)
                console.log("res deleted", res);
            }
            findSlots[0].status = "booked"
            console.log("findSlots", findSlots);
            const putstatus = await putData(state._id, { slots: findSlots })
            console.log(putstatus);
            onReset()
            alert("Booking Successful")
            navigate("/")
        } catch (error) {
            console.log("error", error)
        }

    };


    return (

        <Form
            className="form-container"
            layout={formLayout}
            form={form}
            initialValues={{ layout: formLayout }}
            // onValuesChange={onFormLayoutChange}
            onFinish={onFinish}
            style={{ width: "30%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
        >
            {" "}
            <Heading label="Book" />

            <FormItemLayout
                name="PatientName"
                label="Patient Name"
                message="Please input your name!"
            >
                <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    value={name}
                    placeholder="Patient Name"
                    type="text"
                />
            </FormItemLayout>
            {/* <Form.Item
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
                </Form.Item> */}
            <FormItemLayout
                name="phone"
                label=" mobile number"
                message="Please input your mobile number!"
            >
                <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    value={phone}
                    placeholder="Patient mobile number"
                    type="tel"
                    pattern="[789]\d{9}"
                    title="Please enter valid mobile number"

                />

            </FormItemLayout>

            {/* <Form.Item
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


                </Form.Item> */}

            <FormItemLayout
                name="email"
                label=" email"
                message="Please input your email!">
                <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    value={phone}
                    placeholder="Patient email address"
                    type="email"

                />
            </FormItemLayout>

            {/* <Form.Item
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
                </Form.Item> */}

            {/* <Form.Item>
                    <Button type="primary" htmlType="submit" size="large" >
                        Submit
                    </Button>
                </Form.Item> */}
            <Btn type="submit" label="Book" danger={false} />
        </Form>

    )
}

export default PatientForm