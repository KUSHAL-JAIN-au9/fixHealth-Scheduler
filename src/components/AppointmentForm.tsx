/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  Select,
  TimePicker,
} from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs, OpUnitType } from "dayjs";

import { RangeValue } from 'rc-picker/lib/interface'; // Import the RangeValue type
import { getTimeSlots } from "../utils";
import { getDoctors, postData } from "../api";
import { useDoctorContext } from "../context/doctorContext";
import Btn from "./Btn";
import FormItemLayout from "../layout/FormItemLayout";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import { dateFormat, weekFormat } from "../data";

import isoWeek from 'dayjs/plugin/isoWeek';


interface DoctorDeatils {
  name: string,
  specialities: string,
  img: string,
  city: string
}

// Extend dayjs with the isoWeek plugin
dayjs.extend(isoWeek);

//  Define the function to get the Monday of the week for a given date string
const getMondayOfWeekRange = (dateString: string) => {
  const date = dayjs(dateString.split(' ~ ')[0], weekFormat);
  const monday = date.startOf('week');
  return monday.format(dateFormat);
};

const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('isoWeek' as OpUnitType).format(weekFormat)} ~ ${dayjs(value).endOf('isoWeek' as OpUnitType).subtract(1, 'day').format(weekFormat)}`;

type LayoutType = Parameters<typeof Form>[0]["layout"];
const AppointmentForm = () => {
  const [, setName] = useState<string>("");
  const [doctoDetails] = useState<DoctorDeatils>({
    name: "",
    specialities: "",
    img: "",
    city: ""
  });
  const [allDoctors, setAllDoctors] = useState<string[]>([]);
  // const [filteredSpecialities, setfilteredSpecialities] = useState<string[]>([]);
  const [specialities, setSpecialities] = useState<string>("");
  const [city] = useState<string>("");
  const [img] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [week, setWeek] = useState<string>("");
  const [timeRange, setTimeRange] = useState<Array<string>>(["", ""]);

  const [form] = Form.useForm();
  const [formLayout] = useState<LayoutType>("vertical");

  const { doctors: doctorData, updateDoctor: setDoctor } = useDoctorContext();

  console.log("doctors data", img, city, specialities, doctoDetails, doctorData);
  const navigate = useNavigate();
  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDoctors();
        console.log("api data", res);
        if (res) {
          setDoctor(res); // Assuming res is of type Doctor[]
          const doctors = res.map((doctor: { name: string; }) => doctor.name);
          setAllDoctors([...doctors])
        }
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
    // e.preventDefault();
    console.log("Received values of form: ", values);
    // console.log(timeRange, date);
    // console.log("doctoDetails", doctoDetails);

    const doctor = doctorData?.find((doctor: { name: string; }) => doctor.name === (values as { DoctorName: string })?.DoctorName)
    console.log("doctorSpeciality", doctor);

    const slots = await getTimeSlots(timeRange[0], timeRange[1])
    console.log(slots, timeRange[0], timeRange[1]);
    const slotsInfo = slots.map((slot, i) => { return { id: i + 1, slot: slot, status: "available" } })
    console.log(slotsInfo);
    const payload = {
      doctor: (values as { DoctorName: string }).DoctorName,
      specialities: doctor?.specialties || specialities,
      date: date,
      time: timeRange,
      slots: slotsInfo,
      img: doctor?.img,
      city: doctor?.city,
      week: week
    }


    try {
      console.log("payload", payload);

      const res = await postData(payload);
      console.log("post res", res);
      onReset();
      setWeek("");
      alert("Appointment added Successful")
      navigate("/")

    } catch (error) {
      throw new Error("Error creating appointment");
    }



  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
    setName(value);
    const doctorSpeciality = doctorData?.find((doctor: { name: string; }) => doctor.name === value)?.specialties

    setSpecialities(doctorSpeciality ?? "");
    // const { specialities, img, city } = doctor as { name: string; specialities: string; img: string; city: string; };
    // console.log('filteredDoctorDetails', doctor);
    // setSpecialities(specialities);
    // setCity(city);
    // setImg(img);
  };

  const onSearch = (value: string) => {
    console.log("search:", value);
  };





  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    console.log(date, dateString);

    const monday = getMondayOfWeekRange(dateString);
    console.log("monday", monday); // Outputs the date of the Monday of the current week
    setDate(monday);
    setWeek(dateString);
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

      <Form.Item
        name="city"
        label="city"
        className="form-item"
        hidden
      >
        <Input
          // prefix={<UserOutlined className="site-form-item-icon" />}
          value={doctoDetails.city}
          defaultValue={doctoDetails.city}
          placeholder="doctor city"
          type="text"


        />
      </Form.Item>

      <Form.Item
        name="img"
        label="img"
        className="form-item"
        hidden
      >
        <Input
          // prefix={<UserOutlined className="site-form-item-icon" />}
          value={doctoDetails.img}
          defaultValue={doctoDetails.img}
          placeholder="doctor image"
          type="text"
          hidden
        />
      </Form.Item>

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
      {/* 
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
      </FormItemLayout> */}


      <FormItemLayout
        name="Week"
        label="Week of availability"
        message="Please select a Week of availability!"

      >
        <DatePicker
          style={{ width: "100%" }}
          placeholder="Select week"
          value={dayjs(week, weekFormat)}
          // defaultValue={dayjs()}
          format={customWeekStartEndFormat}
          picker="week"
          onChange={onDateChange}
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
