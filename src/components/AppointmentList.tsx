import { Button, Card } from "antd"
import { appointments } from "../data"
import Meta from "antd/es/card/Meta"


const AppointmentList = () => {
    return (
        <div style={{ width: "100%", height: "40rem", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center" }} >
            <h1 style={{ width: "100%", textAlign: "center" }}> Appointments </h1>
            <div style={{ width: "90%", margin: "16px", gap: 20, backgroundColor: "red", display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around", alignItems: "center", overflowY: "auto" }}>
                {
                    appointments.map((appointment, index) => {
                        return (<Card
                            style={{ width: 300 }}
                            cover={
                                <img
                                    alt="example"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                                />
                            }
                            actions={[
                                <Button type="primary" htmlType="submit" size="large" >
                                    Submit
                                </Button>,
                                <Button type="primary" htmlType="submit" size="large" >
                                    Submit
                                </Button>,
                                <Button type="primary" htmlType="submit" size="large" >
                                    Submit
                                </Button>
                                // <SettingOutline key="setting" />,
                                // <EditOutlined key="edit" />,
                                // <EllipsisOutlined key="ellipsis" />,
                            ]}
                        >
                            <Meta
                                title="Card title"
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