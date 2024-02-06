import { createContext, useContext } from "react";

export interface Doctor {
  img: string;
  name: string;
  specialties: string;
  city: string;
}
export interface Appointments {
  _id: string;
  id: unknown;
  img: string;
  doctor: string;
  specialties: string;
  city: string;
  slots: string[];
  date: string;
  time: string;
  isAllocated: boolean;
}

export interface ContextValue {
  doctors: Doctor[] | undefined;
  updateDoctor: (newValue: Doctor[]) => void | undefined;
  updateAppointments: (newValue: Appointments[]) => void;
  view: string | undefined;
  updateView: (view: string) => void | undefined;
  appointments: Appointments[];
}
export const DocContext = createContext<ContextValue | undefined>(undefined);

export const useDoctorContext = (): ContextValue => {
  const context = useContext(DocContext);
  if (!context) {
    throw new Error("useDoctorContext must be used within a MyContextProvider");
  }
  return context;
};
