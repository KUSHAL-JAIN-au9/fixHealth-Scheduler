import { useState } from "react";
import { Appointments, ContextValue, DocContext, Doctor } from "../context/doctorContext"
import AppointmentForm from "../components/AppointmentForm";
import FormContainerLayout from "../layout/FormContainerLayout";



const AddAppointmentPage = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [appointments, setAppointments] = useState<Appointments[]>([]);
    const [view, setView] = useState<string>("")

    const updateDoctor = (data: Doctor[]) => {
        setDoctors(data);

    };

    const updateAppointments = (data: Appointments[]) => {
        setAppointments(data);

    };

    const updateView = (view: string) => {
        setView(view)
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

        <DocContext.Provider value={contextValue}>
            <FormContainerLayout >
                <AppointmentForm />
            </FormContainerLayout>
        </DocContext.Provider>
    )
}

export default AddAppointmentPage