import { Button, Card, Select } from "antd"
import { appointments } from "../data"
import Meta from "antd/es/card/Meta"
import Btn from "./Btn"
import { useDoctorContext } from "../context/doctorContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"



const AppointmentList = () => {
    const [actionElements, setActionElements] = useState<React.ReactNode[]>([])
    const navigate = useNavigate();
    const { updateView, view } = useDoctorContext();
    console.log("view", view);

    const handleAllocate = () => {
        console.log("handleAllocate");
    }

    useEffect(() => {
        let actionArray: React.ReactNode = []
        if (view === 'Patient View') {
            actionArray = [<Button type="primary" size="large" htmlType="button" onClick={() => navigate("/book-appointment")} >Book</Button>, <Btn type="button" label="Enquiry" danger={true} />]
        }
        if (view === 'Sales Team View') {
            actionArray = [<Button type="primary" size="large" htmlType="button" onClick={handleAllocate} >Mark as Allocated</Button>]
        }
        setActionElements([...actionArray])


    }, [navigate, view])


    return (
        <div style={{ width: "100%", height: "40rem", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }} >
            <h1 style={{ width: "100%", textAlign: "center" }}> Appointments </h1>
            <div style={{ width: "90%", height: "200px", display: "flex", justifyContent: "space-between" }} >
                <Select
                    style={{ width: 120 }}
                    placeholder="Filter Appointments"
                    // onChange={(value: string) => setView(value)}
                    options={[
                        { value: 'jack', label: 'Jack' },
                        { value: 'lucy', label: 'Lucy' },
                        { value: 'Yiminghe', label: 'yiminghe' },
                        { value: 'disabled', label: 'Disabled', disabled: true },
                    ]}
                />
                <Select
                    style={{ width: 120 }}
                    placeholder="select view"
                    onChange={(value: string) => updateView(value)}
                    options={[
                        { value: 'Patient View', label: 'Patient View' },
                        { value: 'Doctor View', label: 'Doctor View' },
                        { value: 'Sales Team View', label: 'Sales Team View' },
                    ]}
                />
            </div>
            <div style={{ width: "90%", margin: "16px", gap: 20, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", overflowY: "auto" }}>
                {
                    appointments.map((appointment, index) => {
                        return (<Card
                            key={index}
                            style={{ width: 300 }}
                            className="appointment-card"
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            // <Btn type="button" label="Book" danger={false} />,
                            // <Btn type="button" label="Allocate" danger={false} />,
                            // <Btn type="button" label="Enquiry" danger={true} />,
                            actions={[...actionElements]}
                        >
                            <Meta

                                title={appointment.doctorName}
                                description="This is the description"
                            />
                        </Card>)
                    })
                }


            </div>
        </div >
    )
}

export default AppointmentList