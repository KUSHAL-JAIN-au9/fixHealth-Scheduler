import { Button, Card, Empty, Select } from "antd"
import Meta from "antd/es/card/Meta"
import Btn from "./Btn"
import { Appointments, useDoctorContext } from "../context/doctorContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppointMentListContainer from "../pages/AppointMentListContainer"
import { filterDataByTime } from "../utils"
import { fetchData } from "../server/api.actions"
import { putData } from "../api"
import { currentWeek } from "../data"


// const customWeekStartEndFormat = (value) =>
//     `${dayjs(value).startOf('isoWeek').format(weekFormat)} ~ ${dayjs(value).endOf('isoWeek').subtract(1, 'day').format(weekFormat)}`;



const AppointmentList = () => {
    const [, setActionElements] = useState<React.ReactNode[]>([])
    const [filteredappointments, setAppointments] = useState<Appointments[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false)
    const [, setTiming] = useState<string>("")
    const navigate = useNavigate();
    const { updateView, view, appointments, updateAppointments } = useDoctorContext();
    console.log("view", view);

    const handleAllocate = async (id: string) => {


        console.log("handleAllocate", id);
        try {
            const data = await putData(id, { isAllocated: true })
            console.log("data", data);
            setRefresh(!refresh)
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {


        let actionArray: React.ReactNode = []
        if (view === 'Patient View') {
            const isNotAllocatedAppointments = appointments?.filter((appointment: Appointments) => appointment?.isAllocated)
            console.log("is  AllocatedAppointments", isNotAllocatedAppointments);
            setAppointments(isNotAllocatedAppointments)
            actionArray = [<Btn type="button" label="Enquiry" danger={true} />]
        }
        if (view === 'Sales Team View') {
            const isAllocatedAppointments = appointments?.filter((appointment: Appointments) => appointment?.isAllocated === false)
            console.log("isAllocatedAppointments", isAllocatedAppointments);
            setAppointments(isAllocatedAppointments)
            // actionArray = [<Button type="primary" size="large" htmlType="button" onClick={(e) => handleAllocate(e)} >Mark as Allocated</Button>]
        }
        if (view === 'Doctor View') setAppointments(appointments)
        setActionElements([...actionArray]);

    }, [navigate, view])

    useEffect(() => {
        let data
        (async () => {
            data = await fetchData();
            updateAppointments(data)
            // const isNotAllocatedAppointments = data.filter((appointment: Appointments) => appointment?.isAllocated)
            // console.log("isAllocatedAppointments", isNotAllocatedAppointments);
            setAppointments(data)
        })()
    }, [refresh])


    const handleTimings = async (value: string) => {
        console.log("handleTimings value", value);
        const { morning, afternoon, evening } = filterDataByTime(appointments)
        setTiming(value)

        console.log("morning", morning, afternoon, evening);
        switch (value) {
            case "Morning":
                if (view === "Sales Team View") {
                    const isAllocatedAppointments = morning?.filter((appointment: Appointments) => appointment?.isAllocated === false)
                    setAppointments(isAllocatedAppointments);
                    return;
                }
                if (view === "Patient View") {
                    const isAllocatedAppointments = morning?.filter((appointment: Appointments) => appointment?.isAllocated)
                    setAppointments(isAllocatedAppointments);
                    return;
                }
                setAppointments(morning);
                return;
            case "Afternoon":
                if (view === "Sales Team View") {
                    const isAllocatedAppointments = afternoon?.filter((appointment: Appointments) => appointment?.isAllocated === false)
                    setAppointments(isAllocatedAppointments);
                    return;
                }
                if (view === "Patient View") {
                    const isAllocatedAppointments = afternoon?.filter((appointment: Appointments) => appointment?.isAllocated)
                    setAppointments(isAllocatedAppointments);
                    return;
                }
                setAppointments(afternoon);
                return;
            case "Evening":

                // console.log("isAllocatedAppointments", isAllocatedAppointments);
                if (view === "Sales Team View") {
                    const isAllocatedAppointments = evening?.filter((appointment: Appointments) => appointment?.isAllocated === false)
                    setAppointments(isAllocatedAppointments);
                    return;
                }
                if (view === "Patient View") {
                    const isAllocatedAppointments = evening?.filter((appointment: Appointments) => appointment?.isAllocated)
                    setAppointments(isAllocatedAppointments);
                    return;
                }
                setAppointments(evening);
                return;
            case "All": {
                const isAllocatedAppointments = appointments?.filter((appointment: Appointments) => appointment?.isAllocated === false)
                console.log("isAllocatedAppointments", isAllocatedAppointments);
                setAppointments(appointments);
                return;
            }
            default:
                console.error("Invalid value:", value);
        }

    }

    // console.log("filterAppointments", filteredappointments);
    console.log("current week", currentWeek);
    return (
        <AppointMentListContainer>
            <h1 className="heading" style={{ width: "100%", textAlign: "center" }}> Slots </h1>
            <div className="appointment-list-filter-container" style={{ width: "90%", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                <Select
                    style={{ width: 120 }}
                    // value={timing}
                    defaultValue="All"
                    placeholder="Filter Appointments"
                    onChange={handleTimings}
                    options={[
                        { value: 'All', label: 'All' },
                        { value: 'Morning', label: 'morning' },
                        { value: 'Afternoon', label: 'afternoon' },
                        { value: 'Evening', label: 'evening' }

                    ]}
                />

                <div className="appointment-list-view-container">
                    {view !== "Patient View" && view !== "" &&
                        <>
                            {/* {currentWeek === "Sunday" &&  */}
                            <Button htmlType="button" type="primary" style={{ marginRight: "10px" }} onClick={() => navigate("create-appointment")} >{"ADD"}</Button>
                            {/* } */}
                            <Button htmlType="button" type="primary" style={{ marginRight: "10px" }} onClick={() => navigate("scheduler")} >{"View in Scheduler"}</Button></>}
                    <Select
                        style={{ width: 120, margin: "10px" }}
                        className="appointment-list-view-select"
                        placeholder="select view"
                        defaultValue={'Patient View'}
                        onChange={(value: string) => value && updateView(value)}
                        options={[
                            { value: 'Patient View', label: 'Patient View' },
                            { value: 'Doctor View', label: 'Doctor View' },
                            { value: 'Sales Team View', label: 'Sales Team View' },
                        ]}
                    />
                </div>
            </div>
            {Array.isArray(filteredappointments) && filteredappointments.length > 0 && < div style={{ width: "90%", minHeight: "30rem", margin: "16px", gap: 20, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", alignItems: "center", overflowY: "auto" }}>
                {
                    filteredappointments?.map((appointment, index) => {
                        return (<Card
                            key={index}
                            style={{ width: 280, minHeight: "30rem", display: "flex", flexDirection: "column" }}
                            className="appointment-card"
                            cover={
                                <div style={{ width: "100%", height: "280px", overflow: "hidden" }}>
                                    <img
                                        alt="example"
                                        src={appointment?.img}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </div>
                            }

                        // actions={[...actionElements]}
                        >
                            <Meta

                                title={view !== "Patient View" && appointment?.doctor}
                                description={<>
                                    <span><strong>Speciality:</strong> {appointment?.specialities}  </span >
                                    <span><strong>Date:</strong> {appointment?.date}  </span >
                                    <span><strong>available week :</strong> {appointment?.week}  </span >
                                    <span ><strong>Timings:</strong> {appointment?.time[0] + " to " + appointment?.time[1]}</span >
                                </>}
                            />
                            {view === "Sales Team View" && !appointment.isAllocated && <div style={{ width: "100%", display: "grid", placeItems: "center" }}> <Button style={{ margin: "10px" }} type="primary" size="large" htmlType="button" onClick={() => handleAllocate(appointment?._id)} >Mark as Allocated</Button></div>}
                            {view === "Patient View" && <div style={{ width: "100%", display: "grid", placeItems: "center" }}> <Button style={{ margin: "10px" }} type="primary" size="large" htmlType="button" onClick={() => navigate("/book-appointment", { state: appointment })} >Book</Button></div>}
                        </Card>)
                    })
                }


            </div>}
            {filteredappointments.length === 0 &&
                <Empty style={{ width: "100%", height: "40rem", display: "flex", flexDirection: "column", justifyContent: "center", color: "white" }} />}
        </AppointMentListContainer >
    )
}

export default AppointmentList