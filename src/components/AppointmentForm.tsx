/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Select,
  TimePicker,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";

type LayoutType = Parameters<typeof Form>[0]["layout"];
const AppointmentForm = () => {
  // Add your component logic here

  const [name, setName] = useState<string>("");
  const [specialities, setSpecialities] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [timeRange, setTimeRange] = useState<Array<string>>(["", ""]);

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");

  const onFinish = (values: unknown) => {
    console.log("Received values of form: ", values);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
  };

  // Filter `option.label` match the user type `input`
  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  //   function dayjs(
  //     arg0: string
  //   ): import("rc-picker/lib/interface").EventValue<import("dayjs").Dayjs> {
  //     throw new Error("Function not implemented.");
  //   }

  return (
    <div
      style={{
        minHeight: "40rem",
        width: "100%",
        // background: "red",
        color: "white !important",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        // onValuesChange={onFormLayoutChange}
        onFinish={onFinish}
        style={{ width: "50%" }}
      >
        {" "}
        <h1>Create Appointment</h1>
        <Form.Item
          name="Doctor Name"
          label="Doctor Name"
          rules={[{ required: true, message: "Please input Doctor Name!" }]}
        >
          <Input
            // prefix={<UserOutlined className="site-form-item-icon" />}
            value={name}
            placeholder="Doctor Name"
          />
        </Form.Item>
        <Form.Item
          name="Specialities"
          label="Specialities"
          rules={[{ required: true, message: "Please input Doctor Name!" }]}
        >
          <Select
            showSearch
            value={specialities}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={filterOption}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          name="Date"
          label="Date of Appointment"
          rules={[{ required: true, message: "Please input Date!" }]}
        >
          <DatePicker
            value={dayjs(date)} // Convert the date string to a Dayjs object
            style={{ width: "100%" }}
            onChange={onDateChange}
          />
        </Form.Item>
        <Form.Item
          name="Time"
          label="Time of Appointment"
          rules={[{ required: true, message: "Please input Time!" }]}
        >
          <TimePicker.RangePicker
            value={[timeRange[0], timeRange[1]]}
            style={{ width: "100%" }}
          />
        </Form.Item>
        {/* <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>
        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item> */}
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AppointmentForm;
