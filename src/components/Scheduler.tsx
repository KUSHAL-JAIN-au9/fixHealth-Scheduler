import { ScheduleComponent, Day, Week, WorkWeek, Month, Inject } from '@syncfusion/ej2-react-schedule';
import { Appointments } from '../context/doctorContext';
import { useEffect, useState } from 'react';
import { fetchData } from '../server/api.actions';

interface ScheduleData {
    id: number,
    Subject: string,
    StartTime: Date,
    EndTime: Date
}
const Scheduler = () => {
    const [scheduleData, setScheduleData] = useState<ScheduleData[]>([]);

    useEffect(() => {
        (async () => {
            const data = await fetchData()

            console.log("data", data);
            const refactoredAppointmentData = data.map((appointment: Appointments, i: number) => {

                console.log(appointment);
                return {
                    id: i + 1,
                    Subject: `Dr.${appointment.doctor}'s Appointment`,
                    StartTime: new Date(`${appointment.date} ${appointment.time[0]}`),
                    EndTime: new Date(`${appointment.date} ${appointment.time[1]}`),
                    RecurrenceRule: 'FREQ=DAILY;INTERVAL=1;COUNT=6;BYDAY=MO,TU,WE,TH,FR,SA'
                }
            })
            // console.log("refactoredAppointmentData", refactoredAppointmentData);
            setScheduleData(refactoredAppointmentData)
        })()

        return () => {

        }
    }, [])

    return (
        <ScheduleComponent
            currentView='Month'
            style={{ margin: "120px 120px 0px 120px" }}
            selectedDate={new Date("2024-02-02")}
            eventSettings={{
                dataSource: scheduleData,
                allowAdding: false,
                allowEditing: false,
                allowDeleting: false


            }}
        >
            <Inject services={[Day, Week, WorkWeek, Month]} />
        </ScheduleComponent>
    )
}

export default Scheduler
