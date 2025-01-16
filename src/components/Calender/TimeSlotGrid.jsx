import React, { useState } from "react";
import EventCard from "./EventCard";
import EventPopup from "./EventPopup";

const TimeSlotGrid = ({ events, selectedDate, view }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [groupedEvents, setGroupedEvents] = useState({ key: null, events: [] });

  const openPopup = (event) => {
    setSelectedEvent(event);
    setGroupedEvents({ key: null, events: [] });
  };

  const openGroupedEvents = (events, key) => {
    setGroupedEvents({ key, events });
    setSelectedEvent(null);
  };

  const closePopup = () => {
    setSelectedEvent(null);
    setGroupedEvents({ key: null, events: [] });
  };

  const renderEventsInTimeSlot = (date, hour) => {
    const filteredEvents = events.filter((event) => {
      const eventStart = new Date(event.start);
      return (
        eventStart.toDateString() === date.toDateString() &&
        eventStart.getHours() === hour
      );
    });

    const timeSlotKey = `${date.toDateString()}-${hour}`;

    if (filteredEvents.length === 1) {
      return (
        <EventCard
          key={filteredEvents[0].id}
          event={filteredEvents[0]}
          onClick={() => openPopup(filteredEvents[0])}
        />
      );
    }

    if (filteredEvents.length > 1) {
      const primaryEvent = filteredEvents[0];
      return (
        <div className="event-card-with-group">
          <EventCard
            event={primaryEvent}
            onClick={() => openGroupedEvents(filteredEvents, timeSlotKey)}
          />
          <div
            className="event-count-badge"
            title={`${filteredEvents.length} events`}
            onClick={() => openGroupedEvents(filteredEvents, timeSlotKey)}
          >
            {filteredEvents.length}
          </div>
          {groupedEvents.key === timeSlotKey && (
            <div className="grouped-events">
              {groupedEvents.events.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onClick={() => openPopup(event)}
                />
              ))}
            </div>
          )}
        </div>
      );
    }

    return null;
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => (i + 10) % 24);

    const formatTime = (hour) => {
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:00 ${ampm}`;
    };

    return (
      <div className="day-grid">
        {hours.map((hour) => (
          <div className="day-flex" key={hour}>
            <div className="time-cell">
              <div className="time-label">{formatTime(hour)}</div>
            </div>
            <div className="day-cell">
              {renderEventsInTimeSlot(selectedDate, hour)}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const days = Array.from({ length: 7 }).map((_, i) => {
      const day = new Date(selectedDate);
      day.setDate(selectedDate.getDate() - selectedDate.getDay() + i);
      return day;
    });

    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
        date
      );
      return `${day} ${month}`;
    };

    const formatTime = (hour) => {
      const ampm = hour >= 12 ? "PM" : "AM";
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:00 ${ampm}`;
    };

    return (
      <div className="calendar-grid">
        <div className="times-column">
          <div className="time-label-week empty-cell"></div>
          {Array.from({ length: 24 }).map((_, i) => {
            const hour = (i + 10) % 24;
            return (
              <div key={hour} className="time-label-week">
                {formatTime(hour)}
              </div>
            );
          })}
        </div>
        <div className="days-column">
          <div className="week-headings">
            {days.map((day, i) => (
              <div key={i} className="week-heading">
                <div>{formatDate(day)}</div>
                <div>
                  {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
                    day
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="time-slots">
            {Array.from({ length: 24 }).map((_, i) => {
              const hour = (i + 10) % 24;
              return (
                <div key={hour} className="hour-row">
                  {days.map((day, j) => (
                    <div key={`${hour}-${j}`} className="time-slot">
                      {renderEventsInTimeSlot(day, hour)}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const firstDay = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      1
    );
    const daysInMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    ).getDate();
    const days = [];

    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i)
      );
    }

    return (
      <div className="month-container">
        <div className="month-days-row">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day, i) => (
            <div key={i} className="month-day-header">
              {day}
            </div>
          ))}
        </div>

        <div className="month-dates-grid">
          {days.map((day, index) => (
            <div
              key={index}
              className={`month-date-cell ${day ? "" : "month-empty-cell"}`}
            >
              {day && (
                <>
                  <div>{day.getDate()}</div>
                  {events
                    .filter((event) => {
                      const eventDate = new Date(event.start);
                      return eventDate.toDateString() === day.toDateString();
                    })
                    .map((event, i, arr) =>
                      i === 0 ? (
                        <div
                          className="event-card-with-group"
                          key={event.id}
                          onClick={() => {
                            if (arr.length > 1) {
                              openGroupedEvents(arr, day.toDateString());
                            } else {
                              openPopup(event);
                            }
                          }}
                        >
                          <EventCard event={event} />
                          {arr.length > 1 && (
                            <div
                              className="event-count-badge"
                              onClick={() =>
                                openGroupedEvents(arr, day.toDateString())
                              }
                            >
                              {arr.length}
                            </div>
                          )}
                        </div>
                      ) : null
                    )}
                  {groupedEvents.key === day.toDateString() && (
                    <div className="grouped-events">
                      {groupedEvents.events.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          onClick={() => openPopup(event)}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {view === "day" && renderDayView()}
      {view === "week" && renderWeekView()}
      {view === "month" && renderMonthView()}
      {selectedEvent && (
        <EventPopup event={selectedEvent} onClose={closePopup} />
      )}
    </div>
  );
};

export default TimeSlotGrid;
