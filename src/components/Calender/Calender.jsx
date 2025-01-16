import React, { useState, useEffect } from "react";
import Header from "./Header";
import TimeSlotGrid from "../Calender/TimeSlotGrid";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("week");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/calendarfromtoenddate.json");
        console.log("Response status:", response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Header
        view={view}
        setView={setView}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <TimeSlotGrid view={view} selectedDate={selectedDate} events={events} />
    </div>
  );
};

export default Calendar;
