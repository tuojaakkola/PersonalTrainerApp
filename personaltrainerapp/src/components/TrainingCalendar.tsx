import { Calendar, dateFnsLocalizer, View } from "react-big-calendar";
import { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parse, startOfWeek, format, addMinutes, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import { CalendarEvent } from "../types";

// Define locales for date-fns
const locales = {
  "en-US": enUS,
};

// Configure the dateFnsLocalizer for react-big-calendar
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: (date: any) => startOfWeek(date, { weekStartsOn: 0 }),
  getDay,
  locales,
});

export default function TrainingCalendar() {
  // State to store calendar events
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  
  // States to manage the current view and date of the calendar
  const [currentView, setCurrentView] = useState<View>("day");
  const [currentDate, setCurrentDate] = useState<Date>(new Date()); 

  // Modified fetchTrainings function to format them as calendar events
  const fetchTrainings = async () => {
    try {
      const response = await fetch(
        "https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings"
      );
      const data = await response.json();
      const trainingsRaw = data._embedded.trainings;

      // Format trainings and fetch customer names from the data for each training
      const formattedEvents = await Promise.all(
        trainingsRaw.map(async (training: any) => {
          const customerRes = await fetch(training._links.customer.href);
          const customer = await customerRes.json();
          const start = new Date(training.date);
          const end = addMinutes(start, training.duration);

          return {
            id: training._links.self.href.split("/").pop(),
            title: `${training.activity} - ${customer.firstname} ${customer.lastname}`,
            start,
            end,
            activity: training.activity,
            customername: `${customer.firstname} ${customer.lastname}`,
          };
        })
      );

      setEvents(formattedEvents);
    } catch (err) {
      console.error("Error fetching calendar data", err);
    }
  };
  
  useEffect(() => {
    fetchTrainings();
  }, []);

  return (
    <div style={{ height: "80vh", margin: "2rem" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        titleAccessor="title"
        views={["month", "week", "day"]}
        view={currentView}
        onView={(view: View) => setCurrentView(view)}
        date={currentDate} 
        onNavigate={(date) => setCurrentDate(date)} 
        style={{ height: "100%" }}
      />
    </div>
  );
}
