import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";

export const appointments = [
  {
    id: 1,
    phone: "1234567890",
    email: "john.doe@example.com",
    doctorName: "Dr. Smith",
    specialities: ["Cardiology", "Internal Medicine"],
    appointmentDate: "2022-09-15",
    slots: [
      {
        id: 1,
        status: "available",
        time: "09:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "09:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "10:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
  {
    id: 2,
    patentName: "Jane Smith",
    phone: "9876543210",
    email: "jane.smith@example.com",
    doctorName: "Dr. Johnson",
    specialities: ["Dermatology"],
    appointmentDate: "2022-09-16",
    slots: [
      {
        id: 1,
        status: "available",
        time: "10:00 AM",
      },
      {
        id: 2,
        status: "available",
        time: "10:45 AM",
      },
      {
        id: 3,
        status: "available",
        time: "11:30 AM",
      },
    ],
  },
];

export const weekFormat = "MM/DD";
export const dateFormat = "YYYY/MM/DD";

// Extend dayjs with the weekOfYear plugin
dayjs.extend(weekOfYear);

// Get the current week of the year
export const currentWeek = dayjs().format("dddd");
