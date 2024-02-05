import { Button, Card, Empty, Select } from "antd"
import Meta from "antd/es/card/Meta"
import Btn from "./Btn"
import { Appointments, useDoctorContext } from "../context/doctorContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppointMentListContainer from "../pages/AppointMentListContainer"
import { filterDataByTime } from "../utils"
import { fetchData } from "../server/api.actions"



const AppointmentList = () => {
    const [actionElements, setActionElements] = useState<React.ReactNode[]>([])
    const [filteredappointments, setAppointments] = useState<Appointments[]>([]);
    const navigate = useNavigate();
    const { updateView, view, appointments, updateAppointments } = useDoctorContext();
    console.log("view", view, appointments);

    const handleAllocate = () => {
        console.log("handleAllocate");
    }

    useEffect(() => {
        let data
        (async () => {
            data = await fetchData();
            updateAppointments(data)
            // const isNotAllocatedAppointments = data.filter((appointment: Appointments) => appointment?.isAllocated)
            // console.log("isAllocatedAppointments", isNotAllocatedAppointments);
            setAppointments(data)
        })()

        let actionArray: React.ReactNode = []
        if (view === 'Patient View') {
            // const isAllocatedAppointments = data?.filter((appointment: Appointments) => appointment?.isAllocated)
            // console.log("isAllocatedAppointments", isAllocatedAppointments);
            actionArray = [<Button type="primary" size="large" htmlType="button" onClick={() => navigate("/book-appointment")} >Book</Button>, <Btn type="button" label="Enquiry" danger={true} />]
        }
        if (view === 'Sales Team View') {
            actionArray = [<Button type="primary" size="large" htmlType="button" onClick={handleAllocate} >Mark as Allocated</Button>]
        }
        setActionElements([...actionArray]);

    }, [navigate, view])

    useEffect(() => {

    }, [updateAppointments])


    const handleTimings = async (value: string) => {
        console.log("handleTimings value", value);
        const { morning, afternoon, evening } = filterDataByTime(appointments)

        console.log("morning", morning, afternoon, evening);
        switch (value) {
            case "Morning":
                setAppointments(morning);
                return;
            case "Afternoon":
                setAppointments(afternoon);
                return;
            case "Evening":
                setAppointments(evening);
                return;
            case "All": {

                setAppointments(appointments);
                return;
            }
            default:
                console.error("Invalid value:", value);
        }

    }

    return (
        <AppointMentListContainer>
            <h1 style={{ width: "100%", textAlign: "center" }}> Appointments </h1>
            <div style={{ width: "90%", display: "flex", justifyContent: "space-between" }} >
                <Select
                    style={{ width: 120 }}
                    placeholder="Filter Appointments"
                    onChange={handleTimings}
                    options={[
                        { value: 'All', label: 'All' },
                        { value: 'Morning', label: 'morning' },
                        { value: 'Afternoon', label: 'afternoon' },
                        { value: 'Evening', label: 'evening' }

                    ]}
                />

                <div>

                    {view !== "Patient View" && <Button htmlType="button" type="primary" style={{ marginRight: "10px" }} onClick={() => navigate("create-appointment")} >{"ADD"}</Button>}
                    <Select
                        style={{ width: 120, margin: "10px" }}
                        placeholder="select view"
                        onChange={(value: string) => updateView(value)}
                        options={[
                            { value: 'Patient View', label: 'Patient View' },
                            { value: 'Doctor View', label: 'Doctor View' },
                            { value: 'Sales Team View', label: 'Sales Team View' },
                        ]}
                    />
                </div>
            </div>
            {Array.isArray(filteredappointments) && filteredappointments.length > 0 && < div style={{ width: "90%", minHeight: "30rem", margin: "16px", gap: 20, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", overflowY: "auto" }}>
                {
                    filteredappointments?.map((appointment, index) => {
                        return (<Card
                            key={index}
                            style={{ width: 300 }}
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

                            actions={[...actionElements]}
                        >
                            <Meta

                                title={appointment?.doctor}
                                description={<>
                                    <span>{appointment?.date}  </span >
                                    <span >{appointment?.time[0] + " to " + appointment?.time[1]}</span >
                                </>}
                            />
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