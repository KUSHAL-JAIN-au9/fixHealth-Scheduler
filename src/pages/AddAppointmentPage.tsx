import { useState } from "react";
import { ContextValue, DocContext, Doctor } from "../context/doctorContext"
import AppointmentForm from "../components/AppointmentForm";
import FormContainerLayout from "../layout/FormContainerLayout";



const AddAppointmentPage = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [view, setView] = useState<string>("")

    const updateDoctor = (data: Doctor[]) => {
        setDoctors(data);

    };

    const updateView = (view: string) => {
        setView(view)
    };

    const contextValue: ContextValue = {
        doctors,
        view,
        updateView,
        updateDoctor,

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