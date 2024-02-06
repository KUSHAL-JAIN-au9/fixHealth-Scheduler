import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AddAppointmentPage from "./pages/AddAppointmentPage.tsx";
import BookAppointmentPage from "./pages/BookAppointmentPage.tsx";
import SchedulerPage from "./pages/SchedulerPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/create-appointment", element: <AddAppointmentPage /> },
  { path: "/book-appointment", element: <BookAppointmentPage /> },
  { path: "/scheduler", element: <SchedulerPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);
