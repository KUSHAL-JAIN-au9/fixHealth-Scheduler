import "./App.css";
import { ConfigProvider } from "antd";
import AppointmentList from "./components/AppointmentList";
import Navbar from "./components/Navbar";
import { useState } from "react";
import { Appointments, ContextValue, DocContext, Doctor } from "./context/doctorContext";


function App() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [view, setView] = useState<string>("")
  const [appointments, setAppointments] = useState<Appointments[]>([]);

  const updateDoctor = (data: Doctor[]) => {
    setDoctors(data);

  };

  const updateView = (view: string) => {
    setView(view)
  };

  const updateAppointments = (data: Appointments[]) => {
    setAppointments(data);

  };

  const contextValue: ContextValue = {
    doctors,
    view,
    updateView,
    updateDoctor,
    updateAppointments,
    appointments
  };

  return (
    <>
      <DocContext.Provider value={contextValue}>
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#00b96b",
              borderRadius: 2,

              // Alias Token
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          {/* <Space>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
        </Space> */}
          <Navbar />
          <AppointmentList />
        </ConfigProvider>
      </DocContext.Provider >
    </>
  );
}

export default App;
