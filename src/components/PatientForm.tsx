/* eslint-disable @typescript-eslint/no-unused-vars */
import { Form, Input, Select } from "antd"
import { useEffect, useState } from "react";
import FormItemLayout from "../layout/FormItemLayout";
import Btn from "./Btn";
import Heading from "./Heading";
import { useLocation, useNavigate } from "react-router-dom";
import { postBooking, putData } from "../api";
import { AnyObject } from "antd/es/_util/type";
import { DateSlots, Slots, createAppointmentObjects } from "../utils";
import { filterOption, onSearch } from "../constants";


type LayoutType = Parameters<typeof Form>[0]["layout"];
const PatientForm = () => {
    const [name] = useState<string>("");
    const [phone] = useState<number>();
    const [date, setDate] = useState<string>("")
    const [slotDates, setSlotDates] = useState<string[]>([])

    const [form] = Form.useForm();
    const [formLayout] = useState<LayoutType>("vertical");

    const { state } = useLocation();
    const navigate = useNavigate();
    console.log("location", state);

    useEffect(() => {
        (async () => {
            const { dates } = await createAppointmentObjects(state?.week)
            console.log("weekDates", dates);
            setSlotDates(dates);
        })();
    }, [])

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
            appointment: state._id,
            date: date
        }

        console.log("payload", payload);
        try {
            const data = await postBooking(payload)
            console.log(data);
            const slotObj = state.slots.find((slot: DateSlots) => slot.date === date)
            const findSlots = slotObj.slots.filter((slot: Slots) => slot.status === "available")
            console.log("findSlots", findSlots);
            if (findSlots.length === 0) {
                alert("No slots available")
                return
            }
            if (findSlots.length === 1) {

                alert("No slots available at  the day please select another day")
            }
            findSlots[0].status = "booked"
            console.log("findSlots all object", { slots: [...state.slots] });
            const putstatus = await putData(state._id, { slots: [...state.slots] })
            console.log(putstatus);
            onReset()
            alert("Booking Successful")
            navigate("/")
        } catch (error) {
            console.log("error", error)
        }

    };

    const handleChangeDate = (value: string) => {
        console.log(`selected ${value}`);
        setDate(value)
    }


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
                label=" Mobile number"
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
                label="Email"
                message="Please input your email!">
                <Input
                    // prefix={<UserOutlined className="site-form-item-icon" />}
                    value={phone}
                    placeholder="Patient email address"
                    type="email"

                />
            </FormItemLayout>

            <FormItemLayout
                name="bookingDate"
                label="Booking Date"
                message="Please select a date!"
            >
                <Select
                    showSearch
                    value={date}
                    placeholder="Select a date"
                    optionFilterProp="children"
                    onChange={handleChangeDate}
                    onSearch={onSearch}
                    filterOption={filterOption}
                    options={slotDates.map((date) => ({ label: date, value: date }))}
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