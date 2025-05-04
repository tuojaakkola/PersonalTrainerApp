import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import React from "react";
import TrainingCalendar from "./components/TrainingCalendar.tsx";
import "react-big-calendar/lib/css/react-big-calendar.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Customers />,
        index: true,
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "trainings",
        element: <Trainings />,
      },
      {
        path: "calendar",
        element: <TrainingCalendar />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// This code sets up a React application with routing using react-router-dom.
// It defines routes for the main app, customers, trainings, and a calendar view.
