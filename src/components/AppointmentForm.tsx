/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DatePicker,
  DatePickerProps,
  Form,
  Select,
  TimePicker,
} from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import { RangeValue } from 'rc-picker/lib/interface'; // Import the RangeValue type
import { getTimeSlots } from "../utils";
import { getDoctors } from "../api";
import { useDoctorContext } from "../context/doctorContext";
import Btn from "./Btn";
import FormItemLayout from "../layout/FormItemLayout";
import Heading from "./Heading";






type LayoutType = Parameters<typeof Form>[0]["layout"];
const AppointmentForm = () => {
  const [name, setName] = useState<string>("");
  const [allDoctors, setAllDoctors] = useState<string[]>([]);
  // const [filteredSpecialities, setfilteredSpecialities] = useState<string[]>([]);
  const [specialities, setSpecialities] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [timeRange, setTimeRange] = useState<Array<string>>(["", ""]);

  const [form] = Form.useForm();
  const [formLayout, setFormLayout] = useState<LayoutType>("vertical");

  const { doctors: doctorData, updateDoctor: setDoctor } = useDoctorContext();

  console.log("doctors data", doctorData, allDoctors);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDoctors();
        console.log("api data", res);
        setDoctor(res); // Assuming res is of type Doctor[]
        const doctors = res.map((doctor: { name: string; }) => doctor.name);
        setAllDoctors([...doctors])
        return res; // Return the data to fulfill the promise
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
        return null; // Return null or some default value
      }
    };
    fetchData();
  }, []);


  const onFinish = async (values: unknown) => {
    console.log("Received values of form: ", values);
    console.log(timeRange, date);

    const slots = await getTimeSlots(timeRange[0], timeRange[1])
    console.log(slots, timeRange[0], timeRange[1]);
    const slotsInfo = slots.map((slot, i) => { return { id: i + 1, slot: slot, status: "available" } })
    console.log(slotsInfo);
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setName(value)
    const doctorSpecialities = doctorData.find((doctor: { name: string; }) => doctor.name === value)?.specialties;
    // console.log('specialties', doctorSpecialities);
    setSpecialities(doctorSpecialities ?? "")
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };





  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);
    setDate(dateString);
  };

  const handleTimeRangeChange = (time: Dayjs, timeString: [string, string]) => {
    console.log(time, timeString);
    setTimeRange([timeString[0], timeString[1]]);
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
      {/* <h1 className="heading">Create Appointment</h1> */}
      <Heading label="Create" />
      <FormItemLayout
        name="DoctorName"
        label="Doctor Name"
        message="Please input Doctor Name!"
      >
        <Select
          showSearch
          // value={specialities}

          placeholder="Select a doctor"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={allDoctors.map((doctor) => ({ label: doctor, value: doctor }))}
        />
      </FormItemLayout>

      <FormItemLayout
        name="specialities"
        label="Specialities"
        message="Please select specialities!"
      >
        <Select
          showSearch
          value={specialities}
          placeholder="Select a speciality"
          optionFilterProp="children"
          onChange={onChange}
          onSearch={onSearch}
          filterOption={filterOption}
          options={[specialities].map((speciality) => ({ label: speciality, value: speciality }))}
        />

      </FormItemLayout>

      <FormItemLayout
        name="Date"
        label="Date of appointment"
        message="Please select Date!"
      >
        <DatePicker
          value={dayjs(date)} // Convert the date string to a Dayjs object
          onChange={onDateChange}
          style={{ width: "100%" }}
        />
      </FormItemLayout>

      <FormItemLayout
        name="Time"
        label="Time of Appointment"
        message="Please select a time range!"
      >
        <TimePicker.RangePicker
          // defaultValue={[dayjs("00:00", "h:mm a"), dayjs("00:00", "h:mm a",)]}
          value={[dayjs(timeRange[0]), dayjs(timeRange[1])]}
          onChange={(values: RangeValue<Dayjs> | null, formatString: [string, string]) => handleTimeRangeChange(values?.[0] || dayjs(), formatString)}
          use12Hours
          format={"h:mm a"}
          style={{ width: "100%", color: "white" }}
        />
      </FormItemLayout>

      {/* <Form.Item
        name="Time"
        label="Time of Appointment"
        className="form-item"
        rules={[{ required: true, message: "Please input Time!" }]}
      >
        <TimePicker.RangePicker
          // defaultValue={[dayjs("00:00", "h:mm a"), dayjs("00:00", "h:mm a",)]}
          value={[dayjs(timeRange[0]), dayjs(timeRange[1])]}
          onChange={(values: RangeValue<Dayjs> | null, formatString: [string, string]) => handleTimeRangeChange(values?.[0] || dayjs(), formatString)}
          use12Hours
          format={"h:mm a"}
          style={{ width: "100%", color: "white" }}
        />
      </Form.Item> */}

      <Form.Item>
        {/* <Button className="btn-grad " type="primary" htmlType="submit" size="large" >
          Submit
        </Button> */}
        <Btn label="Create" type={"submit"} danger={false} />
      </Form.Item>
    </Form >

  );
};

export default AppointmentForm;
