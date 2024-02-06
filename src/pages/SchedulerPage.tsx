import { useState } from "react";
import Scheduler from "../components/Scheduler"
import { Appointments, ContextValue, DocContext, Doctor } from "../context/doctorContext"
import Navbar from "../components/Navbar";



const SchedulerPage = () => {
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
        updateAppointments,
        appointments,
        updateDoctor,
        doctors,
        view,
        updateView
    };


    return (
        <DocContext.Provider value={contextValue}>
            <Navbar />
            <div >
                <Scheduler />
            </div>
        </DocContext.Provider>
    )
}

export default SchedulerPage